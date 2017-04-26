class PlatformController { 
    platforms;
    
    /* @ngInject */
    constructor($location, platformService) {
        this.name = 'platform';
        this.currentNavItem = 'platform';

        this.$location = $location;

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
        localStorage.setItem('selectedPlatform', JSON.stringify(platform));
        // StepsService.setStep(StepsService.PACKAGE);
        this.$location.path('/home');
    }
}

export default PlatformController;
