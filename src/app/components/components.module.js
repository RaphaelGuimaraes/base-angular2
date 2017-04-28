import angular from 'angular';
import Package from './package/package.module';
/* inject:imports */

let componentModule = angular.module('app.components', [
    Package,
/* inject:classes */
])

.name;

export default componentModule;
