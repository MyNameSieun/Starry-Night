import { NASA_API_KEY } from "./apikey.js";

// APOD API에서 데이터 가져오기
fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    // console.log("APOD 데이터", data);

    document.querySelector(".apop-img-info h2").textContent = data.title;
    document.querySelector(".apop-img-info time").textContent = data.date;

    const imgElement = document.querySelector("#apop-figure img");
    imgElement.src = data.url;
    imgElement.alt = data.title;

    document.querySelector(".apop-article p").textContent = data.explanation;

    const viewDetailsLink = document.querySelector(".view-details-btn");
    viewDetailsLink.href = data.url;
  })
  .catch((error) => console.log(error));

// 로컬 스토리지에 콜렉션 저장
document.querySelector(".save-collection-btn").addEventListener("click", () => {
  const apopData = {
    title: document.querySelector(".apop-img-info h2").innerText,
    date: document.querySelector(".apop-img-info time").innerText,
    imgSrc: document.querySelector("#apop-figure img").src,
    description: document.querySelector(".apop-article p").innerText,
    link: document.querySelector(".apop-btn a").getAttribute("href"),
  };

  // 로컬 스토리지에서 기존 콜렉션 가져오기
  const collection = JSON.parse(localStorage.getItem("collection")) || [];

  // 이미 저장된 데이터와 중복되는지 확인
  const isAlreadySaved = collection.some(
    (item) => item.imgSrc === apopData.imgSrc
  );

  if (isAlreadySaved) {
    return alert("The image is already saved in the collection.");
  }

  collection.push(apopData); // 배열에 새 데이터 추가

  localStorage.setItem("collection", JSON.stringify(collection)); // 배열 저장

  alert("Saved to the collection!");
});

// 보라색 박스 크기 동적 조절
document.addEventListener("DOMContentLoaded", function () {
  const image = document.querySelector("#apop-figure img");
  const purpleBox = document.querySelector(".bg-puple-box");

  image.onload = function () {
    const imageWidth = image.width;

    purpleBox.style.width = `${imageWidth}px`;
    purpleBox.style.height = `${imageHeight}px`;
  };
});
