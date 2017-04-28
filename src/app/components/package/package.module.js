import angular from 'angular';
import uiRouter from 'angular-ui-router';
import packageComponent from './package.component';

let packageModule = angular.module('package', [
  uiRouter
])

.component('package', packageComponent)

.name;

export default packageModule;
