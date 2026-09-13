# CRUD User API Contract

Tài liệu này mô tả toàn bộ route hiện có trong project, kèm payload request và response thực tế để FE tích hợp API.

## Tổng quan

- Base path của API: `/api/users`
- Kiểu dữ liệu: JSON
- Content-Type cho request body: `application/json`
- Database model: `User`
- Schema chính:
  - `name`: `string`, bắt buộc
  - `email`: `string`, bắt buộc, unique
  - `age`: `number`, không bắt buộc, mặc định `18`

## Data Model

### User

```json
{
  "_id": "66a6b3fafe525689fe215111f",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 30,
  "createdAt": "2026-08-02T08:30:00.000Z",
  "updatedAt": "2026-08-02T08:35:00.000Z",
  "__v": 0
}
```

## API Routes

### 1. Tạo user

- **Method:** `POST`
- **Path:** `/api/users`

#### Request body

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 30
}
```

#### Field rules

- `name`:
  - bắt buộc
  - kiểu `string`
- `email`:
  - bắt buộc
  - kiểu `string`
  - phải là email hợp lệ
  - unique trong database
- `age`:
  - không bắt buộc
  - kiểu `number`
  - mặc định `18` nếu không gửi

#### Response success

- **Status:** `201 Created`

```json
{
  "message": "Thành công",
  "data": {
    "_id": "66a6b3fafe525689fe215111f",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "createdAt": "2026-08-02T08:30:00.000Z",
    "updatedAt": "2026-08-02T08:30:00.000Z",
    "__v": 0
  }
}
```

#### Response error

- **Status:** `500 Internal Server Error`

```json
{
  "error": "User validation failed: email: Path `email` is required."
}
```

---

### 2. Lấy danh sách user

- **Method:** `GET`
- **Path:** `/api/users`

#### Query params

- Hiện tại code chưa xử lý filter, pagination hoặc query params.
- Ví dụ query như `?name=John&age=30` sẽ không được dùng trong service hiện tại.

#### Response success

- **Status:** `200 OK`

```json
[
  {
    "_id": "66a6b3fafe525689fe215111f",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "createdAt": "2026-08-02T08:30:00.000Z",
    "updatedAt": "2026-08-02T08:30:00.000Z",
    "__v": 0
  },
  {
    "_id": "66a6b3fafe525689fe2151120",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "age": 25,
    "createdAt": "2026-08-02T08:31:00.000Z",
    "updatedAt": "2026-08-02T08:31:00.000Z",
    "__v": 0
  }
]
```

#### Response error

- Code hiện tại không bọc `try/catch` cho endpoint này.
- Nếu database lỗi, hành vi thực tế sẽ phụ thuộc vào Express runtime / error handling của app.

---

### 3. Lấy chi tiết user theo id

- **Method:** `GET`
- **Path:** `/api/users/:id`

#### Path params

- `id`:
  - MongoDB ObjectId
  - ví dụ: `66a6b3fafe525689fe215111f`

#### Response success

- **Status:** `200 OK`

```json
{
  "_id": "66a6b3fafe525689fe215111f",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 30,
  "createdAt": "2026-08-02T08:30:00.000Z",
  "updatedAt": "2026-08-02T08:30:00.000Z",
  "__v": 0
}
```

#### Response not found

- **Status:** `404 Not Found`

```json
{
  "message": "Không tìm thấy"
}
```

#### Response error

- Code hiện tại không bọc `try/catch` cho endpoint này.
- Nếu `id` không hợp lệ hoặc database lỗi, FE nên chuẩn bị xử lý lỗi phía client theo response thực tế từ server.

---

### 4. Cập nhật user theo id

- **Method:** `PUT`
- **Path:** `/api/users/:id`

#### Path params

- `id`: MongoDB ObjectId

#### Request body

Body được update theo kiểu partial update, nghĩa là gửi field nào thì update field đó.

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "age": 25
}
```

#### Field rules

- `name`, `email`, `age` đều là optional trong request update
- Service hiện tại gọi `findByIdAndUpdate` với `{ new: true }`
- `runValidators` chưa được bật, nên update không ép validation đầy đủ như lúc create

#### Response success

- **Status:** `200 OK`

```json
{
  "_id": "66a6b3fafe525689fe215111f",
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "age": 25,
  "createdAt": "2026-08-02T08:30:00.000Z",
  "updatedAt": "2026-08-02T08:35:00.000Z",
  "__v": 0
}
```

#### Trường hợp không tìm thấy

- Current implementation có thể trả về `200 OK` với body `null` nếu id không tồn tại.

```json
null
```

#### Response error

- **Status:** `500 Internal Server Error`
- Có thể xảy ra nếu id không hợp lệ hoặc database lỗi.

---

### 5. Xóa user theo id

- **Method:** `DELETE`
- **Path:** `/api/users/:id`

#### Path params

- `id`: MongoDB ObjectId

#### Response success

- **Status:** `200 OK`

```json
{
  "message": "Đã xóa"
}
```

#### Lưu ý hành vi thực tế

- Controller hiện tại luôn trả `200` với message `"Đã xóa"` sau khi gọi delete service.
- Nếu document không tồn tại, response vẫn có thể là `200` theo code hiện tại.

#### Response error

- **Status:** `500 Internal Server Error`
- Có thể xảy ra nếu id không hợp lệ hoặc database lỗi.

---

## Utility Routes

Các route này chủ yếu phục vụ tài liệu và kiểm tra API, không phải endpoint CRUD chính cho FE.

### Swagger UI

- **Method:** `GET`
- **Path:** `/swagger`

### Swagger JSON

- **Method:** `GET`
- **Path:** `/swagger.json`

## Ghi chú cho FE

- API hiện không có authentication / authorization.
- `GET /api/users` trả về toàn bộ danh sách, chưa có pagination.
- `GET /api/users/:id` trả về `404` khi không tìm thấy.
- `PUT /api/users/:id` là update kiểu partial.
- `DELETE /api/users/:id` không xác nhận document có tồn tại hay không trong response.
- Chuỗi tiếng Việt trong code source có vẻ đang bị encode sai trong một số file, nhưng tài liệu này dùng Unicode chuẩn để FE đọc dễ hơn.

## Base URL mẫu

Nếu chạy local với port mặc định:

```txt
http://localhost:3001
```

Ví dụ đầy đủ:

- `POST http://localhost:3001/api/users`
- `GET http://localhost:3001/api/users`
- `GET http://localhost:3001/api/users/:id`
- `PUT http://localhost:3001/api/users/:id`
- `DELETE http://localhost:3001/api/users/:id`

