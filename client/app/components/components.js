import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Platform from './platform/platform';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Platform
])

.name;

export default componentModule;
