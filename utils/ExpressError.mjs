class ExpressError extends Error {
  constructor(message,status,url){
    super()
    this.message = message
    this.status = status
    this.url = url
  }
}

export default ExpressError;
