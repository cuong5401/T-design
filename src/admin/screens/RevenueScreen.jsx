import { useEffect, useMemo, useState } from "react";
import { AdminDataTable, AdminMessage } from "../components/AdminShared";
import { csvExportService, revenueService } from "../services/adminServices";

const money = (value) => `${value.toLocaleString("ja-JP")}円`;

export default function RevenueScreen() {
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({ machineNumber: "all", startDate: "", endDate: "" });
  const [sort, setSort] = useState({ key: "dateTime", direction: "desc" });
  const [tab, setTab] = useState("controller");
  const [message, setMessage] = useState("");

  useEffect(() => {
    revenueService.getRevenueRows().then(setRows);
  }, []);

  const error = filters.startDate && filters.endDate && filters.startDate > filters.endDate ? "開始日は終了日以前にしてください。" : "";
  const filteredRows = useMemo(() => (error ? [] : revenueService.filterRows(rows, filters)), [rows, filters, error]);
  const sortedRows = useMemo(() => revenueService.sortRows(filteredRows, sort), [filteredRows, sort]);
  const summary = useMemo(() => revenueService.createSummary(filteredRows), [filteredRows]);
  const tableRows = sortedRows.filter((row) => row.source === tab);
  const machines = [...new Set(rows.map((row) => row.machineNumber))].sort((a, b) => a - b);

  const handleSort = (key) => {
    setSort((current) => ({ key, direction: current.key === key && current.direction === "desc" ? "asc" : "desc" }));
  };

  const handleCsv = () => {
    csvExportService.downloadRevenueCsv(sortedRows);
    setMessage("CSVファイルを保存しました。");
  };

  return (
    <div className="admin-page">
      <div className="admin-filter">
        <label>
          対象機器
          <select value={filters.machineNumber} onChange={(event) => setFilters({ ...filters, machineNumber: event.target.value })}>
            <option value="all">すべて</option>
            {machines.map((machineNumber) => (
              <option value={machineNumber} key={machineNumber}>{machineNumber}号機</option>
            ))}
          </select>
        </label>
        <label>
          開始日
          <input type="date" value={filters.startDate} onChange={(event) => setFilters({ ...filters, startDate: event.target.value })} />
        </label>
        <label>
          終了日
          <input type="date" value={filters.endDate} onChange={(event) => setFilters({ ...filters, endDate: event.target.value })} />
        </label>
        <button className="admin-button admin-button--primary" type="button">表示</button>
        <button className="admin-button admin-button--subtle" type="button" onClick={() => setFilters({ machineNumber: "all", startDate: "", endDate: "" })}>
          条件をクリア
        </button>
      </div>
      <AdminMessage type={error ? "error" : "success"}>{error || message}</AdminMessage>
      <div className="admin-summary">
        <div>
          <span>本機での課金金額合計</span>
          <strong>{money(summary.controller.amount)}</strong>
          <small>{summary.controller.count}件 / 現在の表示条件</small>
        </div>
        <div>
          <span>ランドリー機での課金金額合計</span>
          <strong>{money(summary.laundry.amount)}</strong>
          <small>{summary.laundry.count}件 / 現在の表示条件</small>
        </div>
      </div>
      <AdminDataTable
        columns={[
          { key: "machineNumber", label: "機械番号" },
          { key: "controllerAmount", label: "本機課金合計", render: (row) => money(row.controllerAmount) },
          { key: "laundryAmount", label: "ランドリー機課金合計", render: (row) => money(row.laundryAmount) },
          { key: "total", label: "合計", render: (row) => money(row.total) }
        ]}
        rows={summary.byMachine}
        getRowKey={(row) => row.machineNumber}
      />
      <div className="admin-tabs">
        <button className={tab === "controller" ? "active" : ""} type="button" onClick={() => setTab("controller")}>本機での課金履歴</button>
        <button className={tab === "laundry" ? "active" : ""} type="button" onClick={() => setTab("laundry")}>ランドリー機での課金履歴</button>
        <button className="admin-button admin-button--primary" type="button" onClick={handleCsv}>CSV保存</button>
      </div>
      <AdminDataTable
        columns={[
          { key: "dateTime", label: "日時", sortable: true },
          { key: "amount", label: "金額", sortable: true, render: (row) => money(row.amount) },
          { key: "machineNumber", label: "実行機器", sortable: true, render: (row) => `${row.machineNumber}号機` },
          ...(tab === "controller" ? [{ key: "action", label: "実行内容" }] : [])
        ]}
        rows={tableRows}
        getRowKey={(row) => row.id}
        onSort={handleSort}
        sort={sort}
      />
    </div>
  );
}
