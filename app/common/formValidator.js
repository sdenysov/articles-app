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
        /*if ($.isObject(messages)) {*/
        if (typeof(messages) === 'object'){
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
            if (isNotValid(field, rule)) {
                return {
                    valid: false,
                    rule: rule
                };
            }
        }
        return {valid: true};
    }

    function isNotValid(field, rule) {
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
        return ValidationUtils[errorRule.validator](field.value) === errorRule.result;
    }


    function showErrors(resultMessages) {
        //TODO show errors
    }

})(jQuery);


