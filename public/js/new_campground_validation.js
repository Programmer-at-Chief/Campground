const form = document.querySelector('#form')
const title = document.querySelector('#title')
const city = document.querySelector('#city')
const state = document.querySelector('#state')
const description = document.querySelector('#description')
const price = document.querySelector('#price')

const title_err = () => {
  const title_error = document.querySelector('#title_error')
  if (title.value === '' || title.value === null){
    title.parentElement.classList.add('border-[3px]') 
    title.parentElement.classList.add('border-red-500') 
    title_error.innerText = 'Never seen anyone go to the unnamed campgrounds.'
    return true
  }
  else{
    title_error.innerText = ""
    title.parentElement.classList.remove('border-[3px]') 
    title.parentElement.classList.remove('border-red-500') 
    return false
  }
}

const city_err = () => {
  //const city_error = document.querySelector('#city_error')
  if (city.value === '' || city.value === null){
    city.parentElement.classList.add('border-[3px]') 
    city.parentElement.classList.add('border-red-500') 
    //city_error.innerText = 'It must be somewhere.'
    return true
  }
  else{
    //city_error.innerText = ""
    city.parentElement.classList.remove('border-[3px]') 
    city.parentElement.classList.remove('border-red-500') 
    return false
  }
}

const state_err = () => {
  const state_error = document.querySelector('#state_error')
  if (state.value === '' || state.value === null){
    state.parentElement.classList.add('border-[3px]') 
    state.parentElement.classList.add('border-red-500') 
    state_error.innerText = 'It must be somewhere.'
    return true
  }
  else{
    state_error.innerText = ""
    state.parentElement.classList.remove('border-[3px]') 
    state.parentElement.classList.remove('border-red-500') 
    return false
  }
}

const desc_err = () => {
  const desc_error = document.querySelector('#desc_error')
  if (description.value === '' || description.value === null){
    description.parentElement.classList.add('border-[3px]') 
    description.parentElement.classList.add('border-red-500') 
    desc_error.innerText = 'Calm down cowboy.'
    return true
  }
  else{
    desc_error.innerText = ""
    description.parentElement.classList.remove('border-[3px]') 
    description.parentElement.classList.remove('border-red-500') 
    return false
  }
}

const price_err = () => {
  const price_error = document.querySelector('#price_error')
  if (price.value === '' || price.value === null){
    price.parentElement.classList.add('border-[3px]') 
    price.parentElement.classList.add('border-red-500') 
    price_error.innerText = 'Enter 0 for free.'
    return true
  }
  else{
    price_error.innerText = ""
    price.parentElement.classList.remove('border-[3px]') 
    price.parentElement.classList.remove('border-red-500') 
    return false
  }
}

title.addEventListener('change', (e) => {
  title_err()
})
city.addEventListener('change', (e) => {
  city_err()
})
state.addEventListener('change', (e) => {
  state_err()
})
description.addEventListener('change', (e) => {
  desc_err()
})
price.addEventListener('change', (e) => {
  price_err()
})

form.addEventListener('submit',(e) => {
  e.preventDefault()
  let output = title_err()
  output = output || state_err()
  output = output || city_err()
  output = output || desc_err()
  output = output || price_err()
  //title_err()
  //city_err()
  //state_err()
  //desc_err()
  //price_err()
  
  if (!output){
    form.submit()
  }
})
