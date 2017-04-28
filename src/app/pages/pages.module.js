import angular from 'angular';
import Home from './home/home.module';
import About from './about/about.module';
import Platform from './platform/platform.module';
/* inject:imports */

let pageModule = angular.module('app.pages', [
    Home,
    About,
    Platform,
/* inject:classes */
])

.name;

export default pageModule;
