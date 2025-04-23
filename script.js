window.onload = function () {
  const message = document.getElementById("message");
  const result = document.getElementById("eligibilityResult");

  message.textContent = "📍 Requesting location access to check eligibility...";

  requestLocation();

  function requestLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          message.textContent = "✅ Location access granted! Verifying eligibility...";

          verifyEligibility(lat, lon);
        },
        function () {
          message.textContent = "❌ Location denied. We need your location to verify eligibility that whetherr you belong to the elligible states or UT's or not";
          setTimeout(requestLocation, 2000);
        }
      );
    } else {
      message.textContent = "⚠️ Geolocation is not supported in your browser.";
    }
  }

  function verifyEligibility(lat, lon) {
    const allowedStates = [
      "Karnataka", "Tamil Nadu", "Kerala", 
      "Andhra Pradesh", "Telangana", "Odisha"
    ];

    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const state = data.address.state || "";
        if (allowedStates.includes(state)) {
          result.textContent = `✅ You are eligible as a resident of ${state}. Redirecting...`;
          result.classList.add("eligible");
          setTimeout(() => {
            window.location.href = "https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php";
          }, 3000);
        } else {
          result.textContent = "❌ You are not eligible. Only South Indian states are eligible.";
          result.classList.add("ineligible");
        }
      })
      .catch(err => {
        console.error("API Error:", err);
        result.textContent = "⚠️ Unable to verify location. Please try again.";
      });
  }
};
