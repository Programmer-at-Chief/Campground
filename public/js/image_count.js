const imageInput = document.querySelector('#image');
const imageCountDisplay = document.querySelector('#imageCount');

imageInput.addEventListener('change', function() {
  const fileCount = imageInput.files.length; // Get the number of selected files
  const filenames = [] 
  for (let file of imageInput.files){
    filenames.push(`'${file.name}'`)
  }
  imageCountDisplay.textContent = `${filenames.join(', ')}      ${fileCount} image(s) selected`; // Update the display
});

