import axios from "axios";
import { configDotenv } from "dotenv";

//configDotenv()

class Radar {
  constructor(){
    this.url = 'https://api.radar.io/v1/geocode/forward'
    this.key = process.env.MAP_KEY
    this.headers = {
      'Authorization' : this.key
    }
  }
  async get_coordinates(location){
    const params = {
      query : location
    }
    const result = await axios.get(this.url,{params: params,headers : this.headers})

    return result
  }
}

export default Radar
