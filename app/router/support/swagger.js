/**
 * @swagger
 * tags:
 *   - name: Support
 *     description: Support operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Namespace:
 *       type: object
 *       required:
 *         - title
 *         - endpoint
 *       properties:
 *         title:
 *           type: string
 *           description: The title of namespace
 *         endpoint:
 *           type: string
 *           description: The endpoint of namespace
 *     Room:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - namespace
 *       properties:
 *         name:
 *           type: string
 *           description: The name of room
 *         description:
 *           type: string
 *           description: The description of room
 *         image:
 *           type: string
 *           format: binary
 *           description: The image of room
 *         namespace:
 *           type: string
 *           description: The namespace of room
 */

/**
 * @swagger
 * /support/Namespace/add:
 *   post:
 *     tags:
 *       - Support
 *     summary: Add namespace for chatroom
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Namespace'
 *     responses:
 *       201:
 *         description: Success
 */






/**
 * @swagger
 * /support/Room/add:
 *   post:
 *     tags:
 *       - Support
 *     summary: Add room to namespace
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         description: Invalid input
 */