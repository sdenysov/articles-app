var ORMCore = (function ($) {

    var _models = {};
    var _instanceProto = getInstanceProto();
    var _modelProto = getModelProto();

    return {
        config: function (config) {
            //TODO ...
        },
        define: function (modelName, entityConfig) {
            var model = Object.create(_modelProto);
            $.extend(model, entityConfig);
            _models[modelName] = model;
        },
        get: function (modelName) {
            return _models[modelName];
        }
    };

    function getInstanceProto() {
        return {
            remove: function (id) {
                var instances = this.getAll();
                delete instances[id];
            }
        }
    }

    function getModelProto() {
        return {
            build: function (params) {
                var instance = Object.create(_instanceProto);
                $.extend(instance, params);
                return instance;
            },
            findAll: function () {
                var data = localStorage.getItem(this.table);
                return JSON.parse(data, getParser(this.entity));
            },
            findById: function (id) {
                //TODO ....
                return {};
            },
            removeById: function (id) {

            }
        }
    }

    function getParser(entity) {
        return function (key, value) {
            var type = entity[key];
            if (type === Date) {
                return new Date(value);
            }
            if (typeof type === 'string') {
                var model = _models[type];
                return model.findById(value);
            }
            return value;
        }
    }
}(jQuery));

ORMCore.config({
    db_driver: localStorage
});

ORMCore.define('Article', {
    table: 'articles',
    sequence: 'article-sequence',
    entity: {
        id: Number,
        title: String,
        content: String,
        createDate: Date,
        author: 'User'
    }
});

ORMCore.define('User', {
    table: 'users',
    sequence: 'user-sequence',
    entity: {
        id: Number,
        firstName: String,
        lastName: String,
        email: String,
        userName: String,
        password: String
    }
});

var Article = ORMCore.get('Article');
var User = ORMCore.get('User');

var user = User.build({
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    userName: 'userName',
    password: 'password'
});

var article = Article.build({
    title: 'Title',
    content: 'Content',
    createDate: new Date(),
    author: user
});


// var article = Article.findById(123);
// var articles = Article.findAll();
// Article.removeById(123);
// article.remove();
// article.save();


console.log('');

