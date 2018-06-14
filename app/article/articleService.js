var articleService = (function () {

    return {
        create: function (title, content) {
            var article = new Article(title, content);
            articleDao.save(article);
            return article;
        },
        update: function (articleUpdateData) {
            var article = articleDao.findOne(articleUpdateData.id);
            article.title = articleUpdateData.title;
            article.content = articleUpdateData.content;
            articleDao.update(article);
        }
    }
})();