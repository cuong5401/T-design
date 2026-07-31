# Component Specification

## 1. Component Principles

- Component dùng chung phải nhận dữ liệu và callback qua props rõ ràng.
- Component không tự đọc state toàn ứng dụng nếu không thật sự cần thiết.
- Mọi tương tác làm thay đổi màn hình hoặc state phải đi qua `dispatch` của `src/state/appReducer.js`.
- Component UI không tự tạo dữ liệu ngoài đặc tả.
- Dữ liệu phải đến từ một trong các nguồn sau:
    - `src/data`
    - `src/admin/mocks`
    - Service mock hiện có

- Button không dùng để submit form phải có `type="button"`.
- Trạng thái vô hiệu hóa phải sử dụng thuộc tính `disabled`.
- Không được chỉ thay đổi style để giả lập trạng thái disabled.
- Không thêm reducer action mới nếu chưa cập nhật:
    - `SCREEN_FLOW.md`
    - `SCREEN_SPEC.md`

---

# 2. Layout Components

## Component Index

| ID         | Component        | File                                         |
| ---------- | ---------------- | -------------------------------------------- |
| CMP-LYT-01 | KioskViewport    | `src/components/layout/KioskViewport.jsx`    |
| CMP-LYT-02 | AppShell         | `src/components/layout/AppShell.jsx`         |
| CMP-LYT-03 | ProgressHeader   | `src/components/layout/ProgressHeader.jsx`   |
| CMP-LYT-04 | ScreenHeader     | `src/components/layout/ScreenHeader.jsx`     |
| CMP-LYT-05 | FooterNavigation | `src/components/layout/FooterNavigation.jsx` |

---

## CMP-LYT-01: KioskViewport

### File

`src/components/layout/KioskViewport.jsx`

### Mục đích

Tạo vùng hiển thị cố định cho toàn bộ ứng dụng kiosk.

### Props

- `children`
    - Nội dung ứng dụng được hiển thị bên trong viewport.

### Cấu trúc hiển thị

- Canvas có kích thước thiết kế cố định `1280 × 800`.
- Toàn bộ ứng dụng được đặt bên trong canvas này.

### Quy tắc

- Phải gọi `useViewportScale`.
- Phải tự động scale giao diện theo kích thước màn hình thực tế.
- Không thay đổi kích thước thiết kế gốc `1280 × 800`.
- Không chứa logic chuyển màn hình.
- Không tự đọc state của toàn ứng dụng.

---

## CMP-LYT-02: AppShell

### File

`src/components/layout/AppShell.jsx`

### Mục đích

Điều phối bố cục chung của các màn hình trong ứng dụng.

### Props dữ liệu

- `clockText`
    - Nội dung thời gian hiển thị trên header.

- `progressStep`
    - Bước hiện tại của quy trình sử dụng máy.

- `screen`
    - Màn hình hiện tại.

- `selectedMachine`
    - Thông tin máy đang được chọn.

- `contentMode`
    - Chế độ hiển thị của khu vực nội dung.

- `children`
    - Nội dung chính của màn hình.

### Props trạng thái

- `isExtension`
    - Xác định quy trình hiện tại có phải gia hạn hay không.

- `showFooter`
    - Xác định có hiển thị footer hay không.

- `showFooterCancel`
    - Xác định có hiển thị nút `中止` hay không.

- `footerDisabled`
    - Vô hiệu hóa các thao tác trong footer.

- `hideProgress`
    - Ẩn progress header.

### Props sự kiện

- `onBack`
    - Xử lý khi người dùng nhấn `戻る`.

- `onCancel`
    - Xử lý khi người dùng nhấn `中止`.

- `onStepOneLongPress`
    - Xử lý khi người dùng nhấn giữ step 1.

### Cấu trúc hiển thị

1. `ProgressHeader`
2. `ScreenHeader`
3. Khu vực nội dung
4. `FooterNavigation`

### Quy tắc

- Chỉ hiển thị `ProgressHeader` khi `hideProgress` không được bật.
- Chỉ hiển thị `FooterNavigation` khi `showFooter = true`.
- Truyền `showFooterCancel` xuống `FooterNavigation`.
- Truyền `footerDisabled` xuống `FooterNavigation`.
- Không tự quyết định chuyển màn hình.
- Các thao tác điều hướng phải được truyền vào bằng callback.

---

## CMP-LYT-03: ProgressHeader

### File

`src/components/layout/ProgressHeader.jsx`

