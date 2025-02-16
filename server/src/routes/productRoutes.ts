import {Router} from "express";
import { createProduct, getProducts } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);

//router.get("/metrics", getDashboardMetrics)//http://localhost:8000/dashboard/metrics

export default router;