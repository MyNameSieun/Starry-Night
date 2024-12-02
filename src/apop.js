import { NASA_API_KEY } from "./apikey.js";

// APOD API에서 데이터 가져오기
$.getJSON(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  .done((data) => {
    // console.log("APOD 데이터", data);

    $(".apop-img-info h2").text(data.title);
    $(".apop-img-info time").text(data.date);

    const $imgElement = $("#apop-figure img");
    $imgElement.attr("src", data.url);
    $imgElement.attr("alt", data.title);

    $(".apop-article p").text(data.explanation);

    $(".view-details-btn").attr("href", data.url);
  })
  .fail((error) => console.log(error));

// 로컬 스토리지에 콜렉션 저장
$(".save-collection-btn").on("click", () => {
  const apopData = {
    title: $(".apop-img-info h2").text(),
    date: $(".apop-img-info time").text(),
    imgSrc: $("#apop-figure img").attr("src"),
    description: $(".apop-article p").text(),
    link: $(".apop-btn a").attr("href"),
  };

  // 로컬 스토리지에서 기존 콜렉션 가져오기
  const collection = JSON.parse(localStorage.getItem("collection")) || [];

  // 이미 저장된 데이터와 중복되는지 확인
  const isAlreadySaved = collection.some(
    (item) => item.imgSrc === apopData.imgSrc
  );

  if (isAlreadySaved) {
    alert("The image is already saved in the collection.");
    return;
  }

  collection.push(apopData); // 배열에 새 데이터 추가
  localStorage.setItem("collection", JSON.stringify(collection)); // 배열 저장

  alert("Saved to the collection!");
});

// 보라색 박스 크기 동적 조절
$(document).ready(function () {
  const $image = $("#apop-figure img");
  const $purpleBox = $(".bg-puple-box");

  $image.on("load", function () {
    const imageWidth = $image.width();
    const imageHeight = $image.height();

    $purpleBox.css({
      width: `${imageWidth}px`,
      height: `${imageHeight}px`,
    });
  });
});
