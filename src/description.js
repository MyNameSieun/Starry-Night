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

// 로컬 스토리지에 콜렉션 저장
document.querySelector(".save-collection-btn").addEventListener("click", () => {
  const apopData = {
    title: document.querySelector("#collection-title").innerText,
    date: document.querySelector("#collection-date").innerText,
    imgSrc: document.querySelector("#collection-image").src,
    description: document.querySelector("#collection-description").innerText,
    link: document.querySelector(".description-btn a").getAttribute("href"),
  };

  // 로컬 스토리지에서 기존 콜렉션 가져오기
  const collection = JSON.parse(localStorage.getItem("collection")) || [];

  // 이미 저장된 데이터와 중복되는지 확인
  const isAlreadySaved = collection.some(
    (item) => item.imgSrc === apopData.imgSrc
  );

  if (isAlreadySaved) {
    return alert("이미 콜렉션에 저장된 이미지입니다.");
  }

  collection.push(apopData); // 배열에 새 데이터 추가

  localStorage.setItem("collection", JSON.stringify(collection)); // 배열 저장

  alert("Collection에 저장되었습니다!");
});
