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
    description.innerText =
      selectedImage.description || "There is no description available.";

    const viewDetailsLink = document.querySelector(".view-details-btn");
    viewDetailsLink.href = selectedImage.link;
  } else {
    const message = document.createElement("p");
    message.innerHTML = "The image has not been selected.";
    document.querySelector("section").appendChild(message);
  }
});

const deleteBtn = document.querySelector(".delete-collection-btn");
deleteBtn.addEventListener("click", () => {
  const deleteConfirm = window.confirm("Are you sure you want to delete this?");
  if (deleteConfirm) {
    localStorage.removeItem("collection");
    ("The collection has been deleted.");
    return (window.location.href = "collection.html");
  } else {
    return;
  }
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
