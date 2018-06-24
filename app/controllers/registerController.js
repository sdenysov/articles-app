var registerController = (function () {

    return {
        init: function () {
            formValidationInit();
        }
    };

    function formValidationInit() {
        formValidator.configure({
            form: document.getElementById('sign-up-form'),
            rules: {
                firstname: {
                    required: true,
                    lettersonly: true
                },
                lastname: {
                    required: true,
                    lettersonly: true
                },
                email: {
                    required: true,
                    email: true
                },
                username: {
                    required: true
                },
                password: {
                    required: true,
                    minlength: 6
                },
                cpassword: {
                    required: true,
                    equalTo: "#password"
                }
            },
            messages: {
                firstname: {
                    required: "Please enter your firstname",
                    lettersonly: "The First Name field can contain only letters"
                },
                lastname: {
                    required: "Please enter your lastname",
                    lettersonly: "The Last Name field can contain only letters"
                },
                email: {
                    required: "Please enter a valid email address",
                    email: 'Is not email.'
                },
                username: "Username is required.",
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 6 characters long"
                },
                cpassword: {
                    required: "Please confirm a password",
                    equalTo: "Please enter the same value again"
                }
            },
            submitHandler: function (form) {
                var userData = {
                    firstName: form.firstname.value,
                    lastName: form.lastname.value,
                    email: form.email.value,
                    userName: form.username.value,
                    inputPassword: form.password.value,
                    conPassword: form.cpassword.value
                };
                userService.createUser(userData, function () {
                    window.location = '/login';
                });
            }
        })
    }
})();