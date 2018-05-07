var articleService = (function () {

    return {
        update: function (articleUpdateData) {
            var article = articleDao.findOne(articleUpdateData.id);
            article.title = articleUpdateData.title;
            article.content = articleUpdateData.content;
            articleDao.update(article);
        }
    }
})();