# Screen Spec

## Global State

State gốc nằm ở `src/state/initialState.js`.

Các field chính:

- `screen`: màn hình hiện tại. Giá trị chính: `machine-{page}`, `course`, `plan`, `payment`, `complete`, `settings-pin`, `settings`.
- `progressStep`: step header từ 1 đến 4.
- `selectedMachine`: số máy đang chọn.
- `selectedCourse`: `wash-dry`, `wash`, hoặc `dry`.
- `selectedPlan`: plan đã chọn.
- `dryMinutes`: thời gian sấy, mặc định `8`.
- `paymentPrice`: số tiền thanh toán.
- `cardInserted`: trạng thái thẻ mock.
- `remainingBalance`: số dư còn lại sau thanh toán.
- `completeMode`: `start`, `add`, hoặc `failed`.
- `isExtension`: đang dùng flow gia hạn.
- `settingsPin`, `settingsPinError`, `settingsPage`: state settings.
- `modal`: `{ type, machineNumber, action }`.
- `machines`: danh sách máy mock.

## Machine Selection

Screen id:

- `machine-1`
- `machine-2`
- `machine-3`
- `machine-4`

Source:

- Component: `src/screens/MachineSelectionScreen.jsx`
- Data: `src/data/machines.js`

Data:

- Tổng số máy: `30`.
- Grid mỗi trang: `3 x 3`, tối đa `9` máy.
- Status: `available`, `busy`, `broken`.
- Type: `wash-only`, `dry-only`, `wash-dry`.

UI:

- Progress header hiển thị step 1 active.
- Screen title: `洗濯物を入れた機械番号を選択してください`.
- Grid máy nằm bên trái, pager `↑`/`↓` bên phải.
- Không có footer trên machine screen.

Interaction:

- Click máy `available`: mở `MachineConfirmModal`, sau confirm mở `DoorConfirmModal`, sau confirm đi vào course/plan.
- Click máy `busy` nếu có thể extend: mở `MachineConfirmModal`, sau confirm đi vào extension flow.
- Long press máy `busy`: mở confirm stop flow.
- Click máy `broken`: không làm gì.
- Long press step 1 trong progress header khoảng `3000ms`: mở settings PIN nếu mock cho phép.

## Machine Confirm Modal

Source:

- `src/components/modal/MachineConfirmModal.jsx`
- `src/components/modal/DoorConfirmModal.jsx`
- `src/components/modal/StopConfirmModal.jsx`

UI:

- Hiển thị số máy lớn ở giữa.
- Nút confirm và `戻る`.

Interaction:

- `MachineConfirmModal`: xác nhận đúng máy đang nhấp nháy.
- `DoorConfirmModal`: yêu cầu đóng cửa máy trước khi đi tiếp.
- `StopConfirmModal`: danger confirm, dừng máy và đặt remaining về `0`.

## Course Selection

Screen id:

- `course`

Source:

- `src/screens/CourseSelectionScreen.jsx`
- `src/data/courses.js`

UI:

- Header có badge `機械番号`.
- Title mặc định: `コースを選択してください`.
- Nếu extension: title `延長時間を選択してください`.
- Course card hiện theo type máy:
  - `wash-only`: chỉ `洗濯`.
  - `dry-only`: chỉ `乾燥`.
  - `wash-dry`: `洗濯と乾燥`, `洗濯`, `乾燥`.

Interaction:

- Chọn course dispatch `SELECT_COURSE`.
- Nếu máy `wash-dry` và đang extension, chỉ course `dry` được bật.

## Plan Selection

Screen id:

- `plan`

Source:

- `src/screens/PlanSelectionScreen.jsx`
- `src/screens/DryTimeSelectionScreen.jsx`
- `src/data/plans.js`

Behavior:

- Nếu `selectedCourse === "dry"`: dùng màn hình chọn thời gian sấy.
- Nếu course khác: dùng màn hình chọn plan card.

Plan data hiện có:

- `wash-dry`
  - `洗乾多 / ６０分` - `1,100円`
  - `洗乾普 / ８０分` - `1,300円`
  - `洗乾少 / １００分` - `1,500円`
- `wash`
  - `標準 / ２５分` - `700円`
- Extension:
  - `延長 / １０分` - `100円`

Interaction:

- Click `PlanCard`: dispatch `SELECT_PLAN`, chuyển sang `payment`.
- `戻る`: về `course` nếu trước đó có course select, hoặc về page máy đã chọn.

## Dry Time Selection

Screen id:

- `plan` khi `selectedCourse === "dry"`

Source:

- `src/screens/DryTimeSelectionScreen.jsx`
- `src/data/plans.js`

Data:

- Min: `8` phút.
- Max: `40` phút.
- Step: `8` phút.
- Giá: `100円` mỗi `8` phút.

UI:

- Title: `乾燥時間を選択してください`.
- Nếu extension: `延長時間を選択してください`.
- Nút `−`, display phút/giá, nút `＋`.
- Note: `8分ごとに100円です。最大40分まで選択できます。`
- Confirm: `この時間で支払う`.

Interaction:

- `−`: dispatch `CHANGE_DRY_MINUTES` với diff âm, disabled ở min.
- `＋`: dispatch `CHANGE_DRY_MINUTES` với diff dương, disabled ở max.
- Confirm: dispatch `CONFIRM_DRY_TIME`, chuyển sang `payment`.

## Payment

Screen id:

- `payment`

Source:

- `src/screens/PaymentScreen.jsx`
- `src/components/payment/PaymentPanel.jsx`

UI:

- Header có badge `機械番号`.
- Title: `お支払い`.
- Summary:
  - `ステータス`: `新使用` hoặc `追加`.
  - `コース`
  - `プラン`
  - `金額`
