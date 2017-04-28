import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Platform from './platform/platform';

let componentModule = angular.module('app.pages', [
  Platform
])

.name;

export default componentModule;
