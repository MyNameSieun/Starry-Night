// 선택된 이미지 가져오기
document.addEventListener("DOMContentLoaded", () => {
  const selectedImage = JSON.parse(localStorage.getItem("selectedImage"));
  console.log("selectedImage", selectedImage);

  if (selectedImage) {
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

    const viewDetailsLink = document.querySelector(".view-details-btn");
    viewDetailsLink.href = selectedImage.link;
  } else {
    const message = document.createElement("p");
    message.innerHTML = "이미지가 선택되지 않았습니다.";
    document.querySelector("section").appendChild(message);
  }
});

const deleteBtn = document.querySelector(".delete-collection-btn");
deleteBtn.addEventListener("click", () => {
  localStorage.removeItem("collection");

  const deleteConfirm = window.confirm("정말 삭제하시겠습니까?");
  if (deleteConfirm == true) {
    alert("collection을 삭제하였습니다.");
  } else {
    return;
  }

  window.location.href = "collection.html";
});
