document.addEventListener("DOMContentLoaded", function () {
    let points = localStorage.getItem("points") || 0;
    document.getElementById("points").innerText = points;
});

document.getElementById("watchAd").addEventListener("click", function () {
    show_8912734().then(() => {
        addPoints(10);
        alert("✅ You have earned 10 points!");
    }).catch(() => {
        alert("⚠ Ad failed to load. Please try again!");
    });
});

document.getElementById("autoAds").addEventListener("click", function () {
    alert("🔁 Auto Ads started! Ads will keep showing...");
    function showAds() {
        show_8912734().then(() => {
            addPoints(10);
            setTimeout(showAds, 5000); // 5 সেকেন্ড পর পর অ্যাড দেখাবে
        }).catch(() => {
            alert("⚠ Ad failed to load! Stopping auto ads...");
        });
    }
    showAds();
});

function addPoints(amount) {
    let points = localStorage.getItem("points") || 0;
    points = parseInt(points) + amount;
    localStorage.setItem("points", points);
    document.getElementById("points").innerText = points;
}
