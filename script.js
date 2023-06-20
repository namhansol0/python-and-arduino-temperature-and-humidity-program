// DOM 요소 선택
var temperatureElement = document.getElementById("temperature");
var humidityElement = document.getElementById("humidity");
var discomfortIndexElement = document.getElementById("discomfortIndex");

// 데이터 업데이트 함수
function updateData(temperature, humidity, discomfortIndex) {
  temperatureElement.textContent = "온도: " + temperature + "°C";
  humidityElement.textContent = "습도: " + humidity + "%";
  discomfortIndexElement.textContent = "불쾌지수: " + discomfortIndex;
}

// 서버로 데이터 전송 함수
function sendData(temperature, humidity, discomfortIndex) {
  var xhr = new XMLHttpRequest();
  var url = "https://animated-cat-945af1.netlify.app/update"; // Arduino 코드에서 사용한 서버 URL로 변경해야 합니다.

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("데이터 전송 완료");
    }
  };
  var data = "temp=" + temperature + "&hum=" + humidity + "&di=" + discomfortIndex;
  xhr.send(data);
}

// 웹 소켓을 통해 아두이노에서 데이터 수신
var socket = new WebSocket("ws://https://animated-cat-945af1.netlify.app:443"); // Arduino 코드에서 사용한 서버 주소 및 포트로 변경해야 합니다.
socket.onmessage = function (event) {
  var data = JSON.parse(event.data);
  var temperature = data.temperature;
  var humidity = data.humidity;
  var discomfortIndex = data.discomfortIndex;
  updateData(temperature, humidity, discomfortIndex);
  sendData(temperature, humidity, discomfortIndex);
};

// 웹 소켓 연결이 성공적으로 수립되었을 때 실행
socket.onopen = function () {
  console.log("WebSocket 연결 성공");

  // 서버로부터 초기 데이터 요청
  socket.send("getData");
};

// 웹 소켓 연결이 닫혔을 때 실행
socket.onclose = function () {
  console.log("WebSocket 연결 종료");
};
