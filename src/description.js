// 선택된 이미지 가져오기
document.addEventListener("DOMContentLoaded", () => {
  const selectedImage = JSON.parse(localStorage.getItem("selectedImage"));

  if (selectedImage) {
    const image = document.querySelector("#collection-image");
    const title = document.querySelector("#collection-title");
    const date = document.querySelector("#collection-date");
    const description = document.querySelector("#collection-description");

    image.src = selectedImage.url;
    image.alt = selectedImage.title;

    title.innerText = selectedImage.title;
    date.innerHTML = selectedImage.date;
    description.innerText = selectedImage.explanation || "설명이 없습니다.";

    const viewDetailsLink = document.querySelector(".view-details-btn");
    viewDetailsLink.href = selectedImage.url;
  } else {
    const message = document.createElement("p");
    message.innerHTML = "이미지가 선택되지 않았습니다.";
    document.querySelector("section").appendChild(message);
  }
});

// 콜렉션 저장
