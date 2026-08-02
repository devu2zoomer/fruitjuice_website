const express = require("express");
const { listProducts, getProduct } = require("../controllers/productController");

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List active products (storefront)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of active products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get("/", listProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single active product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/:id", getProduct);

module.exports = router;
