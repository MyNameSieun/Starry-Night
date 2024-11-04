import { NASA_API_KEY } from "./apikey.js";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    console.log("data", data);
    document.querySelector(".apod-img-day").textContent = data.date;
    document.querySelector(".apod-text-box figure img").src = data.url;
    document.querySelector(".apod-text-box figure img").alt = data.title;
    document.querySelector(".apod-article h2").textContent = data.title;
    document.querySelector(".apod-article-explanation").textContent =
      data.explanation;

    fetchPastImages();
  })
  .catch((error) => console.error(error));

const fetchPastImages = () => {
  const galleryContainer = document.querySelector(".gallery-image-container");

  const today = new Date();
  const dates = [];

  for (let i = 1; i <= 5; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    dates.push(pastDate.toISOString().split("T")[0]);
  }

  dates.forEach((date) =>
    fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${NASA_API_KEY}`
    )
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
