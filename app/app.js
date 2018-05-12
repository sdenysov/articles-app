document.addEventListener("DOMContentLoaded", function () {
    templateEngine.init();

    articleController.renderAllArticles();

    var modalSaveBtn = document.getElementById('modal-save-btn');
    modalSaveBtn.addEventListener('click', function () {
        var title = document.getElementById('modal-article-title').value;
        var content = document.getElementById('modal-article-content').value;
        var modal = document.getElementById('article-modal');
        if (modal.getAttribute('data-mode') === "create") {
            articleController.createAndRender(title, content);
        } else {
            articleController.updateAndRender({
                id: modal.getAttribute('data-article-id'),
                title: title,
                content: content
            });
        }
    });

    var newArticleBtn = document.getElementById('new-article-btn');
    newArticleBtn.addEventListener('click', articleView.openCreateModal);
});

