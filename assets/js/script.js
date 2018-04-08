var modalSaveBtn = document.getElementById('modal-save-btn');
modalSaveBtn.addEventListener('click', function () {
    var title = document.getElementById('modal-article-title').value;
    var content = document.getElementById('modal-article-content').value;
    var article = new Article(title, content);
    saveArticle(article);
    renderArticle(article);
});

function saveArticle(article) {
    var articles = JSON.parse(localStorage.getItem('articles'));
    articles[article.id] = article;
    localStorage.setItem('articles', JSON.stringify(articles));
}

function Article(title, content) {
    this.id = getId();
    this.creationDate = (new Date()).format('dd-mm-yyyy');
    this.title = title;
    this.content = content;

    Object.defineProperty(this, 'creationDate', {
        get: function () {
            var date = new Date(this.creationDate);
            return date.format('dd-mm-yyyy');
        },

        set: function (date) {
            if (typeof date === 'string') {
                this.creationDate = date;
            } else {
                this.creationDate = date.format('dd-mm-yyyy');
            }
        }
    });

    function getId() {
        var id = +localStorage.getItem('articles_sequence');
        localStorage.setItem('articles_sequence', ++id);
        return id;
    }
}

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

function renderArticle(article) {
    var articleContainerElem = getArticleContainer();
    articleContainerElem.appendChild(createArticle(article));
}

function createArticle(article) {
    var articleElem = document.createElement('article');
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
    var articleMain = document.createElement('main');
    var articleCaption = document.createElement('h2');
    var articleContent = document.createElement('p');
    return articleMain;
}

function createArticleFooter(article) {
    var articleFooter = document.createElement('footer');
    var detailsBtn = document.createElement('div');
        var detailsBtnLink = document.createElement('a');
    var authorIcon = document.createElement('span');
    var authorName = document.createElement('span');
    return articleFooter;
}

//--------------------------------------
function createArticleCreationDate(article) {
    var creationDate = article.creationDate.format("dd-mm-yyyy");
    var spanElem = document.createElement('span');
    spanElem.innerHTML = 'Creation date: ' + creationDate;
    return spanElem;
}

function createArticleControls() {
    var articlePencil = document.createElement('span');
    articlePencil.className = 'glyphicon glyphicon-pencil';
    var articleRemove = document.createElement('span');
    articleRemove.className = 'glyphicon glyphicon-remove';

    var controlsElem = document.createElement('div');
    controlsElem.appendChild(articlePencil);
    controlsElem.appendChild(articleRemove);
    return controlsElem;
}