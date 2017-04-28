import template from './<%= dashedName %>.html';
import controller from './<%= dashedName %>.controller';
import './<%= dashedName %>.scss';

let <%= name %>Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default <%= name %>Component;
