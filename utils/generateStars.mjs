function generateStars(rating) {
  let starsHTML = '';
  
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starsHTML += `<svg class = 'w-[25px] h-[25px] mr-1 inline fill-yellow-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>`;
    } else {
      starsHTML += `<svg class = 'w-[25px] h-[25px] mr-1 inline ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>`;
    }
  }

  return starsHTML;
}

export default generateStars
