window.addEventListener("online", function (event) {
    const allNews = data_context.get_lists();
    data_context.add_list(allNews);
    showAllNews(allNews);
    localStorage.removeItem("news");
});
const allNews = data_context.get_lists();
if (isOnline()) {
    sendNewsToServer(allNews);
    showAllNews(allNews);
    localStorage.removeItem("news");
}
function addNews(imgSrc, title, body) {
    const newsBlock = document.createElement("div");
    newsBlock.className = "childFlex";
    const img = document.createElement("img");
    img.className='critica';
    img.src=imgSrc;
    img.alt='News Image';
    const pH = document.createElement('p');
    pH.className='headNew';
    pH.innerHTML=title;
    const pBody = document.createElement('p');
    pBody.innerHTML=body;
    newsBlock.append(img);
    newsBlock.append(pH);
    newsBlock.append(pBody);
    document.getElementsByClassName('news')[0].appendChild(newsBlock);
}
function showAllNews(allNews) {
    allNews.forEach(function (news) {
        addNews(news.imgSrc, news.title.trim(), news.body.trim())
    });
}

function sendNewsToServer(allNews) {
    if (allNews.length) {
        alert("Successfully sent to server!")
    }
}

function readNewsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("news")) != null
        ? JSON.parse(localStorage.getItem("news")) : [];
}

function isOnline() {
    return window.navigator.onLine;
}