import { api_key } from "./apikey.js";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`)
  .then((res) => res.json())
  .then((data) => {
    console.log("data", data);
    document.querySelector(".apod-text-box figure img").src = data.url;
    document.querySelector(".apod-text-box figure img").alt = data.title;
    document.querySelector(".apod-article h2").textContent = data.title;
    document.querySelector(".apod-article-explanation ").textContent =
      data.explanation;

    fetchPastImages();
  })
  .catch((error) => console.error(error));

const fetchPastImages = () => {
  const galleryContainer = document.querySelector(".gallery-image-container");
  const dates = [
    "2024-11-01",
    "2024-10-31",
    "2024-10-30",
    "2024-10-29",
    "2024-10-28",
  ];

  dates.forEach((date) =>
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.media_type === "image") {
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          img.src = data.url;
          img.alt = data.title;
          figure.appendChild(img);
          galleryContainer.appendChild(figure);
        }
      })
      .catch((error) => console.log(error))
  );
};