### Mục đích

Hiển thị tiến trình sử dụng máy gồm bốn bước.

### Nội dung cố định

1. `機械選択`
2. `コース選択`
3. `支払い`
4. `運転開始`

### Props dữ liệu

- `currentStep`
    - Bước hiện tại.

- `clockText`
    - Thời gian hiện tại.

- `storeName`
    - Tên cửa hàng.

### Props sự kiện

- `onStepOneLongPress`
    - Sự kiện nhấn giữ step 1 để mở chức năng vào settings.

### Trạng thái hiển thị

- Bước đã hoàn thành.
- Bước hiện tại.
- Bước chưa thực hiện.

### Tương tác

- Step 1 chỉ xử lý long press khi có truyền `onStepOneLongPress`.
- Các step không tự thực hiện chuyển màn hình.

### Quy tắc

- Luôn hiển thị đúng bốn step theo thứ tự đã quy định.
- Không tự thêm hoặc đổi tên step.
- Không trực tiếp đọc state settings.
- Việc mở settings phải được xử lý thông qua callback và `dispatch`.

---

## CMP-LYT-04: ScreenHeader

### File

`src/components/layout/ScreenHeader.jsx`

### Mục đích

Hiển thị tiêu đề phù hợp với màn hình hiện tại.

### Props dữ liệu

- `screen`
    - Màn hình hiện tại.

- `selectedMachine`
    - Máy đang được chọn.

- `isExtension`
    - Xác định có đang trong quy trình gia hạn hay không.

### Trạng thái hiển thị

- Chọn title dựa trên `screen`.
- Hiển thị badge `機械番号` tại các màn hình:
    - Course
    - Plan
    - Payment
    - Complete

### Quy tắc

- Không tự tạo title ngoài danh sách màn hình đã định nghĩa.
- Badge máy chỉ dùng dữ liệu từ `selectedMachine`.
- Không chứa logic thay đổi màn hình.

---

## CMP-LYT-05: FooterNavigation

### File

`src/components/layout/FooterNavigation.jsx`

### Mục đích

Hiển thị các thao tác điều hướng ở cuối màn hình.

### Props trạng thái

- `disabled`
    - Vô hiệu hóa các nút trong footer.

- `showCancel`
    - Xác định có hiển thị nút `中止` hay không.

### Props sự kiện

- `onBack`
    - Xử lý khi nhấn `戻る`.

- `onCancel`
    - Xử lý khi nhấn `中止`.

### Nút hiển thị

- `中止`
- `戻る`

### Trạng thái đặc biệt

- Không hiển thị nút `中止` trong settings.
- Footer bị disabled tại màn hình complete.

### Quy tắc

- Các nút phải có `type="button"`.
- Khi `disabled = true`, phải truyền thuộc tính `disabled` thật vào button.
- Không tự chuyển màn hình.
- Chỉ gọi callback được truyền từ component cha.

---

# 3. Machine Components

## Component Index

| ID         | Component       | File                                       |
| ---------- | --------------- | ------------------------------------------ |
| CMP-MCH-01 | MachineGrid     | `src/components/machine/MachineGrid.jsx`   |
| CMP-MCH-02 | MachineCard     | `src/components/machine/MachineCard.jsx`   |
| CMP-MCH-03 | MachinePager    | `src/components/machine/MachinePager.jsx`  |
| CMP-MCH-04 | LaundryTypeIcon | `src/components/icons/LaundryTypeIcon.jsx` |

---

## CMP-MCH-01: MachineGrid

### File

`src/components/machine/MachineGrid.jsx`

### Mục đích

Hiển thị danh sách máy theo dạng lưới.

### Props dữ liệu

- `machines`
    - Danh sách máy cần hiển thị trên trang hiện tại.

### Props sự kiện

- `onSelectMachine`
    - Xử lý khi chọn một máy.

- `onStopMachine`
    - Xử lý khi nhấn giữ để dừng máy đang hoạt động.

### Cấu trúc hiển thị

- Hiển thị tối đa 9 máy trên một trang.
- Sử dụng `MachineCard` cho từng vị trí trong lưới.
- Thêm placeholder khi số lượng máy nhỏ hơn số ô cần thiết.

### Quy tắc

- Placeholder chỉ có nhiệm vụ giữ bố cục.
- Placeholder không được phép tương tác.
- Không tự tạo thêm dữ liệu máy.
- Dữ liệu hiển thị phải đến từ prop `machines`.

