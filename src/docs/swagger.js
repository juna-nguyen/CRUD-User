import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "CRUD User API",
    version: "1.0.0",
    description:
      "OpenAPI 3.0 documentation generated from the current Express/Mongoose source code.",
  },
  servers: [
    {
      url: "/",
      description: "Same origin as the Swagger UI",
    },
  ],
  tags: [
    {
      name: "Users",
      description: "User CRUD endpoints",
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "66a6b3fafe525689fe215111f",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            format: "email",
            example: "john.doe@example.com",
          },
          age: {
            type: "number",
            example: 30,
            default: 18,
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-02T08:30:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-02T08:35:00.000Z",
          },
          __v: {
            type: "number",
            example: 0,
          },
        },
        required: ["_id", "name", "email"],
      },
      UserCreateRequest: {
        type: "object",
        required: ["name", "email"],
        properties: {
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            format: "email",
            example: "john.doe@example.com",
          },
          age: {
            type: "number",
            example: 30,
            default: 18,
          },
        },
      },
      UserUpdateRequest: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Jane Doe",
          },
          email: {
            type: "string",
            format: "email",
            example: "jane.doe@example.com",
          },
          age: {
            type: "number",
            example: 25,
          },
        },
      },
      CreateUserSuccessResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Thành công",
          },
          data: {
            $ref: "#/components/schemas/User",
          },
        },
      },
      DeleteUserSuccessResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Đã xóa",
          },
        },
      },
      NotFoundResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Không tìm thấy",
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "User validation failed: email: Path `email` is required.",
          },
        },
      },
    },
  },
};

const swaggerSpec = swaggerJsdoc({
  definition: swaggerDefinition,
  apis: ["./src/routes/*.js"],
});

export default swaggerSpec;
