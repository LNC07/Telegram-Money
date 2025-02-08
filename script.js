document.getElementById("watchAd").addEventListener("click", function() {
    window.open("https://your-monetag-smartlink.com", "_blank");  // Monetag Link
    let points = localStorage.getItem("points") || 0;
    points = parseInt(points) + 10;  // প্রতি বিজ্ঞাপনে ১০ পয়েন্ট
    localStorage.setItem("points", points);
    document.getElementById("points").innerText = points;
});