---

## CMP-MCH-02: MachineCard

### File

`src/components/machine/MachineCard.jsx`

### Mục đích

Hiển thị trạng thái và thông tin của một máy giặt hoặc máy sấy.

### Props dữ liệu

- `machine`
    - Thông tin máy cần hiển thị.

- `isPlaceholder`
    - Xác định card có phải ô giữ chỗ hay không.

### Props sự kiện

- `onSelect`
    - Xử lý khi người dùng chọn máy.

- `onLongPressStop`
    - Xử lý khi người dùng nhấn giữ máy đang hoạt động để yêu cầu dừng máy.

### Machine status

- `available`
- `busy`
- `broken`

### Machine type

- `wash-only`
- `dry-only`
- `wash-dry`

### Tương tác

- Chỉ cho phép click khi máy đang ở trạng thái có thể chọn.
- Máy `busy` hỗ trợ long press để yêu cầu dừng.
- Máy `broken` không được chọn.
- Placeholder không được click hoặc long press.

### Quy tắc

- Không tự thay đổi trạng thái máy.
- Việc chọn hoặc dừng máy phải được gửi lên component cha bằng callback.
- Trạng thái không thể chọn phải sử dụng `disabled` nếu được render bằng button.

---

## CMP-MCH-03: MachinePager

### File

`src/components/machine/MachinePager.jsx`

### Mục đích

Điều khiển phân trang của danh sách máy.

### Props dữ liệu

- `pagination`
    - Chứa thông tin trang hiện tại và tổng số trang.

### Props sự kiện

- `onPageChange`
    - Xử lý khi người dùng chuyển trang.

### Nội dung hiển thị

- Nút `↑`
- Nút `↓`
- Chỉ số `page/pageCount`

### Trạng thái

- Nút `↑` disabled khi không có trang trước.
- Nút `↓` disabled khi không có trang sau.

### Quy tắc

- Button phải có `type="button"`.
- Phải sử dụng thuộc tính `disabled` thật.
- Không tự thay đổi dữ liệu phân trang.
- Thay đổi trang phải được gửi qua `onPageChange`.

---

## CMP-MCH-04: LaundryTypeIcon

### File

`src/components/icons/LaundryTypeIcon.jsx`

### Mục đích

Hiển thị icon tương ứng với loại hoạt động của máy.

### Props dữ liệu

- `type`
    - Loại icon cần hiển thị.
    - Giá trị hỗ trợ:
        - `wash`
        - `dry`

- `className`
    - Class bổ sung từ component cha.

### Quy tắc

- Chỉ hiển thị icon cho `wash` hoặc `dry`.
- Không tự suy đoán loại máy.
- Không chứa logic tương tác hoặc điều hướng.

---

# 4. Course and Plan Components

## Component Index

| ID         | Component  | File                                   |
| ---------- | ---------- | -------------------------------------- |
| CMP-CRS-01 | CourseBand | `src/components/course/CourseCard.jsx` |
| CMP-CRS-02 | CourseCard | `src/components/course/CourseCard.jsx` |
| CMP-CRS-03 | PlanCard   | `src/components/course/PlanCard.jsx`   |

---

## CMP-CRS-01: CourseBand

### File

`src/components/course/CourseCard.jsx`

### Mục đích

Hiển thị band mô tả các phần của course.

### Props dữ liệu

- `parts`
    - Danh sách phần cần hiển thị trong band.

- `className`
    - Class bổ sung từ component cha.

### Nội dung hỗ trợ

- `洗濯`
- `乾燥`

### Vị trí sử dụng

- Course
- Plan
- Payment

### Quy tắc

- Chỉ hiển thị dữ liệu từ `parts`.
- Không tự thêm loại course.
- Không chứa logic chọn course.

---

## CMP-CRS-02: CourseCard

### File

`src/components/course/CourseCard.jsx`

### Mục đích

Hiển thị một course để người dùng lựa chọn.

### Props dữ liệu

- `course`
    - Dữ liệu course cần hiển thị.

### Props trạng thái

- `enabled`
    - Xác định course có thể được lựa chọn hay không.

- `highlighted`
    - Hiển thị trạng thái nổi bật.
    - Được sử dụng cho dry extension.

### Props sự kiện

- `onSelect`
    - Xử lý khi người dùng chọn course.

### Trạng thái

- Normal
- Highlighted
- Disabled

### Tương tác

