const form = document.querySelector('#review_form')
const review= document.querySelector('#review')
const review_error = document.querySelector('#review_error')

const empty_review= () => {
  if (review.value === '' || review.value === null){
    review.classList.add('border-[3px]') 
    review.classList.add('border-red-500') 
    review_error.innerText = 'Fill up you robot !!'
    return true
  }

  else{
    review_error.innerText = ""
    review.classList.remove('border-[3px]') 
    review.classList.remove('border-red-500') 
    return false
  }
}

review.addEventListener('change', (e) => {
  empty_review()
})


form.addEventListener('submit',(e) => {
  e.preventDefault()
  let output = empty_review()
  
  if (!output){
    form.submit()
  }
})

