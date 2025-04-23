document.getElementById("checkEligibilityLink").addEventListener("click", function () {
    const message = document.getElementById("message");
    const result = document.getElementById("eligibilityResult");
  
    message.textContent = "📢 Location access is optional to continue.";
  
    if (navigator.geolocation) {
      // First, attempt to get location (optional)
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        message.textContent = "✅ Location granted! Verifying eligibility...";
  
        // Check eligibility and redirect after a small delay
        setTimeout(() => {
          verifyEligibility(lat, lon);
        }, 1000);
  
      }, function () {
        message.textContent = "⚠️ Location not granted. Proceeding without it.";
        setTimeout(() => {
          verifyEligibility(null, null);
        }, 1000);
      });
    } else {
      message.textContent = "❌ Geolocation is not supported in your browser.";
    }
  });
  
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
  
