import PackageModule from './package.module';
import PackageController from './package.controller';
import PackageComponent from './package.component';
import PackageTemplate from './package.html';

describe('Package', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PackageModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PackageController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(PackageTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PackageComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PackageTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PackageController);
      });
  });
});
