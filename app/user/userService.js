var userService = (function () {

    return {
        createUser: function (userData, successCallback) {
            var user = new User(userData);
            userDao.save(user, successCallback);
        }
    }
})();