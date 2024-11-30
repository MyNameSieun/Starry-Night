document.addEventListener("DOMContentLoaded", () => {
  // 로컬 스토리지 가져오기  (없으면 빈 배열로 초기화)
  const collection = JSON.parse(localStorage.getItem("collection")) || [];

  const collectionSection = document.querySelector("#collection-section");

  collection.forEach((item) => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = item.imgSrc;
    img.alt = item.title;

    figure.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = item.title;
    figure.appendChild(figcaption);

    collectionSection.appendChild(figure);

    // figure  클릭 시 상세 페이지로 이동
    figure.addEventListener("click", () => {
      localStorage.setItem("selectedImage", JSON.stringify(item));
      window.location.href = "collection-details.html";
    });
  });
  if (collection.length == 0) {
    const message = document.createElement("p");
    message.innerHTML = "현재 콜렉션에 저장된 이미지가 없습니다.";
    collectionSection.appendChild(message);
  }
});
