document.addEventListener('DOMContentLoaded', function() {
    // Xử lý nút Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        // Thực hiện logic đăng xuất (ví dụ: xóa token, chuyển hướng, ...)
        alert('Đăng xuất thành công!');
        // window.location.href = '/login.html';
      });
    }
  
    // Gán sự kiện cho các thiết bị
    const devices = [
      { id: 'curtain', switchId: 'curtainSwitch', imageId: 'curtainImage' },
      { id: 'light', switchId: 'lightSwitch', imageId: 'lightImage' },
      { id: 'fan', switchId: 'fanSwitch', imageId: 'fanImage' },
      { id: 'ac', switchId: 'acSwitch', imageId: 'acImage' },
      { id: 'pump', switchId: 'pumpSwitch', imageId: 'pumpImage' }
    ];
  
    devices.forEach(function(device) {
      const toggle = document.getElementById(device.switchId);
      if (toggle) {
        toggle.addEventListener('change', function() {
          updateDeviceState(device.id, device.imageId, this.checked);
        });
      }
    });
  
    function updateDeviceState(deviceId, imageId, state) {
      const imageElement = document.getElementById(imageId);
      if (imageElement) {
        if (state) {
          imageElement.src = `/Picture/${deviceId}_on.png`;
          imageElement.alt = `${deviceId} ON`;
        } else {
          imageElement.src = `/Picture/${deviceId}_off.png`;
          imageElement.alt = `${deviceId} OFF`;
        }
      }
      // Phát hiệu ứng âm thanh
      const sound = document.getElementById('buttonSound');
      if (sound) {
        sound.play();
      }
    }
  
    // Xử lý form cài đặt thời gian
    const scheduleForm = document.getElementById('scheduleForm');
    if (scheduleForm) {
      scheduleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const scheduleData = {
          curtain: {
            on: document.getElementById('curtainOnTime').value,
            off: document.getElementById('curtainOffTime').value
          },
          light: {
            on: document.getElementById('lightOnTime').value,
            off: document.getElementById('lightOffTime').value
          },
          fan: {
            on: document.getElementById('fanOnTime').value,
            off: document.getElementById('fanOffTime').value
          },
          ac: {
            on: document.getElementById('acOnTime').value,
            off: document.getElementById('acOffTime').value
          },
          pump: {
            on: document.getElementById('pumpOnTime').value,
            off: document.getElementById('pumpOffTime').value
          }
        };
        // Xử lý lưu dữ liệu cài đặt (gửi lên server hoặc lưu vào localStorage)
        console.log('Schedule data:', scheduleData);
        alert('Lưu thay đổi thành công!');
      });
    }
  });

// Nhiệt đô - Độ ẩm
document.addEventListener("DOMContentLoaded", function () {
  // Lấy phần tử hiển thị giá trị nhiệt độ & độ ẩm
  let temperatureText = document.getElementById("temperatureValue");
  let humidityText = document.getElementById("humidityValue");

  // Tạo dữ liệu ban đầu cho biểu đồ
  let labels = [];
  let temperatureData = [];
  let humidityData = [];

  // Cấu hình Chart.js
  let chartConfig = (ctx, label, borderColor, bgColor, data) => {
      return new Chart(ctx, {
          type: "line",
          data: {
              labels: labels,
              datasets: [{
                  label: label,
                  data: data,
                  borderColor: borderColor,
                  backgroundColor: bgColor,
                  borderWidth: 2,
                  fill: true,
                  tension: 0.4, // Làm mượt đường cong
                  pointRadius: 5, // Kích thước điểm dữ liệu
                  pointHoverRadius: 7, // Kích thước khi hover
                  pointBackgroundColor: borderColor,
                  pointBorderWidth: 2,
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: {
                  duration: 1000, // Hiệu ứng animation
                  easing: 'easeInOutQuad'
              },
              plugins: {
                  legend: { display: false },
                  tooltip: { enabled: true },
                  datalabels: {
                      anchor: 'end',
                      align: 'top',
                      color: borderColor,
                      font: { weight: 'bold', size: 12 }
                  }
              },
              scales: {
                  x: { 
                      grid: { display: false }
                  },
                  y: {
                      beginAtZero: false,
                      suggestedMin: 25,
                      suggestedMax: 40
                  }
              }
          }
      });
  };

  // Khởi tạo biểu đồ
  let tempCtx = document.getElementById("temperatureChart").getContext("2d");
  let temperatureChart = chartConfig(tempCtx, "Nhiệt độ (°C)", "#FF5733", "rgba(255, 87, 51, 0.2)", temperatureData);

  let humCtx = document.getElementById("humidityChart").getContext("2d");
  let humidityChart = chartConfig(humCtx, "Độ ẩm (%)", "#007BFF", "rgba(0, 123, 255, 0.2)", humidityData);

  // Hàm cập nhật dữ liệu mới sau mỗi 5 giây
  function updateData() {
      let newTemp = Math.floor(Math.random() * (35 - 28 + 1) + 28); // Random nhiệt độ 28 - 35 °C
      let newHumidity = Math.floor(Math.random() * (70 - 50 + 1) + 50); // Random độ ẩm 50 - 70 %

      let currentTime = new Date().toLocaleTimeString().split(":").slice(0, 2).join(":"); // Lấy giờ:phút

      // Cập nhật giá trị hiển thị
      temperatureText.textContent = `${newTemp} °C`;
      humidityText.textContent = `${newHumidity} %`;

      // Cập nhật dữ liệu biểu đồ
      if (labels.length >= 10) {
          labels.shift();
          temperatureData.shift();
          humidityData.shift();
      }

      labels.push(currentTime);
      temperatureData.push(newTemp);
      humidityData.push(newHumidity);

      // Cập nhật biểu đồ
      temperatureChart.update();
      humidityChart.update();
  }

  // Cập nhật dữ liệu mỗi 5 giây
  setInterval(updateData, 5000);
});
