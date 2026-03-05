import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import slug from 'slug';
import User from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth';

export const createAccount = async(req: Request, res: Response) => {
  const { email, password } = req.body

  const userExists = await User.findOne({email})
  if(userExists) {
    const error = new Error('Ese Email ya esta registrado')
    return res.status(409).json({error: error.message})
  }

  const handle = slug(req.body.handle, '')
  const handleExists = await User.findOne({handle})
  if(handleExists) {
    const error = new Error('Nombre de Usuario no disponible')
    return res.status(409).json({error: error.message})
  }

  // await User.create(req.body)
  const user = new User(req.body)
  user.password = await hashPassword(password)
  await user.save()

  res.status(201).send('Registro Creado Correctamente')
}

export const login = async(req: Request, res: Response) => {
  const { email, password } = req.body

  // Revisar si el usuario esta registrado
  const user = await User.findOne({email})
  if(!user) {
    const error = new Error('El Usuario no existe')
    return res.status(404).json({error: error.message})
  }

  // comprobar el password
  const isPasswordCorrect = await checkPassword(password, user.password)
  if(!isPasswordCorrect) {
    const error = new Error('Password Incorrecto')
    return res.status(401).json({error: error.message})
  }

  res.send('Autenticado...')
}