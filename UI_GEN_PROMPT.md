# Prompt: Gen giao diện thiết kế cho dự án CRUD User

Bạn có thể copy toàn bộ nội dung trong khung bên dưới và đưa cho AI thiết kế giao diện.

```text
Bạn là một Senior Product Designer và UI/UX Designer chuyên thiết kế giao diện web hiện đại, rõ ràng, dễ dùng, tối ưu cho CRUD dashboard.

Hãy thiết kế giao diện cho một dự án quản lý User dựa trên REST API có sẵn. Mục tiêu là tạo ra một UI đẹp, chuyên nghiệp, trực quan để FE có thể kết nối ngay với API hiện có.

## Bối cảnh dự án

- Đây là project CRUD User, backend đã có sẵn.
- API base path: `/api/users`
- Dữ liệu chính là `User`
- Các trường chính:
  - `name` (string, bắt buộc)
  - `email` (string, bắt buộc, unique)
  - `age` (number, không bắt buộc, default = 18)
- API hiện có:
  - `POST /api/users` tạo user
  - `GET /api/users` lấy danh sách user
  - `GET /api/users/:id` xem chi tiết user
  - `PUT /api/users/:id` cập nhật user
  - `DELETE /api/users/:id` xóa user

## Mục tiêu giao diện

Hãy tạo một dashboard quản lý user theo phong cách:

- hiện đại
- chuyên nghiệp
- tối giản nhưng có điểm nhấn
- dễ đọc dữ liệu
- thao tác CRUD nhanh
- responsive tốt trên desktop, tablet, mobile

## Yêu cầu thiết kế

### 1. Tổng thể

- Thiết kế dạng admin dashboard / management system.
- Có sidebar hoặc top navigation rõ ràng.
- Có khu vực header chứa tiêu đề trang, mô tả ngắn và nút hành động chính.
- Tạo cảm giác sạch sẽ, có hệ thống, nhiều khoảng trắng hợp lý.
- Tránh giao diện quá đơn điệu, nhưng cũng không quá màu mè.

### 2. Các màn hình cần có

Thiết kế tối thiểu các màn hình sau:

#### a. Danh sách User

- Bảng hiển thị tất cả user.
- Có các cột:
  - ID
  - Name
  - Email
  - Age
  - Created At
  - Actions
- Có nút:
  - Add User
  - Edit
  - Delete
  - View Detail
- Có empty state khi chưa có dữ liệu.
- Có loading state.
- Có error state.
- Có search input và filter UI nếu cần, nhưng phải thể hiện rõ nếu backend chưa hỗ trợ filter thì UI chỉ là chuẩn bị cho tương lai hoặc filter client-side.

#### b. Form tạo / sửa User

- Dùng modal, drawer hoặc riêng một page đều được, nhưng phải rõ ràng và dễ thao tác.
- Trường nhập:
  - Name
  - Email
  - Age
- Validate inline:
  - Name không được rỗng
  - Email phải đúng định dạng
  - Age là số dương
- Có nút Save / Cancel.
- Có trạng thái loading khi submit.
- Có thông báo success / error.

#### c. Chi tiết User

- Hiển thị thông tin user dưới dạng card hoặc details panel.
- Làm nổi bật các thông tin chính: name, email, age, createdAt, updatedAt, id.
- Có nút Edit và Delete.

#### d. Xác nhận xóa

- Có modal confirmation trước khi xóa.
- Nội dung rõ ràng, tránh nhầm lẫn.

## Luồng người dùng

- Người dùng mở dashboard và thấy danh sách user.
- Người dùng có thể thêm user mới bằng nút Add User.
- Người dùng có thể xem chi tiết từng user.
- Người dùng có thể sửa nhanh thông tin user.
- Người dùng có thể xóa user sau khi confirm.
- Sau mỗi thao tác CRUD cần có feedback rõ ràng.

## Mapping với API

Thiết kế UI phải bám với response thực tế của API:

- `GET /api/users`
  - trả về mảng user
- `GET /api/users/:id`
  - trả về một user hoặc `404`
- `POST /api/users`
  - trả về object `{ message, data }`
- `PUT /api/users/:id`
  - trả về user sau update, hoặc có thể `null` nếu không tìm thấy theo implementation hiện tại
- `DELETE /api/users/:id`
  - trả về `{ message: "Đã xóa" }`

## UI states bắt buộc

Thiết kế phải thể hiện rõ:

- Loading state
- Empty state
- Error state
- Success toast / alert
- Confirmation modal
- Disabled state cho nút khi đang submit

## Visual direction

Hãy chọn một direction rõ ràng, ví dụ:

- tối giản, tinh gọn, professional
- hiện đại, clean, nhiều whitespace
- dùng màu trung tính làm nền, accent color rõ ràng cho CTA
- typography dễ đọc, hierarchy mạnh

Yêu cầu:

- Không dùng layout quá generic.
- Không tạo UI giống template admin phổ thông quá mức.
- Tránh giao diện nhàm chán.
- Cần có điểm nhấn thiết kế đủ tinh tế để nhìn “có chủ ý”.

## Component gợi ý

- Sidebar / Topbar
- Page header
- KPI summary cards
- User table
- Search input
- Filter dropdown
- Pagination nếu cần
- Add/Edit form
- Detail panel
- Confirmation modal
- Toast notification

## Responsive

Thiết kế phải hoạt động tốt trên:

- Desktop
- Tablet
- Mobile

Trên mobile:

- Bảng có thể chuyển sang card list.
- Form cần tối ưu cho chạm tay.
- Nút thao tác phải đủ lớn.

## Output mong muốn

Hãy trả về:

1. Mô tả concept giao diện
2. Bố cục tổng thể từng màn hình
3. Danh sách component chính
4. Màu sắc, typography, spacing, style direction
5. Gợi ý animation/micro-interaction nếu phù hợp
6. Nếu AI có khả năng tạo mockup, hãy tạo luôn mockup cho dashboard CRUD user này

## Ràng buộc

- Không tự ý thay đổi logic API.
- Không thêm authentication nếu không cần.
- Không giả định backend có pagination/filter phức tạp nếu code hiện tại chưa có.
- Ưu tiên thiết kế bám sát dữ liệu thực tế để FE triển khai dễ.

## Gợi ý bổ sung cho AI

Nếu cần, hãy thiết kế theo style:

- SaaS dashboard hiện đại
- internal admin tool cao cấp
- clean enterprise UI

Ưu tiên sự rõ ràng trong thao tác hơn là hiệu ứng quá phức tạp.
```

## Ghi chú

- Nếu bạn muốn, mình có thể viết tiếp một bản prompt khác theo hướng:
  - `Figma prompt`
  - `v0 / Lovable prompt`
  - `ChatGPT prompt`
  - `Prompt tiếng Anh` để AI thiết kế ra kết quả tốt hơn

