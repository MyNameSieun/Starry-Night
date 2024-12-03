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

// 'Delete Collection' 버튼 클릭 시, 선택된 이미지만 삭제
const deleteBtn = document.querySelector(".delete-collection-btn");
deleteBtn.addEventListener("click", () => {
  const selectedImage = JSON.parse(localStorage.getItem("selectedImage"));

  if (selectedImage) {
    const collection = JSON.parse(localStorage.getItem("collection")) || [];

    // 삭제할 항목을 제외한 새로운 배열 생성
    const updatedCollection = collection.filter(
      (item) => item.title !== selectedImage.title
    );

    localStorage.setItem("collection", JSON.stringify(updatedCollection));

    window.alert("The selected image has been deleted.");
    window.location.href = "collection.html";
  } else {
    window.alert("No image selected to delete.");
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
