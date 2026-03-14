import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const whiteList = [process.env.FRONTEND_URL]
    if(process.argv[2] === '--api') {
      whiteList.push(undefined)
    }

    // if(origin === process.env.FRONTEND_URL) {
    if(whiteList.includes(origin)) {
      callback(null, true) // error = null, permitirConexión = true
    } else {
      callback(new Error('Error de CORS'))
    }
  }
}