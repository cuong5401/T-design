import { useEffect, useMemo, useState } from "react";
import { AdminDataTable, AdminMessage } from "../components/AdminShared";
import { courseNameService, createNowText } from "../services/adminServices";

export default function CourseNameScreen() {
  const [rows, setRows] = useState([]);
  const [mode, setMode] = useState("list");
  const [machineNumber, setMachineNumber] = useState("all");
  const [type, setType] = useState("all");
  const [updatedAt, setUpdatedAt] = useState("");

  const load = () => {
    courseNameService.getRows().then((nextRows) => {
      setRows(nextRows);
      setUpdatedAt(createNowText());
    });
  };

  useEffect(load, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchMachine = machineNumber === "all" || row.machineNumber === Number(machineNumber);
      const matchType = type === "all" || row.type === type;
      return matchMachine && matchType;
    });
  }, [rows, machineNumber, type]);

  const machines = [...new Set(rows.map((row) => row.machineNumber))].sort((a, b) => a - b);
  const types = [...new Set(rows.map((row) => row.type))];

  return (
    <div className="admin-page">
      <div className="admin-filter">
        <label>表示形式<select value={mode} onChange={(event) => setMode(event.target.value)}><option value="list">一覧表示</option><option value="machine">機器別表示</option></select></label>
        <label>機械番号<select value={machineNumber} onChange={(event) => setMachineNumber(event.target.value)}><option value="all">すべて</option>{machines.map((item) => <option key={item} value={item}>{item}号機</option>)}</select></label>
        <label>機器種類<select value={type} onChange={(event) => setType(event.target.value)}><option value="all">すべて</option>{types.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <button className="admin-button admin-button--primary" type="button" onClick={load}>最新情報を表示</button>
      </div>
      <AdminMessage>最終更新日時: {updatedAt || "-"}</AdminMessage>
      <AdminDataTable
        columns={[
          { key: "machineNumber", label: "機械番号", render: (row) => `${row.machineNumber}号機` },
          { key: "type", label: "機器種類" },
          { key: "courseName", label: "コース名" },
          { key: "price", label: "コース金額", render: (row) => `${row.price.toLocaleString("ja-JP")}円` },
          { key: "communication", label: "通信状態" },
          { key: "updatedAt", label: "最終更新日時" }
        ]}
        rows={mode === "machine" ? [...filteredRows].sort((a, b) => a.machineNumber - b.machineNumber) : filteredRows}
        getRowKey={(row) => `${row.machineNumber}-${row.courseName}`}
      />
    </div>
  );
}
