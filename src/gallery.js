const monthInput = document.querySelector("input[type='month']");

// 현재 날짜를 기준으로 자동으로 설정
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const currentYear = today.getFullYear(); // 현재 연도
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0"); // 현재 월

  // YYYY-MM 형식으로 설정
  monthInput.value = `${currentYear}-${currentMonth}`;

  // 현재 달에 해당하는 이미지들을 자동으로 불러오기
  const startDate = new Date(currentYear, today.getMonth(), 1); // 현재 달의 첫 날
  const endDate = new Date(currentYear, today.getMonth() + 1, 0); // 현재 달의 마지막 날

  const galleryContainer = document.querySelector("#gallery-section");
  fetchImagesForMonth(startDate, endDate, galleryContainer);
});

// 날짜 변경되면 실행할 함수
monthInput.addEventListener("input", () => {
  // YYYY-MM 형태로 사용자가 선택한 날짜 가져오기
  const selectedMonth = monthInput.value;

  const [year, month] = selectedMonth.split("-");
  console.log(year);
  console.log(month);
  // js에서 month는 0부터 시작하므로 인덱스 맞춰줘야 한다
  const startDate = new Date(year, month - 1, 1); // 첫 날 구하기 (e.g. 2024년 11월 1일)
  const endDate = new Date(year, month, 0); // 마지막날 구하기 (e.g. 2024년 11월 30일)

  const galleryContainer = document.querySelector("#gallery-section");
  galleryContainer.innerHTML = ""; // 기존 이미지를 초기화
  fetchImagesForMonth(startDate, endDate, galleryContainer);
});

// 특정 날짜에 대한 APOD 이미지 가져오는 함수
const fetchImagesForMonth = (startDate, endDate, galleryContainer) => {
  const NASA_API_KEY = "hXzhWynDXKH24nM7TSingnIGpjkmqxclicPuvbCn";

  // 반복문에서 날짜 증가시키기
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형태로 날짜 포맷

    fetch(
      `https://api.nasa.gov/planetary/apod?date=${formattedDate}&api_key=${NASA_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        // 이미지가 있을 때만 갤러리에 추가
        if (data.media_type === "image") {
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          img.src = data.url; // 이미지 URL
          img.alt = data.title; // 이미지 제목

          const figcaption = document.createElement("figcaption");
          figcaption.textContent = data.title; // 이미지 제목

          figure.appendChild(img);
          figure.appendChild(figcaption);
          galleryContainer.appendChild(figure);
        }
      })
      .catch((error) => console.error("Error fetching image:", error));
  }
};
