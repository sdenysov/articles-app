var ValidationUtils = (function ($, _) {

    var EMAIL_REG_EXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var ONLY_LETTER_REG_EXP = /^[a-zA-Z]+$/;

    return {
        isEmpty: function (value) {
            return _.isEmpty(value);
        },
        hasNumber: function (value) {
            return !value.match(ONLY_LETTER_REG_EXP)
        },
        isEmail: function (value) {
            return !value.match(EMAIL_REG_EXP)
        },
        isLengthLessThen: function (value, length) {
            return value.length < length;
        },
        equals: function (value1, value2) {
            return value1 === value2;
        }
    };
}(jQuery, _));