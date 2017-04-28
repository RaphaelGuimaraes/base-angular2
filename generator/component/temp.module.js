import angular from 'angular';
import uiRouter from 'angular-ui-router';
import <%= name %>Component from './<%= dashedName %>.component';

let <%= name %>Module = angular.module('<%= name %>', [
    uiRouter
])

.component('<%= name %>', <%= name %>Component)

.name;

export default <%= name %>Module;
