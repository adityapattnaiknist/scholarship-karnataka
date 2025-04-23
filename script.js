window.onload = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Location access granted
          document.getElementById("redirectBtn").style.display = "inline-block";
        },
        function (error) {
          alert("Location access is required to continue.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  
    document.getElementById("redirectBtn").addEventListener("click", function () {
      window.location.href = "https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php";
    });
  };
  