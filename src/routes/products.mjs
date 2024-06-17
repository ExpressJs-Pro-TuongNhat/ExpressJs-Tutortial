import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
    response.send([
        {
            id: 1,
            name: "Product 1",
            price: 100,
        },
        {
            id: 2,
            name: "Product 2",
            price: 200,
        },
        {
            id: 3,
            name: "Product 3",
            price: 30,
        }
    ])
});

export default router;