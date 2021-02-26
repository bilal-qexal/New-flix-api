const _ = require('lodash');

let success = (response, data, message, token) => {

    let successResponse = {
        status: 'Success',
        message: message
    };
    let status = 200;
    if (data) {
        _.extend(successResponse, {
            data: data
        });
    }
    if (token) {
        _.extend(successResponse, {
            token: token
        });
    }

    response.status(status).json(successResponse);
};

let systemFailure = (response, err) => {
    let message = [
        'Error in handling this request. ',
        'Please contact system admin.'
    ].join('');
    let status = 500;

    if (typeof err === 'object' && err.message) {
        message = err.message;
    }

    response.status(status).json({
        status: 'Fail',
        message: message,
        data: null
    });
};

let requestFailure = (response, err, jsonError = null) => {
    let status = 417;


    if (typeof err === 'object' && err.message) {
        message = err.message;
    }
    else {
        message = err;
    }

    response.status(status).json({
        status: 'Fail',
        message: message,
        jsonError: jsonError
    });
};

let badRequest = (response, message, data) => {
    let status = 400;
    var res = {
        status: 'Fail',
        message: message
    }
    data ? res.data = data : ''
    response.status(status).json(res);
};

module.exports = {
    success,
    badRequest,
    systemFailure,
    requestFailure
};