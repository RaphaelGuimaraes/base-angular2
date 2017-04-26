import angular from 'angular';
import uiRouter from 'angular-ui-router';
import platformComponent from './platform.component';
import platformService from './platform.service';

let platformModule = angular.module('platform', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('platform', {
      url: '/platform',
      component: 'platform'
    });
})

.component('platform', platformComponent)

.service('platformService', platformService)

.name;

export default platformModule;
