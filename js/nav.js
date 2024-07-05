document.addEventListener("DOMContentLoaded", function() {
    const userEmail = localStorage.getItem("userEmail");
    const storeLink = document.getElementById("storeLink");

    if (userEmail) {
      document.getElementById("userEmail").textContent = userEmail;
      document.getElementById("userMenu").style.display = "block";
      document.getElementById("loginRegisterLink").style.display = "none";

      document.getElementById("logoutLink").addEventListener("click", function() {
        localStorage.removeItem("userEmail");
        window.location.href = "index.html"; // Redirect to index.html
      });
      
    } else {
      document.getElementById("userMenu").style.display = "none";
      document.getElementById("loginRegisterLink").style.display = "block";
      
      storeLink.style.display = "none";
    }
  });