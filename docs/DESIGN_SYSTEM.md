# Design System

## Design Target

- Kích thước thiết kế chuẩn: `1280 x 800`.
- Tỉ lệ: `16:10`.
- Thiết bị mục tiêu: màn hình cảm ứng kiosk TOSEI khoảng 10 inch.
- Implementation hiện tại scale toàn bộ app qua `KioskViewport` và CSS variable `--app-scale`.

## Token Source

- Tách riêng từ từng file css cho từng component riêng để tránh lỗi về sau.

## Layout

- `--app-design-width`: `1280px`
- `--app-design-height`: `800px`
- `.kiosk-viewport`: full viewport, căn giữa app.
- `.kiosk-viewport__scaler`: fixed `1280 x 800`, scale theo cạnh nhỏ hơn.
- `.app-shell`: container chính, chiều dọc gồm progress/header/content/footer.
- Content mode hiện có:
    - `machine`: grid máy + pager bên phải.
    - `course`: chọn course hoặc plan.
    - `payment`: thanh toán.
    - `complete`: hoàn tất/thất bại.
    - `settings`: settings/admin.

## Font

- Font base: `Arial, Helvetica, sans-serif`.
- Root size: `20px`.
- Font weight:
    - Normal: `500`
    - Bold: `700`
    - Heavy: `800`
- Chữ Nhật trên nút, thẻ máy, course, plan và thông báo phải đủ lớn để đọc nhanh trên kiosk.
- Không dùng `vw` để scale font. Dùng token rem cố định.
- Không dùng letter-spacing âm.

## Font Scale

Các token chính:

- `--font-size-sm`: `0.75rem`
- `--font-size-base`: `1rem`
- `--font-size-xl`: `1.125rem`
- `--font-size-2xl`: `1.25rem`
- `--font-size-5xl`: `1.5rem`
- `--font-size-8xl`: `2rem`
- `--font-size-10xl`: `2.5rem`
- `--font-size-12xl`: `3rem`
- `--font-size-modal-number`: `5rem`

Quy ước dùng:

- Header/progress: dùng size vừa, rõ, không chiếm quá nhiều chiều cao.
- Số máy và số PIN: dùng size lớn.
- Card course/plan: ưu tiên dễ đọc, text không cắt dòng bất thường.
- Table admin: font nhỏ hơn màn hình user nhưng vẫn đủ chạm và đọc.

## Colors

Màu nền và surface:

- Page: `--color-page` `#efefef`
- Surface: `--color-surface` `#ffffff`
- Surface muted: `--color-surface-muted` `#f7f9fa`
- Control muted: `--color-control-muted` `#e6eaed`

Màu nội dung:

- Text: `--color-text` `#333333`
- Strong text: `--color-text-strong` `#111111`
- Muted text: `--color-text-muted` `#6f6f6f`
- Heading: `--color-heading` `#34454f`

Màu hành động/trạng thái:

- Primary: `--color-primary` `#0f8dde`
- Primary soft: `--color-primary-soft` `#3daeeb`
- Wash: `--color-wash` `#039dfd`
- Dry strong: `--color-dry-strong` `#ff9100`
- Danger: `--color-danger` `#d84b4b`
- Broken/error panel: `--color-panel-red` `#fff2f2`
- Busy/extension panel: `--color-panel-orange` `#fff9f1`

## Machine Card Colors

Machine card phải dùng các token theo type/status:

- Type: `wash-only`, `dry-only`, `wash-dry`.
- Status: `available`, `busy`, `broken`.
- Token pattern: `--machine-{type}-{status}-{part}`.

Ví dụ:

- `--machine-wash-dry-available-bg`
- `--machine-dry-busy-border`
- `--machine-wash-error-status`

Không hard-code màu trạng thái trong component nếu token đã tồn tại.

## Spacing

Spacing scale chính:

- `--space-xs`: `0.3125rem`
- `--space-md`: `0.5rem`
- `--space-xl`: `0.75rem`
- `--space-3xl`: `1rem`
- `--space-7xl`: `1.5rem`
- `--space-10xl`: `2rem`

Quy ước:

- Nút cảm ứng cần khoảng cách đủ rộng, tránh sát nhau.
- Footer/action button phải dễ nhấn bằng tay.
- Table admin được phép dense hơn màn hình user nhưng không quá nhỏ.
- Không đặt card lồng trong card nếu không phải modal/repeated item thật sự.

## Radius And Border

- `--radius-card`: `0.25rem`
- `--radius-pill`: dùng cho pill thật sự, không dùng đại trà.
- Button mặc định hiện tại `border-radius: 0`.
- Card phải giữ radius nhỏ, phù hợp UI kiosk công nghiệp.

## Touch Targets

- Button chính nên cao tối thiểu gần `--size-button-height` hoặc lớn hơn.
- Machine card, course card, plan card là vùng bấm chính, không thêm button nhỏ bên trong.
- Long press:
    - Machine busy: giữ khoảng `2000ms` để mở flow dừng.
    - Progress step 1 trên màn hình máy: giữ khoảng `3000ms` để vào settings PIN.

## Visual QA Checklist

Kiểm tra ở `1280 x 800`:

- Không có text bị cắt ở button/card/table.
- Không có text hoặc UI đè lên nhau.
- Footer không che content.
- Modal nằm giữa, số máy rõ.
- Machine grid đủ 3 cột x 3 dòng, pager không lệch.
- Màu trạng thái máy phân biệt rõ: available, busy/extend, broken.
