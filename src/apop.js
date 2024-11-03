import { api_key } from "./apikey.js";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`)
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
