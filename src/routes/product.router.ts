import { Router } from "express";
import ProductController from "../controllers/ProductController";
import ProductService from "../services/impls/ProductService";
import MongoConnection from "../services/impls/mongoService";


const productRouter = Router();

const repository =  new MongoConnection();
const productService =  new ProductService(repository);
const productController = new ProductController(productService);

productRouter.get("/", productController.getProducts.bind(productController));

export default productRouter;