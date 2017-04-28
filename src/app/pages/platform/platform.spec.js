import PlatformModule from './platform'
import PlatformController from './platform.controller';
import PlatformComponent from './platform.component';
import PlatformTemplate from './platform.html';

describe('Platform', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PlatformModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PlatformController();
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
      expect(PlatformTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PlatformComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PlatformTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PlatformController);
      });
  });
});
