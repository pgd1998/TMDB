function onClick() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function onClose() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
