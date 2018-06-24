var formValidator = (function ($) {

    var ruleToValidatorWithErrorCondition = {
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
            validator: 'isLengthLessThen',
            result: true
        },
        equalTo: {
            validator: 'equals',
            result: false
        }
    };

    return {
        configure: function (config) {
            var form = config.form;
            $(form).find(':input').bind('input', function () {
                formValidationView.removeErrorSigns(this);
            });
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                var validationResults = validate(config);
                validationResults.valid
                    ? config.submitHandler(form)
                    : formValidationView.showValidationResults(form, validationResults);
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
        var value = field.value;
        var condition = ruleParam;
        if (rule === 'equalTo') {
            condition = $(ruleParam).val();
        }
        var errorRule = ruleToValidatorWithErrorCondition[rule];
        return ValidationUtils[errorRule.validator](value, condition) === errorRule.result;
    }
})(jQuery);


