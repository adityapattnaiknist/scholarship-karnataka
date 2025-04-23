document.getElementById("checkEligibilityLink").addEventListener("click", function () {
  const message = document.getElementById("message");
  const result = document.getElementById("eligibilityResult");

  // Inform the user that location is needed for eligibility verification
  message.textContent = "📢 We need to check if you are from an eligible state for this scholarship.";

  // Ask for location until granted
  requestLocation();

  function requestLocation() {
    if (navigator.geolocation) {
      // Request location access
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        message.textContent = "✅ Location granted! Verifying eligibility...";

        // Check eligibility after getting location
        setTimeout(() => {
          verifyEligibility(lat, lon);
        }, 1000);

      }, function () {
        // If user denies location, show message and ask again
        message.textContent = "⚠️ We need to check if you are from Karnataka, Tamil Nadu, Kerala, Andhra Pradesh, Telangana, or Odisha.";
        setTimeout(requestLocation, 2000); // Retry after 2 seconds
      });
    } else {
      message.textContent = "❌ Geolocation is not supported in your browser.";
    }
  }

  function verifyEligibility(lat, lon) {
    const result = document.getElementById("eligibilityResult");

    // States that are eligible for the scholarship
    const allowedStates = [
      "Karnataka", "Tamil Nadu", "Kerala", 
      "Andhra Pradesh", "Telangana", "Odisha"
    ];

    // If location is available, check the state
    if (lat && lon) {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const state = data.address.state || "";
          if (allowedStates.includes(state)) {
            if (state === "Karnataka") {
              result.textContent = "✅ You are eligible as a resident student of Karnataka.";
              result.classList.add("eligible");
              setTimeout(() => {
                window.location.href = "https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php";
              }, 3000);
            } else {
              result.textContent = `✅ You are eligible as a resident of ${state}.`;
              result.classList.add("eligible");
              setTimeout(() => {
                window.location.href = "https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php";
              }, 3000);
            }
          } else {
            result.textContent = "❌ You are not eligible. This scholarship is for South Indian states only.";
            result.classList.add("ineligible");
          }
        })
        .catch(err => {
          console.error("API Error:", err);
          result.textContent = "⚠️ Unable to verify location. Please try again.";
          result.classList.add("ineligible");
        });
    } else {
      result.textContent = "❌ Location is required to verify eligibility.";
      result.classList.add("ineligible");
    }
  }
});
