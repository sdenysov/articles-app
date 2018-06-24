var formValidationView = (function ($) {

    return {
        errorMsgValue: function (errorMessages, errorFieldName) {
            removeErrorMessage(errorFieldName);
            var errorMessageValue = document.createElement('span');
            errorMessageValue.id = 'error-message-text-' + errorFieldName;
            errorMessageValue.classList.add('help-block');
            errorMessageValue.innerHTML = errorMessages.messages[errorFieldName];
            return errorMessageValue
        },
        errorMsgView: function (errorFieldName) {
            var errorMsgElem = document.createElement('span');
            errorMsgElem.id = 'error-message-icon-' + errorFieldName;
            errorMsgElem.classList.add('glyphicon', 'glyphicon-remove', 'form-control-feedback');
            errorMsgElem.setAttribute('aria-hidden', 'true');
            return errorMsgElem
        },
        removeErrorSigns: function (field) {
            var formGroup = field.closest('.form-group');
            var fieldName = field.name;
            if ($(formGroup).hasClass('has-error')) {
                formGroup.classList.remove('has-error', 'has-feedback');
                removeErrorMessage(fieldName);
                $('#error-message-icon-' + fieldName).remove();
            }
        },
        showValidationResults: function(form, errorMessages) {
            $(form).find(':input').each(function (i, input) {
                if (input.type === 'submit') {
                    return;
                }
                console.log(input);
            });
            var messages = errorMessages.messages;
            for (var fieldName in messages){
                if (!messages.hasOwnProperty(fieldName)) {
                    continue;
                }
                var field = form[fieldName];
                var formGroup = field.closest('.form-group');
                formValidationView.removeErrorSigns(field);
                formGroup.classList.add('has-error', 'has-feedback');
                var errorContainer = field.closest('.error-container');
                errorContainer.appendChild(formValidationView.errorMsgView(fieldName));
                errorContainer.appendChild(formValidationView.errorMsgValue(errorMessages, fieldName));
            }
        }
    };

    function removeErrorMessage(fieldName) {
        $('#error-message-text-' + fieldName).remove();
    }
}(jQuery));