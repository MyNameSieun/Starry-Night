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
    description.innerText =
      selectedImage.explanation || "There is no description.";

    const viewDetailsLink = document.querySelector(".view-details-btn");
    viewDetailsLink.href = selectedImage.url;
  } else {
    const message = document.createElement("p");
    message.innerHTML = "No image selected.";
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
    return alert("The image is already saved in the collection.");
  }

  collection.push(apopData); // 배열에 새 데이터 추가

  localStorage.setItem("collection", JSON.stringify(collection)); // 배열 저장

  alert("Saved to the collection!");
});

// 보라색 박스 크기 동적 조절
document.addEventListener("DOMContentLoaded", function () {
  const image = document.querySelector("#collection-image");
  const purpleBox = document.querySelector(".bg-puple-box");

  image.onload = function () {
    const imageWidth = image.width;

    purpleBox.style.width = `${imageWidth}px`;
    purpleBox.style.height = `${imageHeight}px`;
  };
});
