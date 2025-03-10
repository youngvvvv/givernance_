function setLocalData() {
    try {
        var stringData = document.getElementById("localDataInput").value;
        localStorage.setItem("stringData_", stringData);
    } catch (error) {
        console.error("Error setting data:", error);
    }
}

var getData = localStorage.getItem("stringData_");
var qrcodeText = "https://localhost:3000/loginMobile.html?data="+getData; // 포트 번호 제거
new QRCode(document.getElementById("qrcodeImage"), {
    width: 200,
    height: 200,
    colorDark: "rgb(245,245,220)",
    colorLight: "rgb(85, 107, 47)",
    text: qrcodeText
});

document.addEventListener('DOMContentLoaded', (event) => {
    const setLocalDataButton = document.getElementById("setLocalData");
    if (setLocalDataButton) {
        setLocalDataButton.addEventListener('click', setLocalData);
    }
});
document.addEventListener('DOMContentLoaded', function() {

    // WebSocket 연결
    const ws = new WebSocket('wss://localhost:3000/');

    ws.onopen = function() {
        console.log('WebSocket connection established');
        // 초기 로그인 상태를 false로 설정
        localStorage.setItem('loginStatus', 'false');
    };

    ws.onmessage = function(event) {
        console.log('Message from server:', event.data);
        const data = JSON.parse(event.data);
        
        // localStorage에 loginStatus 업데이트
        localStorage.setItem('loginStatus', data);

        // Optional: 로그인 상태에 따라 추가 작업
        if (data) {
            console.log("Login successful!");
  
            // 조건이 참이면 index.html로 페이지를 리디렉트합니다.
            window.location.href = '/index.html';
    
            // 필요한 경우 여기서 추가 작업 수행
        } else {
            console.log("Login failed. Face does not match.");
            // 실패 시 추가 작업 수행
        }
    };

    function updateLoginStatus(isMatch) {
        console.log('Updating login status:', isMatch);
        localStorage.setItem('loginStatus', JSON.stringify(isMatch));
        displayLoginStatus();
    }

    function displayLoginStatus() {
        const status = localStorage.getItem('loginStatus');
        console.log('Current login status:', status);
        // 필요하다면 로그인 상태를 표시하는 로직 추가
    }
});
