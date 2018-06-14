var userService = (function () {

    return {
        createUser: function (userData) {
            var user = new User(userData);
            userDao.save(user);
        }
    }
})();