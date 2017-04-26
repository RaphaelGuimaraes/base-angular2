class PlatformService {
    /* @ngInject */
    constructor($http) {
        this.$http = $http;
    }

    getPlatforms () {
        return this.$http.get('http://private-59658d-celulardireto2017.apiary-mock.com/plataformas')
            .then(this._onSuccess)
            .catch(this._onError);
    }

    _onSuccess (response) {
        return response.data.plataformas;
    };

    _onError (error) {
        return error;
    };
}

export default PlatformService;
