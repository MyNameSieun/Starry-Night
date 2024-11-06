// 'input[type="month"]' 요소 선택
const monthInput = document.querySelector('input[type="month"]');

// 현재 달을 기준으로 자동 설정
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  monthInput.value = `${currentYear}-${currentMonth}`; // YYYY-MM 형식으로 설정

  // 현재 달에 해당하는 사진을 자동으로 로드
  const startDate = new Date(currentYear, today.getMonth(), 1); // 현재 달의 첫날
  const endDate = new Date(currentYear, today.getMonth() + 1, 0); // 현재 달의 마지막 날

  // 이미지 출력 영역 (이미지를 추가할 곳)
  const galleryContainer = document.querySelector("#gallery-section");
  galleryContainer.innerHTML = ""; // 기존 이미지를 초기화

  fetchImagesForMonth(startDate, endDate, galleryContainer); // 현재 달의 이미지를 불러오기
});

// 날짜가 변경되면 실행될 함수
monthInput.addEventListener("input", () => {
  // 선택한 날짜를 YYYY-MM 형태로 가져오기
  const selectedMonth = monthInput.value;

  // 선택한 월의 첫 날과 마지막 날을 계산
  const [year, month] = selectedMonth.split("-");
  const startDate = new Date(year, month - 1, 1); // 해당 월의 첫 날
  const endDate = new Date(year, month, 0); // 해당 월의 마지막 날

  // 이미지 출력 영역 (이미지를 추가할 곳)
  const galleryContainer = document.querySelector("#gallery-section");
  galleryContainer.innerHTML = ""; // 기존 이미지를 초기화

  // 월별로 이미지를 가져오는 함수
  fetchImagesForMonth(startDate, endDate, galleryContainer);
});

// 특정 날짜 범위에 대한 APOD 이미지를 가져오는 함수
const fetchImagesForMonth = (startDate, endDate, galleryContainer) => {
  const NASA_API_KEY = "hXzhWynDXKH24nM7TSingnIGpjkmqxclicPuvbCn"; // API 키

  // 시작 날짜에서 끝 날짜까지 반복하면서 이미지 요청
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const formattedDate = date.toISOString().split("T")[0]; // 날짜를 YYYY-MM-DD 형태로 포맷

    // NASA API에 요청
    fetch(
      `https://api.nasa.gov/planetary/apod?date=${formattedDate}&api_key=${NASA_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.media_type === "image") {
          // 이미지가 있으면 갤러리에 추가
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          img.src = data.url; // 이미지 URL
          img.alt = data.title; // 이미지 제목
          const figcaption = document.createElement("figcaption");
          figcaption.textContent = data.title; // 이미지 설명 추가

          figure.appendChild(img);
          figure.appendChild(figcaption);
          galleryContainer.appendChild(figure);
        }
      })
      .catch((error) => console.error("Error fetching image:", error));
  }
};
