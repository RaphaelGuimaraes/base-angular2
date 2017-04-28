'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import path     from 'path';
import sync     from 'run-sequence';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import fs       from 'fs';
import yargs    from 'yargs';
import lodash   from 'lodash';
import gutil    from 'gulp-util';
import serve    from 'browser-sync';
import del      from 'del';
import inject   from 'gulp-inject-string';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';

let root = 'src';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
  return path.join(root, 'app', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
  return path.join(root, 'app/components', glob); // app/components/{glob}
};

let resolveToPages = (glob = '') => {
  return path.join(root, 'app/pages', glob); // app/pages/{glob}
};

// map of all paths
let paths = {
  js: [
    resolveToComponents('**/*!(.spec.js).js'), 
    resolveToPages('**/*!(.spec.js).js')
  ], // exclude spec files
  scss: resolveToApp('**/*.scss'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/app.js')
  ],
  output: root,
  blankComponentTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  blankPageTemplates: path.join(__dirname, 'generator', 'page/**/*.**'),
  componentsModulePath: path.join(__dirname, root, 'app/components/'),
  componentsModuleFile: path.join(__dirname, root, 'app/components/components.module.js'),
  pagesModulePath: path.join(__dirname, root, 'app/pages/'),
  pagesModuleFile: path.join(__dirname, root, 'app/pages/pages.module.js'),
  dest: path.join(__dirname, 'dist')
};

// use webpack.config.js to build modules
gulp.task('webpack', ['clean'], (cb) => {
  const config = require('./webpack.dist.config');
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if(err)  {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('serve', () => {
  const config = require('./webpack.dev.config');
  config.entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true',
    // application entry point
  ].concat(paths.entry);

  var compiler = webpack(config);

  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: {baseDir: root},
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpackHotMiddleware(compiler)
    ]
  });
});

gulp.task('watch', ['serve']);

gulp.task('component', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const toDash = (text) => {
    return text.replace(/([A-Z])/g, ($1) => {
      return "-" + $1.toLowerCase();
    });
  }
  const normalize = (text) => {
    return text.replace(/[^a-zA-Z\-\_]/g, '').replace(/([\-\_][a-z])/g, ($1) => {
      return $1.toUpperCase().replace(/[\-\_]/g,'');
    });
  }
  const name = normalize(yargs.argv.name);
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, toDash(name));
  const importPath = 'import ' + cap(name) + ' from ' + '\'./' + toDash(name) + '/' + toDash(name) + '.module\';';

  let generator = gulp.src(paths.blankComponentTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      dashedName: toDash(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', toDash(name));
    }))
    .pipe(gulp.dest(destPath));

  let importer = gulp.src(paths.componentsModuleFile)
    .pipe(inject.before('/* inject:imports */', importPath + '\n'))
    .pipe(inject.before('/* inject:classes */', '    ' + cap(name) + ',' + '\n'))
    .pipe(gulp.dest(paths.componentsModulePath));
  
  return [generator, importer];
});

gulp.task('page', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const toDash = (text) => {
    return text.replace(/([A-Z])/g, ($1) => {
      return "-" + $1.toLowerCase();
    });
  }
  const normalize = (text) => {
    return text.replace(/[^a-zA-Z\-\_]/g, '').replace(/([\-\_][a-z])/g, ($1) => {
      return $1.toUpperCase().replace(/[\-\_]/g,'');
    });
  }
  const name = normalize(yargs.argv.name);
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToPages(), parentPath, toDash(name));
  const importPath = 'import ' + cap(name) + ' from ' + '\'./' + toDash(name) + '/' + toDash(name) + '.module\';';

  let generator = gulp.src(paths.blankPageTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      dashedName: toDash(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', toDash(name));
    }))
    .pipe(gulp.dest(destPath));

  let importer = gulp.src(paths.pagesModuleFile)
    .pipe(inject.before('/* inject:imports */', importPath + '\n'))
    .pipe(inject.before('/* inject:classes */', '    ' + cap(name) + ',' + '\n'))
    .pipe(gulp.dest(paths.pagesModulePath));
  
  return [generator, importer];
});

gulp.task('clean', (cb) => {
  del([paths.dest]).then(function (paths) {
    gutil.log("[clean]", paths);
    cb();
  })
});

gulp.task('default', ['watch']);
