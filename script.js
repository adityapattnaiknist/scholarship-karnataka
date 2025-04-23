window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log("you are elligible to apply the post .");
        // You can do something useful here if you want later
      },
      function (error) {
        console.warn("you are not elligible to view as geographic restrictions");
      }
    );
  } else {
    console.warn("Restrriction due to server unreachable");
  }

  document.getElementById("redirectBtn").addEventListener("click", function () {
    window.location.href = "https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php";
  });
};
