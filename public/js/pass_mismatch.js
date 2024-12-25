const password = document.querySelector('#password')
const c_password = document.querySelector('#c_password')
const mismatch = document.querySelector('#mismatch')

const pass_error = () => {
  if (password.value !== c_password.value ){
    mismatch.innerText = 'The passwords do not match.'
  }
  else{
    mismatch.innerText = ''
  }
}

c_password.addEventListener('change',pass_error)
