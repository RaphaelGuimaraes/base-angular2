import { Inject } from 'angular-es6';

export default class PlatformController extends Inject { 
    platforms;

    static $inject = ['$location', 'platformService'];
    
    constructor(...args) {
        super(...args);

        let {platformService} = this.$inject;

        this.name = 'platform';
        this.currentNavItem = 'platform';

        platformService.getPlatforms()
            .then(this._onSuccess)
            .catch(this._onError);
    }

    _onSuccess = (data) => {
        this.platforms = data;
    }

    _onError = (error) => {
        console.error(error);
    }

    selectPlatform(platform) {
        let {$location} = this.$inject;
        
        localStorage.setItem('selectedPlatform', JSON.stringify(platform));
        // StepsService.setStep(StepsService.PACKAGE);
        $location.path('/home');
    }
}
