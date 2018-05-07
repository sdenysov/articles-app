var articleController = (function () {
    return {
        renderAllArticles: function () {
            var articles = articleDao.getAll();
            for (var key in articles) {
                if (articles.hasOwnProperty(key)) {
                    articleView.render(articles[key]);
                }
            }
        },
        createAndRender: function (title, content) {
            var article = new Article(title, content);
            articleDao.save(article);
            articleView.render(article);
        },
        removeHandler: function (event) {
            var articleElement = event.target.closest('article');
            var articleId = articleElement.dataset.id;
            articleDao.remove(articleId);
            articleView.remove(articleId);
        },
        editHandler: function (event) {
            var articleElement = event.target.closest('article');
            var articleId = articleElement.dataset.id;
            var article = articleDao.findOne(articleId);
            articleView.openUpdateModal(article);
        },

        updateAndRender: function (articleUpdateData) {
            articleService.update(articleUpdateData);
            var article = articleDao.findOne(articleUpdateData.id);
            articleView.update(article);
        }
    }
})();