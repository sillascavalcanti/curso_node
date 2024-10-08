import { Router } from "express";

const productRouter = Router();

const router = Router();

productRouter.use("/products", router);

router.get("/", function (req, res) {
    res.send("products");
});

router.get("/test", function (req, res) {
    res.send("testProduct");
});

export default productRouter;
