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
        minlength: function (value, ruleParam) {
            return value.length > ruleParam;
        },
        equalToPwd: function (value, ruleParam) {
            return value !== $(ruleParam).val()
        },
        errorMsgValue: function (errorMessages, errorFieldName) {
            removeErrorSpan(errorFieldName);
            var errorMessageValue = document.createElement('span');
            errorMessageValue.id = 'error-message-text-'+errorFieldName;
            errorMessageValue.innerHTML = errorMessages.messages[errorFieldName];
            return errorMessageValue
        },
        errorMsgView: function () {
            var errorMsgElem = document.createElement('span');
            errorMsgElem.classList.add('glyphicon', 'glyphicon-remove', 'form-control-feedback');
            errorMsgElem.setAttribute('aria-hidden', 'true');
            return errorMsgElem
        },
        errorIconView: function () {
            var errorIcon = document.createElement('span');
            errorIcon.className = 'sr-only';
            errorIcon.id = 'inputErrorStatus';
            errorIcon.innerHTML = '(error)';
            return errorIcon
        }
    }
}(jQuery, _));


function removeErrorSpan (errorFieldName) {
    var deleteErrorSpan = document.getElementById('error-message-text-'+errorFieldName);
    if(deleteErrorSpan)
    {
        deleteErrorSpan.remove()
    }
}