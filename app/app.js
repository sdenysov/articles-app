document.addEventListener("DOMContentLoaded", function () {
    articleController.renderAllArticles();

    var modalSaveBtn = document.getElementById('modal-save-btn');
    modalSaveBtn.addEventListener('click', function () {
        var title = document.getElementById('modal-article-title').value;
        var content = document.getElementById('modal-article-content').value;
        articleController.createSaveAndRender(title, content);
    });
});

_.template()