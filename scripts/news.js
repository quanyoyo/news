"use strict";
if (currentUser) {
  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const pageNum = document.getElementById("page-num");

  let totalResults = 0;
  getDataNews("us", 1);
  // lay data news tu api sau do hien thi list news
  async function getDataNews(country, page) {
    try {
      //connect to api an get data
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=530e6996d7084297b6a8dda86c35dd48`
      );
      const data = await res.json();
      // console.log(data);
      //loi cant connect to api
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }
      displayNewsList(data);
    } catch (error) {
      alert("Error: " + error.message);
    }
  }
  //nut prev
  function checkPrevBtn() {
    if (pageNum.textContent == 1) {
      //trang 1 thi an di
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }
  function checkNextBtn() {
    if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }
  // show previous list news
  btnPrev.addEventListener("click", function () {
    getDataNews("us", --pageNum.textContent);
  });
  // show next list news
  btnNext.addEventListener("click", function () {
    getDataNews("us", ++pageNum.textContent);
  });
  function displayNewsList(data) {
    totalResults = data.totalResults;
    checkPrevBtn();
    checkNextBtn();

    let html = "";
    data.articles.forEach(function (article) {
      html += `	
      <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src=${article.urlToImage}
              class="card-img"
              alt="nope-not-here.webp">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description}</p>
              <a href=${article.url} target="_blank"
                class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    });
    newsContainer.innerHTML = html;
  }
} else {
  alert("Please login to watch the news");
  window.location.href = "../pages/login.html";
}
