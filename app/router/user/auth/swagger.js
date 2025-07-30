/**
 * @swagger
 * tags:
 *   name: User-Authentication
 *   description: User authentication management
 */

/**
 * @swagger
 * /user/get-otp:
 *   post:
 *     summary: Get OTP code for user authentication
 *     tags: [User-Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *          application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: User's mobile number
 *                 example: "09123456789"
 *     responses:
 *       200:
 *         description: OTP code sent successfully
 *         content:
 *            application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "کد اعتبار سنجی با موفقیت برای شما ارسال شد"
 *                     code:
 *                       type: integer
 *                       example: 12345
 *                     mobile:
 *                       type: string
 *                       example: "09123456789"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Previous OTP still valid
 */

/**
 * @swagger
 * /user/check-otp:
 *   post:
 *     summary: Verify OTP code and login user
 *     tags: [User-Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - code
 *             properties:
 *               mobile:
 *                 type: string
 *                 description: User's mobile number
 *                 example: "09123456789"
 *               code:
 *                 type: integer
 *                 description: OTP code received by user
 *                 example: 12345
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *            application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *                 refreshToken:
 *                   type: string
 *                   description: JWT refresh token
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     mobile:
 *                       type: string
 *                     Role:
 *                       type: string
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid OTP or expired
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /user/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [User-Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Valid refresh token
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *            application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: New JWT access token
 *                 refreshToken:
 *                   type: string
 *                   description: New JWT refresh token
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     mobile:
 *                       type: string
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid refresh token
 */