import { Router } from "express";
import { body } from 'express-validator';
import { createAccount, login } from "./handlers";
import { handleInputErrors } from "./middleware/validation";

const router = Router()

// Autenticación y Registro
router.post('/auth/register', 
  body('handle')
    .notEmpty()
    .withMessage('El Handle no puede ir vacio'),
  body('name')
    .notEmpty()
    .withMessage('El Nombre no puede ir vacio'),
    body('email')
    .isEmail()
    .withMessage('Email no válido'),
    body('password')
      .isLength({min: 8})
      .withMessage('El Password debe tener minimo 8 caracteres'),
  // Manejar los errores de express-validator
  handleInputErrors,
  createAccount
)

router.post('/auth/login',
  body('email')
    .isEmail()
    .withMessage('Email no válido'),
  body('password')
    .notEmpty()
    .withMessage('El Password es obligatorio'),
  handleInputErrors,
  login
)

export default router