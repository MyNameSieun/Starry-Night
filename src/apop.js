import { NASA_API_KEY } from "./apikey.js";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    console.log("APOD 데이터", data);

    document.querySelector(".apop-img-info h2").textContent = data.title;
    document.querySelector(".apop-img-info date").textContent = data.date;

    const imgElement = document.querySelector("#apop-figure img");
    imgElement.src = data.url;
    imgElement.alt = data.title;

    document.querySelector(".apop-article p").textContent = data.explanation;

    const viewDetailsLink = document.querySelector(".view-details-btn");
    viewDetailsLink.href = data.url;
  })
  .catch((error) => console.log(error));

// 로컬 스토리지에 콜렉션 저장
document.querySelector(".save-collection-btn").addEventListener("click", () => {
  const apopData = {
    title: document.querySelector(".apop-img-info h2").innerText,
    date: document.querySelector(".apop-img-info date").innerText,
    img: document.querySelector("#apop-figure img").src,
    description: document.querySelector(".apop-article p").innerText,
    link: document.querySelector(".apop-btn a").innerText,
  };
  localStorage.setItem("collection", apopData);

  alert("Collection에 저장되었습니다!");
});
