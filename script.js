document.getElementById('driveLink').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default navigation

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Optional: Show location info or redirect
        document.getElementById('locationInfo').textContent =
          `Location accessed: Latitude ${lat}, Longitude ${lon}`;

        // Then redirect to the drive link
        window.location.href = "https://drive.google.com/your-link-here";
      },
      (error) => {
        document.getElementById('locationInfo').textContent =
          "Location access denied. Cannot proceed.";
      }
    );
  } else {
    document.getElementById('locationInfo').textContent =
      "Geolocation is not supported by this browser.";
  }
});
