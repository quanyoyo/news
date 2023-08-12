"use strict";
if (currentUser) {
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");
  const navPageNum = document.getElementById("nav-page-num");
  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const pageNum = document.getElementById("page-num");

  let totalResults = 0;
  navPageNum.style.display = "none";
  let keyword = "";
  // nut search
  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = 1;
    if (inputQuery.value.trim().length === 0) {
      alert("Please input keyword to search");
    } else {
      keyword = inputQuery.value;
      getNewsByKeyword(keyword, 1);
    }
  });
  // ham lay data by keyword
  async function getNewsByKeyword(keyword, page) {
    try {
      // connect to api
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${currentUser.pageSize}&page=${page}&sortBy=popularity&apiKey=530e6996d7084297b6a8dda86c35dd48`
      );
      // get data
      const data = await res.json();
      console.log(keyword);
      console.log(data);
      // thong bao neu k co bai vt nao
      if (data.totalResults == 0) {
        navPageNum.style.display = "none";
        throw new Error(
          "No news match with your keyword, please try to input other keyword"
        );
      }
      //loi cant connect to api
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }
      navPageNum.style.display = "block";
      displayNewsList(data);
    } catch (error) {
      alert(error.message);
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
    getNewsByKeyword(keyword, --pageNum.textContent);
  });
  // show next list news
  btnNext.addEventListener("click", function () {
    getNewsByKeyword(keyword, ++pageNum.textContent);
  });
  // ham show list news
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
  alert("Please login to search");
  window.location.href = "../pages/login.html";
}