- Khi `enabled = false`, course không được phép chọn.
- Trong extension mode, các course không phù hợp phải bị disabled.
- Khi chọn course hợp lệ, gọi `onSelect`.

### Quy tắc

- Trạng thái không thể chọn phải dùng thuộc tính `disabled`.
- Không tự thay đổi course được chọn.
- Không tự tạo dữ liệu course.
- Không chứa logic chuyển sang màn hình tiếp theo.

---

## CMP-CRS-03: PlanCard

### File

`src/components/course/PlanCard.jsx`

### Mục đích

Hiển thị một plan để người dùng lựa chọn.

### Props dữ liệu

- `plan`
    - Dữ liệu plan cần hiển thị.

### Props sự kiện

- `onSelect`
    - Xử lý khi người dùng chọn plan.

### Cấu trúc hiển thị

1. `nameLines`
2. Divider
3. `price`

### Tương tác

- Khi click vào plan, gọi `onSelect`.

### Quy tắc

- Chỉ hiển thị dữ liệu được cung cấp trong `plan`.
- Không tự tạo tên, giá hoặc nội dung plan.
- Không tự thay đổi màn hình.
- Button phải có `type="button"`.

---

# 5. Payment Components

## Component Index

| ID         | Component    | File                                      |
| ---------- | ------------ | ----------------------------------------- |
| CMP-PAY-01 | PaymentPanel | `src/components/payment/PaymentPanel.jsx` |

---

## CMP-PAY-01: PaymentPanel

### File

`src/components/payment/PaymentPanel.jsx`

### Mục đích

Hiển thị quá trình thanh toán bằng thẻ trả trước.

### Props dữ liệu

- `state`
    - Trạng thái hiện tại của quá trình thanh toán.

### Props sự kiện

- `onInsertCard`
    - Xử lý thao tác mô phỏng đưa thẻ vào.

- `onDecision`
    - Xử lý quyết định thanh toán của người dùng.

### Trạng thái trước khi đưa thẻ

- Hiển thị hướng dẫn đưa thẻ.
- Cho phép thực hiện thao tác mô phỏng insert card.

### Trạng thái sau khi đưa thẻ

- Hiển thị số dư thẻ mock.
- Hiển thị nút `支払う`.
- Hiển thị nút `支払わない`.

### Dữ liệu mock

- Số dư hiện tại sử dụng:
    - `PREPAID_CARD_BALANCE = 3000`

### Tương tác

- `onInsertCard`
    - Dispatch action `INSERT_CARD`.

- `onDecision("yes")`
    - Dispatch action `PAYMENT_DECISION` với kết quả success.

- `onDecision("no")`
    - Dispatch action `PAYMENT_DECISION` với kết quả failed.

### Quy tắc

- Không tự tạo số dư khác.
- Không kết nối thiết bị đọc thẻ thật.
- Các nút phải có `type="button"`.
- Component chỉ gọi callback; thay đổi state phải đi qua reducer.

---

# 6. Modal Components

## Component Index

| ID         | Component           | File                                           |
| ---------- | ------------------- | ---------------------------------------------- |
| CMP-MOD-01 | BaseModal           | `src/components/modal/BaseModal.jsx`           |
| CMP-MOD-02 | MachineConfirmModal | `src/components/modal/MachineConfirmModal.jsx` |
| CMP-MOD-03 | DoorConfirmModal    | `src/components/modal/DoorConfirmModal.jsx`    |
| CMP-MOD-04 | StopConfirmModal    | `src/components/modal/StopConfirmModal.jsx`    |

---

## CMP-MOD-01: BaseModal

### File

`src/components/modal/BaseModal.jsx`

### Mục đích

Cung cấp modal xác nhận dùng chung cho các thao tác trong ứng dụng.

### Props nội dung

- `title`
    - Tiêu đề modal.

- `machineNumber`
    - Số máy được hiển thị.

- `subtitle`
    - Nội dung giải thích bổ sung.

- `confirmLabel`
    - Nội dung nút xác nhận.

### Props trạng thái

- `danger`
    - Hiển thị kiểu cảnh báo nguy hiểm.

### Props sự kiện

- `onBack`
    - Xử lý khi nhấn `戻る`.

- `onConfirm`
    - Xử lý khi nhấn nút xác nhận.

### Cấu trúc hiển thị

- Centered overlay.
- Tiêu đề.
- Số máy.
- Nội dung phụ.
- Nút xác nhận.
- Nút `戻る`.

