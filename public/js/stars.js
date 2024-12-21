const rating = document.querySelector('#rating')
const rating_value = document.querySelector('#rating_value')
const star = '<svg class = \'w-[25px] h-[25px] mr-1 inline \' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>'
rating.addEventListener('change',() => {
  let stars = ''
  for (let i=0 ;i<rating.value ;i++){
    stars +=star
    stars +=' '
  }
  rating_value.innerHTML = stars
})


