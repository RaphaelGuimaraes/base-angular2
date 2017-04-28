import angular from 'angular';
import Package from './package/package';

let componentModule = angular.module('app.components', [
  Package
])

.name;

export default componentModule;
