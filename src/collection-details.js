document.addEventListener("DOMContentLoaded", () => {
  const selectedImage = JSON.parse(localStorage.getItem("selectedImage"));

  if (selectedImage) {
    // 해당 요소들을 id로 선택
    const image = document.querySelector("#collection-image");
    const title = document.querySelector("#collection-title");
    const date = document.querySelector("#collection-date");
    const description = document.querySelector("#collection-description");

    console.log(selectedImage);

    image.src = selectedImage.imgSrc;
    image.alt = selectedImage.title;

    title.innerText = selectedImage.title;
    date.innerHTML = selectedImage.date;
    description.innerText = selectedImage.description || "설명이 없습니다.";
  } else {
    const message = document.createElement("p");
    message.innerHTML = "이미지가 선택되지 않았습니다.";
    document.querySelector("section").appendChild(message);
  }
});
