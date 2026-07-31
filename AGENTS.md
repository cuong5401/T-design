# TOSEI UI Project Rules

## Purpose

- Project này là giao diện SPA mô phỏng màn hình cảm ứng TOSEI dùng cho hệ thống máy giặt, máy sấy.
- Frontend dùng React + Vite. Không tạo backend, không kết nối thiết bị thật, không gọi API ngoài.
- UI hiện tại chỉ chạy trên browser để kiểm tra giao diện và luồng thao tác.
- Toàn bộ hành vi thiết bị, thẻ, thanh toán, trạng thái máy và dữ liệu cài đặt đều là mock.

## Mandatory Reading Order

Trước khi sửa code, Codex bắt buộc đọc các file sau:

1. `AGENTS.md`
2. `docs/UI_SPEC.md`
3. `docs/DESIGN_SYSTEM.md`
4. `docs/COMPONENT_SPEC.md`
5. `docs/SCREEN_SPEC.md`
6. `docs/SCREEN_FLOW.md`

Nếu tài liệu và code đang mâu thuẫn, không tự đoán. Hãy ghi rõ TODO hoặc hỏi người dùng trước khi thay đổi behavior.

## Scope Rules

- Chỉ sử dụng dữ liệu, màn hình, nút, trường nhập liệu và chức năng đã có trong spec hoặc source hiện tại.
- Không tự thêm màn hình, mode, menu item, form field, nút thao tác, dữ liệu mock hoặc luồng mới nếu người dùng chưa yêu cầu rõ.
- Không đổi business rule để UI “hợp lý hơn” nếu spec chưa yêu cầu.
- Không thay đổi tất cả màn hình cùng lúc. Khi chưa chắc style, hoàn thiện một màn hình mẫu trước để xác nhận hướng thiết kế.
- Giữ nguyên chức năng hiện có nếu tài liệu không yêu cầu thay đổi.

## Hardware And Backend Limits

- Không kết nối máy giặt, máy sấy, card reader, controller, PLC, serial port hoặc thiết bị bên ngoài.
- Không tạo backend, database, local server API hoặc worker xử lý thiết bị.
- Thanh toán chỉ mô phỏng trên giao diện. Không xử lý giao dịch thật.
- Xuất CSV chỉ được mô phỏng bằng nút và thông báo trên UI. Không tải file thật về máy, không ghi file local, trừ khi người dùng đổi rule này rõ ràng.

## Display Requirements

- Thiết kế cho màn hình cảm ứng 10 inch, tỉ lệ 16:10.
- Kích thước thiết kế chuẩn là `1280 x 800`.
- UI phải scale trong viewport nhưng không làm lệch tỉ lệ 16:10.
- Chữ tiếng Nhật phải lớn, rõ, dễ đọc trên kiosk.
- Nút phải đủ lớn cho thao tác bằng tay, đồng thời vẫn click được bằng chuột để mô phỏng cảm ứng.
- Long press trên cảm ứng phải mô phỏng được bằng mouse press giữ.
- Double tap nếu được yêu cầu trong spec phải mô phỏng được bằng double click.
- Sau mỗi thay đổi UI, kiểm tra ở kích thước `1280 x 800`.

## Settings Menu

- Các mục hiện đang có trong source chưa phải là các mục chắn chắn cần thiết,nên phải được đối chiếu với `docs/SCREEN_SPEC.md`.

## Implementation Rules

- Ưu tiên dùng component, và css riêng cho từng component, hạn chế việc dùng chung để trái bị vở giao diện khi sửa lại css.
- kích thước font có thể thu phóng theo tỷ lệ 16:10. Luôn Luôn giữ đúng tỷ lệ dù bất kì phóng to hay thu nhỏ của từng chi tiết hay tổng thể.
- Không để text tràn, đè lên nhau, hoặc bị cắt trong button/card/table ở `1280 x 800`.
- Không dùng dữ liệu thật, ngày giờ thì sẽ dùng lệnh lất Date của js.
- Nếu thiếu thông tin, thêm `TODO:` trong tài liệu hoặc hỏi người dùng, không tự suy luận.

## Verification

- Với thay đổi tài liệu: đọc lại file để kiểm tra nội dung và encoding.
- Với thay đổi code: chạy `npm run build` nếu có thể.
- Với thay đổi UI: kiểm tra trực quan ở `1280 x 800`; nếu có dev server/browser tool thì chụp hoặc quan sát màn hình.
- Nếu không chạy được bước kiểm tra nào, phải nói rõ lý do trong câu trả lời cuối.
- Nêu có bug hoặc lỗi hiển thị, người dùng sẽ chỉ ra mà hình và lỗi cần fix. Hãy tự đến, chụp lại màn hình, phân tích rồi đưa ra hướng giải quyết cho người dùng, khi nhận được sự đồng ý mới thay đổi code.
