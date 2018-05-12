var articleView = (function () {

    return {
        render: function (article) {
            var articleContainerElement = getArticleContainer();
            var articleElement = createArticle(article);
            articleContainerElement.appendChild(articleElement);
        },
        remove: function (id) {
            var articleElement = document.querySelector('article[data-id="' + id + '"]');
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
            var articleElement = document.querySelector('article[data-id="' + article.id + '"]');
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
        return colElem;
    }

    function createArticle(article) {
        var articleElem = document.createElement('article');
        articleElem.dataset.id = article.id;
        articleElem.className = 'article';
        articleElem.appendChild(createArticleHeader(article));
        articleElem.appendChild(createArticleMain(article));
        articleElem.appendChild(createArticleFooter(article));
        return articleElem;
    }

    function createArticleHeader(article) {
        var creationDateElem = createArticleCreationDate(article);
        var controlsElem = createArticleControls(article);
        var articleHeader = document.createElement('header');
        articleHeader.appendChild(creationDateElem);
        articleHeader.appendChild(controlsElem);
        return articleHeader;
    }

    function createArticleMain(article) {
        var articleCaptionElem = createArticleCaption(article);
        var articleContentElem = createArticleContent(article);
        var articleMain = document.createElement('main');
        articleMain.appendChild(articleCaptionElem);
        articleMain.appendChild(articleContentElem);
        return articleMain;
    }

    function createArticleFooter(article) {
        var authorBtnElem = createAuthorBtn();
        var authorIconElem = createAuthorIcon();
        var authorNameElem = createAuthorName();
        var articleFooter = document.createElement('footer');
        articleFooter.className = 'author-info';
        articleFooter.appendChild(authorBtnElem);
        articleFooter.appendChild(authorIconElem);
        articleFooter.appendChild(document.createElement('br'));
        articleFooter.appendChild(authorNameElem);
        return articleFooter;
    }

    function createArticleCreationDate(article) {
        var creationDate = article.creationDate.format('dd-mm-yyyy');
        var spanElem = document.createElement('span');
        spanElem.innerHTML = 'Creation date: ' + creationDate;
        return spanElem;
    }

    function createArticleControls(article) {
        var articlePencil = document.createElement('span');
        articlePencil.className = 'glyphicon glyphicon-pencil';
        articlePencil.dataset.toggle = 'modal';
        articlePencil.dataset.target = '#new-article';
        articlePencil.addEventListener('click', articleController.editHandler);
        var articleRemove = document.createElement('span');
        articleRemove.addEventListener('click', articleController.removeHandler);
        articleRemove.className = 'glyphicon glyphicon-remove';
        var controlsElem = document.createElement('div');
        controlsElem.className = 'article-controls';
        controlsElem.appendChild(articlePencil);
        controlsElem.appendChild(articleRemove);
        return controlsElem;
    }

    function createArticleCaption(article) {
        var articleCaption = document.createElement('h2');
        articleCaption.className = 'article-title';
        articleCaption.innerHTML = article.title;
        return articleCaption;
    }

    function createArticleContent(article) {
        var articleContent = document.createElement('p');
        articleContent.className = 'article-content';
        articleContent.innerHTML = article.content;
        return articleContent;
    }

    function createAuthorBtn() {
        var detailsBtn = document.createElement('div');
        detailsBtn.className = 'details-button';
        var detailsBtnLink = document.createElement('a');
        detailsBtnLink.className = 'btn btn-primary';
        detailsBtnLink.setAttribute('href', '#');
        detailsBtnLink.setAttribute('role', 'button');
        detailsBtnLink.innerHTML = 'View details »';
        detailsBtn.appendChild(detailsBtnLink);
        return detailsBtn;
    }

    function createAuthorIcon() {
        var authorIcon = document.createElement('span');
        authorIcon.className = 'glyphicon glyphicon-user';
        authorIcon.innerHTML = 'Author:';
        return authorIcon;
    }

    function createAuthorName() {
        var authorName = document.createElement('span');
        authorName.innerHTML = 'Author Name';
        return authorName;
    }
})();