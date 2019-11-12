document.addEventListener("DOMContentLoaded",function() {
    let allNews = [];
    window.addEventListener("online", function (event) {
        provider.get("news", (news) => {
            if (news) {
                allNews = news;
            }
            sendNewsToServer(allNews);
            showAllNews(allNews);
            provider.remove("news");
            allNews = [];
        })
    });
    provider.get("news", (news) => {
        if (news) {
            allNews = news;
        }
    });
    if (isOnline()) {
        sendNewsToServer(allNews);
        showAllNews(allNews);
        provider.remove("news");
        allNews = [];
    }

    function addNews(imgSrc, title, body) {

        const newsBlock = document.createElement("div");
        newsBlock.className = "childFlex";
        const img = document.createElement("img");
        img.className = 'critica';
        img.src = imgSrc;
        img.alt = 'News Image';
        const pH = document.createElement('p');
        pH.className = 'headNew';
        pH.innerHTML = title;
        const pBody = document.createElement('p');
        pBody.innerHTML = body;
        newsBlock.append(img);
        newsBlock.append(pH);
        newsBlock.append(pBody);
        document.getElementsByClassName('news')[0].appendChild(newsBlock);
    }

    function showAllNews(allNews) {
        allNews.forEach(function (news) {
            addNews(news.imgSrc, news.title, news.body)
        });
    }

    function sendNewsToServer(allNews) {
        if (allNews.length) {
            alert("Successfully sent to server!")
        }
    }
});