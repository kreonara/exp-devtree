import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if(origin === process.env.FRONTEND_URL) {
      callback(null, true) // error = null, permitirConexión = true
    } else {
      callback(new Error('Error de CORS'))
    }
  }
}