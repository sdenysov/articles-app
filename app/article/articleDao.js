var articleDao = (function () {

    return {
        sequence: {
            getNext: function () {
                var value = +localStorage.getItem('articles_sequence');
                this.set(++value);
                return value;
            },
            set: function (value) {
                localStorage.setItem('articles_sequence', value);
            }
        },
        getAll: function () {
            var data = localStorage.getItem('articles');
            return JSON.parse(data, function (key, value) {
                if (key === 'creationDate') {
                    return new Date(value);
                }
                return value;
            });
        },
        findOne: function (id) {
            var articles = this.getAll();
            return articles[id];
        },
        save: function (article) {
            var articles = this.getAll();
            article.id = this.sequence.getNext();
            articles[article.id] = article;
            saveArticles(articles);
        },
        remove: function (id) {
            var articles = this.getAll();
            delete articles[id];
            saveArticles(articles);
        }
    };

    function saveArticles(articles) {
        localStorage.setItem('articles', JSON.stringify(articles, function (key, value) {
            if (key === 'creationDate') {
                return dateFormat(value, 'yyyy-mm-dd');
            }
            return value;
        }));
    }
})();

