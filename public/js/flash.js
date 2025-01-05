const nots = document.querySelectorAll('.notification');
for (let notification of nots){
  notification.addEventListener('click', () => {
    notification.classList.add('hidden');
  });

  // Wait 3 seconds before triggering closeAlert
  setTimeout(() => { notification.classList.add('hidden')}, 3000);
}
