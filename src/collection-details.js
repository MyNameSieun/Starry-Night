document.addEventListener("DOMContentLoaded", () => {
  const selectedImage = JSON.parse(localStorage.getItem("selectedImage"));

  if (selectedImage) {
    const image = document.getElementById("collection-image");
    const title = document.getElementById("collection-title");
    const description = document.getElementById("collection-description");

    // console.log(selectedImage);

    image.src = selectedImage.imgSrc;
    image.alt = selectedImage.title;
    title.innerText = selectedImage.title;
    description.innerText = selectedImage.description || "설명이 없습니다.";
  } else {
    const message = document.createElement("p");
    message.innerHTML = "이미지가 선택되지 않았습니다.";
    document.getElementById("collection-section").appendChild(message);
  }
});
