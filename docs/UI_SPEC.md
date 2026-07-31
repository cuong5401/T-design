# TOSEI UI Spec Overview

File này là điểm vào khi sửa giao diện. Chi tiết được tách theo từng nhóm tài liệu:

- `docs/DESIGN_SYSTEM.md`: màu sắc, font, kích thước, spacing, tỉ lệ 16:10.
- `docs/COMPONENT_SPEC.md`: component dùng chung, props, trạng thái, tương tác.
- `docs/SCREEN_SPEC.md`: dữ liệu, thành phần và thao tác của từng màn hình.
- `docs/SCREEN_FLOW.md`: quan hệ chuyển đổi giữa các màn hình.

## Product Scope

- SPA React + Vite mô phỏng kiosk TOSEI cho máy giặt, máy sấy.
- Màn hình mục tiêu: 10 inch, `1280 x 800`, tỉ lệ `16:10`.
- Không backend, không thiết bị thật, không giao dịch thật.
- Dữ liệu máy, course, plan, doanh thu, trạng thái thiết bị và settings đều là mock trong source.

## Current Source Map

- App root: `src/App.jsx`
- State gốc: `src/state/initialState.js`
- Reducer/flow action: `src/state/appReducer.js`
- Design tokens: `src/styles/tokens.css`
- Layout chung: `src/components/layout`
- Màn hình user: `src/screens`
- Màn hình settings/admin: `src/admin/screens`
- Mock data settings/admin: `src/admin/mocks/adminMockData.js`
- Mock services: `src/services` và `src/admin/services`

## Non-Negotiable Rules

- Không thêm nút, trường nhập liệu, màn hình hoặc mode nếu chưa có trong spec/source hoặc yêu cầu rõ từ người dùng.
- Không thay đổi dữ liệu mock thành dữ liệu thật.
- Không kết nối phần cứng, không tạo backend.
- CSV chỉ là mô phỏng UI, không download file thật, trừ khi rule này được đổi rõ.
- Nếu thông tin thiếu hoặc mâu thuẫn, đánh dấu `TODO:` trong docs hoặc hỏi người dùng.

## Current Known TODO

- Xác nhận menu settings: brief cũ ghi `カード清掃暗証番号`, nhưng code hiện đang tách thành `カード清掃` và `暗証番号変更`.
- Xác nhận có cần giữ `docs/UI_SPEC.md` như file tổng quan lâu dài hay thay bằng bộ spec tách nhỏ.
