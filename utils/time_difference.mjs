function time_difference(old_time) {
  const cur_date = new Date()
  const differ = cur_date - old_time;

  const differenceInHours = Math.floor(differ / (1000 * 60 * 60));
  const differenceInDays = Math.floor(differ/ (1000 * 60 * 60 * 24));
  const differenceInMonths = Math.floor(differ/ (1000 * 60 * 60 * 24 * 30));
  const differenceInYears = Math.floor(differ/ (1000 * 60 * 60 * 24 * 30 * 365));

  let time; 

  if (differenceInYears > 1 ){
    time = `${differenceInYears} years ago`
  }
  else if (differenceInMonths > 1){
    time = `${differenceInMonths} months ago`
  }
  else if (differenceInDays > 1){
    time = `${differenceInDays} days ago`
  }
  else if (differenceInHours > 1){
    time = `${differenceInHours} hours ago`
  }
  else{
    time = `moments ago`
  }

  return time
}

export default time_difference
