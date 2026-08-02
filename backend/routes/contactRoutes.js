const express = require("express");
const { submitContact } = require("../controllers/contactController");

const router = express.Router();

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit the public contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Message received
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contact:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", submitContact);

module.exports = router;
