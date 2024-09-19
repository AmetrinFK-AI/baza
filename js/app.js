function updateClock() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = now.getFullYear();
    dateElement.textContent = `${day}.${month}.${year}`;
}

setInterval(updateClock, 1000); // Оновлювати час кожну секунду
updateClock();

function goToLogin() {
    window.location.href = "admin_dashboard.html"; // Перенаправляем на страницу логина
}



