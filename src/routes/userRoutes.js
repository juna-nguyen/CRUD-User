import express from "express";
import {
  create,
  getAll,
  getDetail,
  update,
  remove,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Creates a user document in MongoDB using the User model. The source code returns HTTP 201 on success and HTTP 500 when Mongoose validation or database errors occur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateRequest'
 *           examples:
 *             createUser:
 *               summary: Create user example
 *               value:
 *                 name: John Doe
 *                 email: john.doe@example.com
 *                 age: 30
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserSuccessResponse'
 *             examples:
 *               created:
 *                 value:
 *                   message: Thành công
 *                   data:
 *                     _id: 66a6b3fafe525689fe215111f
 *                     name: John Doe
 *                     email: john.doe@example.com
 *                     age: 30
 *                     createdAt: '2026-08-02T08:30:00.000Z'
 *                     updatedAt: '2026-08-02T08:30:00.000Z'
 *                     __v: 0
 *       '500':
 *         description: Validation or database error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               validationError:
 *                 value:
 *                   error: 'User validation failed: email: Path `email` is required.'
 */
router.post("/", create);

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Returns every user document from MongoDB. The current controller does not apply filtering, pagination, or query parameter handling.
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             examples:
 *               users:
 *                 value:
 *                   - _id: 66a6b3fafe525689fe215111f
 *                     name: John Doe
 *                     email: john.doe@example.com
 *                     age: 30
 *                     createdAt: '2026-08-02T08:30:00.000Z'
 *                     updatedAt: '2026-08-02T08:30:00.000Z'
 *                     __v: 0
 *                   - _id: 66a6b3fafe525689fe2151120
 *                     name: Jane Doe
 *                     email: jane.doe@example.com
 *                     age: 25
 *                     createdAt: '2026-08-02T08:31:00.000Z'
 *                     updatedAt: '2026-08-02T08:31:00.000Z'
 *                     __v: 0
 *       '500':
 *         description: Database error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getAll);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by ID
 *     description: Finds a single user by MongoDB ObjectId. Returns 404 when the document is not found. Invalid IDs or database failures surface as server errors through the default Express error handling path.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the user
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         example: 66a6b3fafe525689fe215111f
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               user:
 *                 value:
 *                   _id: 66a6b3fafe525689fe215111f
 *                   name: John Doe
 *                   email: john.doe@example.com
 *                   age: 30
 *                   createdAt: '2026-08-02T08:30:00.000Z'
 *                   updatedAt: '2026-08-02T08:30:00.000Z'
 *                   __v: 0
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponse'
 *       '500':
 *         description: Invalid ID or database error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", getDetail);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user by ID
 *     description: Updates the user document with the provided fields. The current service calls findByIdAndUpdate without runValidators, so the update behaves as a partial update and does not currently enforce model validation on every field.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the user
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         example: 66a6b3fafe525689fe215111f
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateRequest'
 *           examples:
 *             updateUser:
 *               summary: Update user example
 *               value:
 *                 name: Jane Doe
 *                 email: jane.doe@example.com
 *                 age: 25
 *     responses:
 *       '200':
 *         description: Updated user document. If the ID does not exist, the current implementation may return null.
 *         content:
 *           application/json:
 *             schema:
 *               nullable: true
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               updated:
 *                 value:
 *                   _id: 66a6b3fafe525689fe215111f
 *                   name: Jane Doe
 *                   email: jane.doe@example.com
 *                   age: 25
 *                   createdAt: '2026-08-02T08:30:00.000Z'
 *                   updatedAt: '2026-08-02T08:35:00.000Z'
 *                   __v: 0
 *       '500':
 *         description: Invalid ID or database error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:id", update);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by ID
 *     description: Deletes a user document by MongoDB ObjectId. The current controller always responds with HTTP 200 and the message "Đã xóa", even if the target document is not found.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the user
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         example: 66a6b3fafe525689fe215111f
 *     responses:
 *       '200':
 *         description: Delete request completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUserSuccessResponse'
 *             examples:
 *               deleted:
 *                 value:
 *                   message: Đã xóa
 *       '500':
 *         description: Invalid ID or database error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", remove);

export default router;
