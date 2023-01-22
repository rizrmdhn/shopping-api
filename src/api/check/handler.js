class CheckHandler{
    constructor(){
        this.checkApi = this.checkApi.bind(this)
    }

    async checkApi() {
        return {
            status: 'success',
            message: 'Server is running'
        }
    }
}

module.exports = CheckHandler