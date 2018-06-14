var articleController = (function () {

    return {
        init: function () {
            var ctrl = this;
            ctrl.renderAllArticles();
            var modalSaveBtn = document.getElementById('modal-save-btn');
            modalSaveBtn.addEventListener('click', function () {
                var form = document.getElementById('article-modal-form');
                var modal = document.getElementById('article-modal');
                if (isModalCreateMode(modal)) {
                    ctrl.createAndRender(form.title.value, form.content.value);
                } else {
                    ctrl.updateAndRender({
                        id: modal.getAttribute('data-article-id'),
                        title: form.title.value,
                        content: form.content.value
                    });
                }
            });
            var newArticleBtn = document.getElementById('new-article-btn');
            newArticleBtn.addEventListener('click', articleView.openCreateModal);
        },
        renderAllArticles: function () {
            var articles = articleDao.getAll();
            for (var key in articles) {
                if (articles.hasOwnProperty(key)) {
                    articleView.render(articles[key]);
                }
            }
        },
        createAndRender: function (title, content) {
            var article = articleService.create(title, content);
            articleView.render(article);
        },
        removeHandler: function (event) {
            var articleElement = event.target.closest('article');
            var articleId = articleElement.dataset.articleId;
            articleDao.remove(articleId);
            articleView.remove(articleId);
        },
        editHandler: function (event) {
            var articleElement = event.target.closest('article');
            var articleId = articleElement.dataset.articleId;
            var article = articleDao.findOne(articleId);
            articleView.openUpdateModal(article);
        },
        updateAndRender: function (articleUpdateData) {
            articleService.update(articleUpdateData);
            var article = articleDao.findOne(articleUpdateData.id);
            articleView.update(article);
        }
    };

    function isModalCreateMode(modal) {
        return modal.getAttribute('data-mode') === "create";
    }
})();