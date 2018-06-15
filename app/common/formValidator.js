var formValidator = (function ($) {

    return {
        configure: function (config) {
            var form = config.form;
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                var validationResults = validate(config);
                validationResults.valid
                    ? config.submitHandler(form)
                    : showErrors(validationResults);
            });
        }
    };

    function getMessage(messages, rule) {
        if (_.isObject(messages)) {
            return messages[rule];
        }
        return messages;
    }

    function validate(config) {
        var validationResult = {
            valid: true,
            messages: {}
        };
        for (var fieldName in config.rules) {
            if (!config.rules.hasOwnProperty(fieldName)) {
                continue;
            }
            var messages = config.messages[fieldName];
            var rules = config.rules[fieldName];
            var result = validateField(config.form[fieldName], rules);
            if (!result.valid) {
                validationResult.messages[fieldName] = getMessage(messages, result.rule);
                validationResult.valid = false;
            }
        }
        return validationResult;
    }

    function validateField(field, rules) {
        for (var rule in rules) {
            if (!rules.hasOwnProperty(rule)) {
                continue;
            }
            var ruleParam = rules[rule];
            if (isNotValid(field, rule, ruleParam)) {
                return {
                    valid: false,
                    rule: rule
                };
            }
        }
        return {valid: true};
    }

    function isNotValid(field, rule, ruleParam) {
        var errorRules = {
            required: {
                validator: 'isEmpty',
                result: true
            },
            lettersonly: {
                validator: 'hasNumber',
                result: true
            },
            email: {
                validator: 'isEmail',
                result: true
            },
            minlength: {
                validator: 'minlength',
                result: true
            },
            equalTo: {
                validator: 'equalToPwd',
                result: true
            }
        };

        var errorRule = errorRules[rule];
        return ValidationUtils[errorRule.validator](field.value, ruleParam) === errorRule.result;
    }


    function showErrors(errorMessages) {
        //TODO show errors
        for (var errorFieldName in errorMessages.messages){
            if(!errorMessages.messages.hasOwnProperty(errorFieldName)){
                continue;
            }
            var errorFieldContainer = document.getElementById(errorFieldName).parentNode;
            var mainErrorFieldContainer = errorFieldContainer.parentNode;
            mainErrorFieldContainer.classList.add('has-error', 'has-feedback');
            errorFieldContainer.appendChild(ValidationUtils.errorMsgView());
            errorFieldContainer.appendChild(ValidationUtils.errorMsgValue(errorMessages, errorFieldName));
            errorFieldContainer.appendChild(ValidationUtils.errorIconView())
        }
        return mainErrorFieldContainer;
    }
})(jQuery);


