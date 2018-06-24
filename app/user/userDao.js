var userDao = (function () {
    return {
        sequence: {
            getNext: function () {
                var value = +localStorage.getItem('users_sequence');
                this.set(++value);
                return value;
            },
            set: function (value) {
                localStorage.setItem('users_sequence', value);
            }
        },
        getAll: function () {
            var data = localStorage.getItem('users');
            return JSON.parse(data);
        },
        save: function (user, successCallback) {
            var users = this.getAll();
            user.id = this.sequence.getNext();
            users[user.id] = user;
            saveUser(users);
            successCallback();
        }
    };
    function saveUser(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }
})();

