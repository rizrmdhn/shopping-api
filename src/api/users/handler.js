class UserHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postUserHandler = this.postUserHandler.bind(this);

    }

    postUserHandler = async (request, h) => {

        const { email, password, fullname } = request.payload;

        this._validator.validateUserPayload(request.payload);

        await this._service.verifyNewEmail(email);
        const userId = await this._service.addUser({ email, password, fullname });

        const response = h.response({

            status: 'success',
            message: 'User berhasil ditambahkan',
            data: {
                userId,
            },
        });
        response.code(201);
        return response;

    }

}


module.exports = UserHandler;