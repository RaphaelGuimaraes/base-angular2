import angular from 'angular';
import uiRouter from 'angular-ui-router';
import <%= name %>Component from './<%= dashedName %>.component';

let <%= name %>Module = angular.module('<%= name %>', [
    uiRouter
])

.component('<%= name %>', <%= name %>Component)

.config(($stateProvider) => {
    "ngInject";
    $stateProvider
        .state('<%= name %>', {
            url: '/<%= name %>',
            component: '<%= name %>'
        });
})

.name;

export default <%= name %>Module;
