import { api_key } from "./apikey.js";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
