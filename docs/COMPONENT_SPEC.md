# Component Spec

## Component Principles

- Component dùng chung phải nhận props rõ ràng, không tự đọc state toàn app nếu không cần.
- Mọi tương tác làm đổi màn hình/state đi qua `dispatch` từ `src/state/appReducer.js`.
- Component UI không tự tạo dữ liệu ngoài spec. Dữ liệu đến từ `src/data`, `src/admin/mocks`, hoặc service mock hiện có.
- Button phải có `type="button"` nếu không submit form.
- Disabled state phải thật sự set `disabled`, không chỉ đổi style.

## Layout Components

| Component | Path | Props chính | Trạng thái / ghi chú |
| --- | --- | --- | --- |
| `KioskViewport` | `src/components/layout/KioskViewport.jsx` | `children` | Gọi `useViewportScale`, bọc app trong fixed canvas `1280 x 800`. |
| `AppShell` | `src/components/layout/AppShell.jsx` | `clockText`, `progressStep`, `screen`, `selectedMachine`, `isExtension`, `contentMode`, `showFooter`, `showFooterCancel`, `footerDisabled`, `hideProgress`, `onBack`, `onCancel`, `onStepOneLongPress`, `children` | Điều phối progress header, screen header, content mode và footer. |
| `ProgressHeader` | `src/components/layout/ProgressHeader.jsx` | `currentStep`, `clockText`, `storeName`, `onStepOneLongPress` | Hiển thị 4 step: `機械選択`, `コース選択`, `支払い`, `運転開始`. Step 1 có long press để vào settings khi được truyền handler. |
| `ScreenHeader` | `src/components/layout/ScreenHeader.jsx` | `screen`, `selectedMachine`, `isExtension` | Chọn title theo screen. Với course/plan/payment/complete hiển thị badge `機械番号`. |
| `FooterNavigation` | `src/components/layout/FooterNavigation.jsx` | `disabled`, `onBack`, `onCancel`, `showCancel` | Nút `中止` và `戻る`. Không hiển thị cancel trong settings. Disabled ở complete. |

## Machine Components

| Component | Path | Props chính | Trạng thái / tương tác |
| --- | --- | --- | --- |
| `MachineGrid` | `src/components/machine/MachineGrid.jsx` | `machines`, `onSelectMachine`, `onStopMachine` | Hiển thị tối đa 9 máy/trang, thêm placeholder để giữ layout. |
| `MachineCard` | `src/components/machine/MachineCard.jsx` | `machine`, `isPlaceholder`, `onSelect`, `onLongPressStop` | Status: `available`, `busy`, `broken`. Type: `wash-only`, `dry-only`, `wash-dry`. Click chọn nếu selectable. Long press máy busy để dừng. |
| `MachinePager` | `src/components/machine/MachinePager.jsx` | `pagination`, `onPageChange` | Nút `↑`, `↓`, count `page/pageCount`. Disabled nếu không có trang trước/sau. |
| `LaundryTypeIcon` | `src/components/icons/LaundryTypeIcon.jsx` | `type`, `className` | Icon cho `wash` hoặc `dry`. |

## Course And Plan Components

| Component | Path | Props chính | Trạng thái / tương tác |
| --- | --- | --- | --- |
| `CourseBand` | `src/components/course/CourseCard.jsx` | `parts`, `className` | Hiển thị band `洗濯`, `乾燥`; dùng trong course/plan/payment. |
| `CourseCard` | `src/components/course/CourseCard.jsx` | `course`, `enabled`, `highlighted`, `onSelect` | Disabled nếu course không được chọn trong mode extension. `highlighted` dùng cho dry extension. |
| `PlanCard` | `src/components/course/PlanCard.jsx` | `plan`, `onSelect` | Hiển thị `nameLines`, divider, `price`. Click chọn plan. |

## Payment Components

