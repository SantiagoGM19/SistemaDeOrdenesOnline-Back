import { Router } from "express";
import authRouter from "./auth.router";
import Middleware from "../middleware/Middleware";
import productRouter from "./product.router";
import orderRouter from "./order.router";

const router =  Router();

router.get('/', (req, res) => {
    res.send('Sistema de ordenes en linea!')
  });

const middleware =  new Middleware()

router.use('/auth',authRouter)
router.use(middleware.realizarVerificaciones);
router.use('/products',productRouter);
router.use('/orders',orderRouter);

export default router;