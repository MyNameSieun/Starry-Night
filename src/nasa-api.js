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
  })
  .catch((error) => console.error(error));
