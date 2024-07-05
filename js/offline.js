// offline.js
function reloadPage() {
    location.reload();
  }
  
  // Check for online status and redirect to index.html if online
  if (navigator.onLine) {
    window.location.href = 'index.html';
  }
  else {
    alert('Still offline. Please check your internet connection.');
}
  