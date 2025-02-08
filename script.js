document.getElementById("watchAd").addEventListener("click", function() {
    show_8912734().then(() => {
        // ইউজার অ্যাড দেখার পর এখানে পয়েন্ট যুক্ত হবে
        let points = localStorage.getItem("points") || 0;
        points = parseInt(points) + 10;  // প্রতিটি অ্যাডে ১০ পয়েন্ট
        localStorage.setItem("points", points);
        document.getElementById("points").innerText = points;
        alert("✅ You have earned 10 points!");
    }).catch(() => {
        alert("⚠ Ad failed to load. Please try again!");
    });
});
