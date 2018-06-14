var ValidationUtils = (function ($, _) {

    return {
        isEmpty: function (value) {
            return _.isEmpty(value);
        },
        hasNumber: function (value) {
            return !value.match(/^[a-zA-Z]+$/)
        },
        isEmail: function (value) {
            return !value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        },
        minlength: function (value) {
            return value.length > 6;
        },
        equalToPwd: function (value) {
            return value === registerController.form.password.value
        }
    }
}(jQuery, _));