### Quy tắc

- Không tự đóng modal hoặc thay đổi màn hình.
- Mọi thao tác phải gọi callback được truyền vào.
- Các nút phải có `type="button"`.

---

## CMP-MOD-02: MachineConfirmModal

### File

`src/components/modal/MachineConfirmModal.jsx`

### Mục đích

Xác nhận thao tác liên quan đến máy đã chọn.

### Props dữ liệu

- `machineNumber`
    - Số máy cần xác nhận.

- `action`
    - Loại thao tác cần xác nhận.

- `isBusy`
    - Xác định máy có đang hoạt động hay không.

### Props sự kiện

- `onBack`
    - Quay lại mà không xác nhận.

- `onConfirm`
    - Xác nhận thao tác.

### Trường hợp sử dụng

- Xác nhận máy được chọn.
- Xác nhận extension.
- Xác nhận ý định dừng máy.

### Quy tắc

- Sử dụng `BaseModal` làm cấu trúc chung.
- Nội dung phải được quyết định từ props.
- Không tự thay đổi trạng thái máy.

---

## CMP-MOD-03: DoorConfirmModal

### File

`src/components/modal/DoorConfirmModal.jsx`

### Mục đích

Nhắc người dùng đóng cửa máy trước khi chọn course.

### Props dữ liệu

- `machineNumber`
    - Số máy đang được thao tác.

### Props sự kiện

- `onBack`
    - Quay lại màn hình trước.

- `onConfirm`
    - Xác nhận cửa máy đã được đóng.

### Quy tắc

- Sử dụng `BaseModal`.
- Không tự kiểm tra thiết bị hoặc trạng thái cửa thật.
- Sau khi xác nhận, thay đổi state phải đi qua reducer.

---

## CMP-MOD-04: StopConfirmModal

### File

`src/components/modal/StopConfirmModal.jsx`

### Mục đích

Xác nhận thao tác dừng máy đang hoạt động.

### Props dữ liệu

- `machineNumber`
    - Số máy cần dừng.

### Props sự kiện

- `onBack`
    - Hủy thao tác dừng.

- `onConfirm`
    - Xác nhận dừng máy.

### Trạng thái hiển thị

- Sử dụng kiểu danger confirm.

### Kết quả sau khi xác nhận

- Đưa máy về trạng thái `available`.
- Đặt thời gian còn lại về `0`.

### Quy tắc

- Không tự thay đổi trạng thái máy bên trong modal.
- Kết quả dừng máy phải được xử lý bằng action `CONFIRM_STOP_MODAL`.

---

# 7. Settings and Admin Components

## Component Index

| ID         | Component       | File                                   |
| ---------- | --------------- | -------------------------------------- |
| CMP-ADM-01 | AdminMenu       | `src/admin/components/AdminShared.jsx` |
| CMP-ADM-02 | AdminPageLayout | `src/admin/components/AdminShared.jsx` |
| CMP-ADM-03 | AdminDataTable  | `src/admin/components/AdminShared.jsx` |
| CMP-ADM-04 | AdminMessage    | `src/admin/components/AdminShared.jsx` |
| CMP-ADM-05 | AdminModal      | `src/admin/components/AdminShared.jsx` |

---

## CMP-ADM-01: AdminMenu

### File

`src/admin/components/AdminShared.jsx`

### Mục đích

Hiển thị menu của settings mode.

### Props sự kiện

- `onOpen`
    - Mở trang settings được chọn.

### Nguồn dữ liệu

- Menu được tải từ:
    - `settingsService.getMenuItems()`

### Tương tác

- Khi chọn một mục, gọi:
    - `onOpen(item.id)`

### Quy tắc

- Không viết cứng menu nếu service mock đã cung cấp dữ liệu.
- Không tự tạo thêm menu item.
- Việc mở trang phải đi qua callback và reducer.

---

## CMP-ADM-02: AdminPageLayout

### File

`src/admin/components/AdminShared.jsx`

### Mục đích

Cung cấp bố cục dùng chung cho các trang settings.

### Props dữ liệu

- `activePage`
    - Trang settings hiện tại.

- `children`
    - Nội dung của trang settings.

### Cấu trúc hiển thị

- Header settings mode.
- Title của trang hiện tại.
- Thời gian hiện tại.
- Khu vực nội dung.

### Quy tắc

- Title phải được lấy theo `activePage`.
- Không tự chuyển trang.
- Không tự tạo nội dung settings.

