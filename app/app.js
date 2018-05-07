document.addEventListener("DOMContentLoaded", function () {
    articleController.renderAllArticles();

    var modalSaveBtn = document.getElementById('modal-save-btn');
    modalSaveBtn.addEventListener('click', function () {
        var title = document.getElementById('modal-article-title').value;
        var content = document.getElementById('modal-article-content').value;
        articleController.createAndRender(title, content);
    });

    var newArticleBtn = document.getElementById('new-article-btn');
    newArticleBtn.addEventListener('click', articleView.openCreateModal);

    // var modalUpdBtn = document.getElementById('modal-upd-btn');
    // modalUpdBtn.addEventListener('click', function () {
    //     var updTitle = document.getElementById('modal-article-title').value;
    //     var updContent = document.getElementById('modal-article-content').value;
    //
    //     articleView.article.title = updTitle;
    //     articleView.article.content = updContent;
    //     articleController.update(articleView.article);
    // });
});

