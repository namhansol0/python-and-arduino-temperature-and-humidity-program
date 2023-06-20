// 아두이노에서 전달된 온습도 및 불쾌지수 값
var temperature = 0;
var humidity = 0;
var discomfortIndex = 0;

// DOM 요소 선택
var temperatureElement = document.getElementById("temperature");
var humidityElement = document.getElementById("humidity");
var discomfortIndexElement = document.getElementById("discomfortIndex");

// 온습도 및 불쾌지수 값 업데이트 함수
function updateData() {
  temperatureElement.textContent = "온도: " + temperature + "°C";
  humidityElement.textContent = "습도: " + humidity + "%";
  discomfortIndexElement.textContent = "불쾌지수: " + discomfortIndex;
}

// 웹 소켓을 통해 아두이노에서 데이터 수신
var socket = new WebSocket("ws://192.168.0.10:COM4");
socket.onmessage = function(event) {
  var data = JSON.parse(event.data);
  temperature = data.temperature;
  humidity = data.humidity;
  discomfortIndex = data.discomfortIndex;
  updateData();
};

// 웹 소켓 연결이 성공적으로 수립되었을 때 실행
socket.onopen = function() {
  console.log("WebSocket 연결 성공");

  // 서버로부터 초기 데이터 요청
  socket.send("getData");
};

// 웹 소켓 연결이 닫혔을 때 실행
socket.onclose = function() {
  console.log("WebSocket 연결 종료");
};