---

## CMP-ADM-03: AdminDataTable

### File

`src/admin/components/AdminShared.jsx`

### Mục đích

Hiển thị bảng dữ liệu dùng chung trong settings.

### Props dữ liệu

- `columns`
    - Danh sách định nghĩa cột.

- `rows`
    - Dữ liệu các hàng.

- `getRowKey`
    - Hàm lấy key duy nhất cho từng hàng.

- `sort`
    - Trạng thái sắp xếp hiện tại.

### Props sự kiện

- `onSort`
    - Xử lý khi người dùng chọn sắp xếp một cột.

### Tương tác

- Chỉ hỗ trợ sort đối với cột được khai báo sortable.
- Khi chọn cột sortable, gọi `onSort`.

### Quy tắc

- Không tự thay đổi dữ liệu `rows`.
- Không tự thêm cột.
- Mỗi hàng phải sử dụng key từ `getRowKey`.
- Nếu cột không sortable thì không hiển thị như một thao tác có thể nhấn.

---

## CMP-ADM-04: AdminMessage

### File

`src/admin/components/AdminShared.jsx`

### Mục đích

Hiển thị thông báo trong settings.

### Props dữ liệu

- `type`
    - Loại thông báo.

- `children`
    - Nội dung thông báo.

### Message type

- `info`
- `success`
- `error`

### Quy tắc

- Không render component nếu nội dung rỗng.
- Không tự tạo nội dung thông báo.
- Chỉ sử dụng style tương ứng với `type`.

---

## CMP-ADM-05: AdminModal

### File

`src/admin/components/AdminShared.jsx`

### Mục đích

Hiển thị modal dùng trong settings.

### Props nội dung

- `title`
    - Tiêu đề modal.

- `children`
    - Nội dung modal.

- `confirmText`
    - Nội dung nút xác nhận.

### Props trạng thái

- `danger`
    - Hiển thị dạng cảnh báo nguy hiểm.

- `disabled`
    - Vô hiệu hóa nút xác nhận.

### Props sự kiện

- `onCancel`
    - Hủy thao tác.

- `onConfirm`
    - Xác nhận thao tác.

### Trường hợp sử dụng

- Xác nhận thao tác nguy hiểm.
- Chỉnh giờ.

### Quy tắc

- Khi `disabled = true`, nút xác nhận phải có thuộc tính `disabled`.
- Không tự thay đổi dữ liệu settings.
- Các nút phải có `type="button"`.
- Kết quả thao tác phải được gửi qua callback.

---

# 8. Reducer Actions Used by Components

## Machine flow

- `GO_TO_MACHINE_PAGE`
- `OPEN_MACHINE_CONFIRM`
- `CLOSE_MODAL`
- `CONFIRM_MACHINE_MODAL`
- `CONFIRM_DOOR_MODAL`
- `CONFIRM_STOP_MODAL`

## Course and plan flow

- `SELECT_COURSE`
- `CHANGE_DRY_MINUTES`
- `CONFIRM_DRY_TIME`
- `SELECT_PLAN`

## Payment flow

- `INSERT_CARD`
- `PAYMENT_DECISION`

## Settings flow

- `OPEN_SETTINGS_PIN`
- `SETTINGS_ACCESS_DENIED`
- `APPEND_SETTINGS_PIN_DIGIT`
- `DELETE_SETTINGS_PIN_DIGIT`
- `SETTINGS_PIN_VALID`
- `SETTINGS_PIN_INVALID`
- `OPEN_SETTINGS_PAGE`
- `EXIT_SETTINGS`

## Navigation and completion flow

- `BACK`
- `CANCEL`
- `COMPLETE_RETURN`
- `ADD_EXTENSION_FROM_COMPLETE`
- `TICK_MACHINES`
- `RESET_TO_MACHINE`

---

# 9. Reducer Rules

- Component UI không trực tiếp thay đổi application state.
- Component gọi callback được truyền từ component cha.
- Callback chịu trách nhiệm gọi `dispatch`.
- Action phải thuộc danh sách đã được định nghĩa trong `appReducer.js`.
- Không thêm action mới chỉ để xử lý khác biệt về giao diện.
- Nếu cần thêm action mới, phải cập nhật trước:
    1. `SCREEN_FLOW.md`
    2. `SCREEN_SPEC.md`
    3. `src/state/appReducer.js`

- Tên action trong code và trong tài liệu phải giống nhau hoàn toàn.
