var articleView = (function () {

    var ARTICLE_TEMPLATE = "article-template";

    return {
        render: function (article) {
            var $articleElement = $(templateEngine.render(ARTICLE_TEMPLATE, article));
            $articleElement.find('.edit-btn').on('click', articleController.editHandler);
            $articleElement.find('.remove-btn').on('click', articleController.removeHandler);
            getArticleContainer().append($articleElement);
        },
        remove: function (id) {
            var articleElement = document.querySelector('article[data-article-id="' + id + '"]');
            var col = articleElement.parentNode;
            var row = col.parentNode;
            row.removeChild(col);
            if (row.childElementCount === 0) {
                row.parentNode.removeChild(row);
            }
        },
        openCreateModal: function () {
            $('#article-modal')
                .on('show.bs.modal', function () {
                    var $modal = $(this);
                    $modal.attr('data-mode', 'create');
                    $modal.find('.modal-title').text('NEW ARTICLE');
                    $modal.find('#modal-article-title').val("");
                    $modal.find('#modal-article-content').val("");
                })
                .modal('show');
        },
        openUpdateModal: function (article) {
            $('#article-modal')
                .on('show.bs.modal', function () {
                    var $modal = $(this);
                    $modal.attr('data-mode', 'update');
                    $modal.attr('data-article-id', article.id);
                    $modal.find('.modal-title').text('UPDATE ARTICLE');
                    $modal.find('#modal-article-title').val(article.title);
                    $modal.find('#modal-article-content').val(article.content);
                })
                .modal('show');
        },
        update: function (article) {
            var articleElement = document.querySelector('article[data-article-id="' + article.id + '"]');
            var articleTitleElement = articleElement.querySelector('.article-title');
            articleTitleElement.innerHTML = article.title;
            var articleContentElement = articleElement.querySelector('.article-content');
            articleContentElement.innerHTML = article.content;
        }
    };

    function createRow() {
        var rowElem = document.createElement('div');
        rowElem.className = 'row';
        return rowElem;
    }

    function getArticleContainer() {
        var articleBoard = document.getElementById('article-board');
        var rowElem = createRow();
        if (articleBoard.childElementCount > 0) {
            var lastRowElem = articleBoard.lastChild;
            if (lastRowElem.childElementCount < 2) {
                rowElem = lastRowElem;
            }
        }
        var colElem = document.createElement('div');
        colElem.className = 'col-md-6';
        rowElem.appendChild(colElem);
        articleBoard.appendChild(rowElem);
        return $(colElem);
    }
})();