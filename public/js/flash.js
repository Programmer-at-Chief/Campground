const close_button = document.querySelector('#close_button')
const alert = close_button.parentElement.parentElement

function closeAlert() {
  alert.classList.add('opacity-0');
  alert.hidden = true;

  setTimeout(function() {
    alert.style.display = 'none'; 
  }, 500);
}

close_button.addEventListener('click',closeAlert)

setTimeout(closeAlert, 3000);
