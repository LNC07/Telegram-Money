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
    alert("🔁 Auto Ads started! Ads will keep showing every 5 seconds...");
    
    let autoAdInterval = setInterval(() => {
        show_8912734().then(() => {
            addPoints(10);
        }).catch(() => {
            alert("⚠ Ad failed to load! Stopping auto ads...");
            clearInterval(autoAdInterval); // যদি অ্যাড লোড না হয়, তাহলে Auto Ads বন্ধ হয়ে যাবে
        });
    }, 5000); // 5 সেকেন্ড পর পর নতুন অ্যাড দেখাবে

    // Auto Ads বন্ধ করার জন্য ক্লিয়ার বাটন (ইচ্ছা করলে রাখতে পারো)
    let stopButton = document.createElement("button");
    stopButton.innerText = "⛔ Stop Auto Ads";
    stopButton.style.display = "block";
    stopButton.style.margin = "10px auto";
    stopButton.style.padding = "10px";
    stopButton.style.background = "red";
    stopButton.style.color = "white";
    stopButton.style.border = "none";
    stopButton.style.cursor = "pointer";
    document.body.appendChild(stopButton);

    stopButton.addEventListener("click", function () {
        clearInterval(autoAdInterval);
        alert("❌ Auto Ads Stopped!");
        stopButton.remove();
    });
});

function addPoints(amount) {
    let points = localStorage.getItem("points") || 0;
    points = parseInt(points) + amount;
    localStorage.setItem("points", points);
    document.getElementById("points").innerText = points;
}