- Card area:
  - Trước khi insert: `プリペイドカードを挿入してください`.
  - Sau khi insert: `プリペイドカードを読み取りました`, số dư mock, nút `支払う`, `支払わない`.

Interaction:

- Click guide card: dispatch `INSERT_CARD`.
- `支払う`: dispatch `PAYMENT_DECISION` với `yes`, update machine busy và remaining.
- `支払わない`: dispatch `PAYMENT_DECISION` với `no`, chuyển complete failed.
- `戻る`: về `plan`.
- `中止`: reset về `machine-1`.

## Complete

Screen id:

- `complete`

Source:

- `src/screens/CompleteScreen.jsx`

UI:

- Success:
  - `お支払い完了です。`
  - `ご利用ありがとうございます。`
- Failed:
  - `お支払いに失敗しました。`
  - `もう一度お試しください。`

Behavior:

- Footer disabled.
- Sau `COMPLETE_RETURN_DELAY_MS = 2000ms`, tự reset về `machine-1`.

## Settings PIN

Screen id:

- `settings-pin`

Source:

- `src/screens/SettingsPinScreen.jsx`
- `src/services/adminAccessService.js`
- `src/admin/services/adminServices.js`

Entry:

- Long press step 1 trên machine screen khoảng `3000ms`.
- `adminAccessService.canEnterSettings()` phải trả true.

UI:

- Title: `暗証番号を入力してください`.
- 4 dot PIN display.
- Keypad `1-9`, `削除`, `0`, `確認`.

Interaction:

- Nhập tối đa 4 chữ số.
- `確認` disabled nếu chưa đủ 4 số hoặc đang kiểm tra.
- PIN mock mặc định: `1234`.
- Valid: chuyển `settings`.
- Invalid: reset về machine và hiển thị error.

## Settings Mode

Screen id:

- `settings`

Source:

- `src/screens/SettingsModeScreen.jsx`
- `src/admin/components/AdminShared.jsx`
- `src/admin/services/adminServices.js`

Menu hiện tại trong source:

- `回収金額表示` -> `revenue`
- `各種設定画` -> `general`
- `ステータス情報` -> `status`
- `コース名表示画` -> `course-names`
- `初期化` -> `initialize`
- `カード清掃` -> `card-cleaning`
- `暗証番号変更` -> `pin-change`

TODO:

- Xác nhận với người dùng việc brief cũ ghi `カード清掃暗証番号`; không tự gộp/tách mục nếu chưa có quyết định.

Interaction:

- Click menu item: dispatch `OPEN_SETTINGS_PAGE`.
- `戻る` từ sub page: quay về menu settings.
- `戻る` hoặc `中止` ở menu settings: reset về `machine-1`.

## Revenue Settings Page

Page id:

- `revenue`

Source:

- `src/admin/screens/RevenueScreen.jsx`

UI/data:

- Bộ lọc: machine, start date, end date.
- Summary: tổng tiền `本機`, tổng tiền `ランドリー機`.
- Table tổng theo máy.
- Tabs: `本機での課金履歴`, `ランドリー機での課金履歴`.
- Button hiện tại: `CSV保存`.

Interaction:

- Sort table theo column sortable.
- Clear filter reset điều kiện.
- Nếu start date > end date, hiển thị error.
- CSV theo rule project chỉ nên mô phỏng bằng message, không download file thật.

## General Settings Page

Page id:

- `general`

Source:

- `src/admin/screens/GeneralSettingsScreen.jsx`

Tabs:

- `カードID設定`
- `運用設定`
- `通信設定`

Interactions:

- Card ID: set waiting, mock insert, mock read error, confirm card ID.
- Operation: toggle human sensor, chỉnh các thời gian bằng `-`, input, `+`.
- Communication: chỉnh retry count và response wait ms, validate theo limit mock.
- Save/Discard dùng service mock.

## Status Page

Page id:

- `status`

Source:

- `src/admin/screens/StatusScreen.jsx`

UI/data:

- Version mock: MCU, PC app.
- PC time mock.
- Machine status table.
- Scenario buttons: normal, running, communication error, machine error.
- Modal đổi PC time.

Interaction:

- Chọn machine number.
- Đổi scenario chỉ cập nhật mock row.
- Đổi PC time chỉ cập nhật mock settings.

## Course Name Page

Page id:

- `course-names`

Source:

- `src/admin/screens/CourseNameScreen.jsx`

UI/data:

- Display mode: list hoặc machine.
- Filter: machine number, machine type.
- Table: machine, type, course name, price, communication, updated at.

Interaction:

- `最新情報を表示` reload mock rows và update timestamp.

## Initialize Page

Page id:

- `initialize`

Source:

- `src/admin/screens/InitializeScreen.jsx`

UI:

- Warning panel.
- Button `全データを初期化`.
- Confirm modal danger.

Interaction:

- Confirm gọi `initializeAllMockData()` và reset mock settings/admin rows.

## Card Cleaning Page

Page id:

- `card-cleaning`

Source:

- `src/admin/screens/CardCleaningScreen.jsx`

UI:

- Status, progress `cycle / 8`, progress bar.
- Buttons: start, insert cleaning card, card jam, read error.

Interaction:

- Start chuyển sang trạng thái chờ thẻ.
- Insert chạy 8 cycle mock.
- Error dừng cycle và hiển thị message.

## PIN Change Page

Page id:

- `pin-change`

Source:

- `src/admin/screens/PinChangeScreen.jsx`

UI:

- 3 field: current PIN, new PIN, confirm PIN.
- Numeric keypad.
- Buttons: delete, clear all, discard, change PIN.

Interaction:

- Mỗi field tối đa 4 số.
- Submit chỉ bật khi đủ 4 số, new trùng confirm và khác current.
- Service mock đổi PIN trong memory.
