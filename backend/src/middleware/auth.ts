import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/User"

declare global { // le decimos a TS que vamos a modificar tipos globales EXISTENTES
  namespace Express { // están definidos los tipos internos: interface Request {body, params, query, ...}
    interface Request { // extendemos interface Request {...valores, _}
      user?: IUser // agregamos user al tipo Request
    }
  }
  // quedaria:
  // interface Request {body, params, query, user, ...}
}

export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization

  if(!bearer) {
    const error = new Error('No Autorizado')
    return res.status(401).json({
      error: error.message
    })
  }

  const [, token] = bearer.split(' ')

  if(!token) {
    const error = new Error('No Autorizado')
    return res.status(401).json({
      error: error.message
    })
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET)
    if(typeof result === 'object' && result.id) {
      const user = await User.findById(result.id).select('-password')
      if(!user) {
        const error = new Error('El Usuario No Existe')
        return res.status(404).json({error: error.message})
      }

      // res.json(user)
      req.user = user // escribimos en el objeto global de req
      next()
    }
  } catch (error) {
    res.status(500).json({error: 'Token No Válido'})
  }
}