document.addEventListener("DOMContentLoaded", function () {

    var pageMap = {
        index: '/articles-app/index.html',
        singUp: '/articles-app/register-page.html',
        singIn: '/articles-app/login-page.html'
    };

    var pathname = window.location.pathname;
    switch (pathname) {
        case pageMap.index:
            articleController.init();
            break;
        case pageMap.singUp:
            registerController.init();
            break;
        case pageMap.singIn:
            break;
        default:
            window.location = pageMap.index;
    }
});

