import { Router } from "express";

const router = Router()

// Autenticación y Registro
router.post('/auth/register', (req, res) => {

})

router.get('/', (req, res) => {
  res.send('Hello World! desde Express / TypeScript')
})

export default router