| Component | Path | Props chính | Trạng thái / tương tác |
| --- | --- | --- | --- |
| `PaymentPanel` | `src/components/payment/PaymentPanel.jsx` | `state`, `onInsertCard`, `onDecision` | Trước khi insert card: hướng dẫn đưa thẻ. Sau insert: hiển thị balance mock và nút `支払う`, `支払わない`. |

Payment behavior:

- `onInsertCard` dispatch `INSERT_CARD`.
- `onDecision("yes")` dispatch `PAYMENT_DECISION` success.
- `onDecision("no")` dispatch `PAYMENT_DECISION` failed.
- Balance hiện tại dùng mock `PREPAID_CARD_BALANCE = 3000`.

## Modal Components

| Component | Path | Props chính | Trạng thái / tương tác |
| --- | --- | --- | --- |
| `BaseModal` | `src/components/modal/BaseModal.jsx` | `title`, `machineNumber`, `subtitle`, `confirmLabel`, `danger`, `onBack`, `onConfirm` | Modal confirm chung, centered overlay, có confirm và `戻る`. |
| `MachineConfirmModal` | `src/components/modal/MachineConfirmModal.jsx` | `machineNumber`, `action`, `isBusy`, `onBack`, `onConfirm` | Xác nhận số máy, extension hoặc stop intent. |
| `DoorConfirmModal` | `src/components/modal/DoorConfirmModal.jsx` | `machineNumber`, `onBack`, `onConfirm` | Nhắc đóng cửa máy trước khi chọn course. |
| `StopConfirmModal` | `src/components/modal/StopConfirmModal.jsx` | `machineNumber`, `onBack`, `onConfirm` | Danger confirm để đưa máy về available và remaining `0`. |

## Settings/Admin Components

| Component | Path | Props chính | Trạng thái / tương tác |
| --- | --- | --- | --- |
| `AdminMenu` | `src/admin/components/AdminShared.jsx` | `onOpen` | Load menu từ `settingsService.getMenuItems()`, mở page qua `onOpen(item.id)`. |
| `AdminPageLayout` | `src/admin/components/AdminShared.jsx` | `activePage`, `children` | Header settings mode, title page, thời gian hiện tại. |
| `AdminDataTable` | `src/admin/components/AdminShared.jsx` | `columns`, `rows`, `getRowKey`, `onSort`, `sort` | Table dùng chung, hỗ trợ sortable column nếu khai báo. |
| `AdminMessage` | `src/admin/components/AdminShared.jsx` | `type`, `children` | Message info/success/error. Không render nếu rỗng. |
| `AdminModal` | `src/admin/components/AdminShared.jsx` | `title`, `children`, `onCancel`, `onConfirm`, `confirmText`, `danger`, `disabled` | Modal admin dùng cho confirm nguy hiểm hoặc chỉnh giờ. |

## Reducer Actions Used By Components

- `GO_TO_MACHINE_PAGE`
- `OPEN_MACHINE_CONFIRM`
- `CLOSE_MODAL`
- `CONFIRM_MACHINE_MODAL`
- `CONFIRM_DOOR_MODAL`
- `CONFIRM_STOP_MODAL`
- `SELECT_COURSE`
- `CHANGE_DRY_MINUTES`
- `CONFIRM_DRY_TIME`
- `SELECT_PLAN`
- `INSERT_CARD`
- `PAYMENT_DECISION`
- `OPEN_SETTINGS_PIN`
- `SETTINGS_ACCESS_DENIED`
- `APPEND_SETTINGS_PIN_DIGIT`
- `DELETE_SETTINGS_PIN_DIGIT`
- `SETTINGS_PIN_VALID`
- `SETTINGS_PIN_INVALID`
- `OPEN_SETTINGS_PAGE`
- `EXIT_SETTINGS`
- `BACK`
- `CANCEL`
- `COMPLETE_RETURN`
- `ADD_EXTENSION_FROM_COMPLETE`
- `TICK_MACHINES`
- `RESET_TO_MACHINE`

Không thêm action mới nếu chưa cập nhật `SCREEN_FLOW.md` và `SCREEN_SPEC.md`.
