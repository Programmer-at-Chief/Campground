const navbar_elements = document.querySelectorAll('a')

const remove_click = (navbar_elements) => {
  for (element of navbar_elements){
    if (element.classList.contains('navbar_item')){
      element.classList.remove('text-white')
    }
  }
}

const add_white = (navbar_elements) =>{
  for (element of navbar_elements){
    if (element.classList.contains('navbar_item')){
      element.addEventListener('click',()=>{
        remove_click(navbar_elements)
        element.classList.remove('text-gray-700')
        element.classList.add('text-white')
        
      })
    }
  }
}

