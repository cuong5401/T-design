import { useEffect, useState } from "react";
import { settingsService } from "../services/adminServices";
import "../styles/admin.css";

export function AdminMessage({ type = "info", children }) {
  if (!children) return null;
  return <div className={`admin-message admin-message--${type}`}>{children}</div>;
}

export function AdminModal({ title, children, onCancel, onConfirm, confirmText = "実行", danger = false, disabled = false }) {
  return (
    <div className="admin-modal" role="dialog" aria-modal="true">
      <div className="admin-modal__panel">
        <h3>{title}</h3>
        <div className="admin-modal__body">{children}</div>
        <div className="admin-modal__actions">
          <button className="admin-button admin-button--subtle" type="button" onClick={onCancel} disabled={disabled}>
            いいえ
          </button>
          <button className={`admin-button ${danger ? "admin-button--danger" : "admin-button--primary"}`} type="button" onClick={onConfirm} disabled={disabled}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminDataTable({ columns, rows, getRowKey, onSort, sort }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                {column.sortable ? (
                  <button type="button" onClick={() => onSort(column.key)}>
                    {column.label}
                    {sort?.key === column.key ? (sort.direction === "asc" ? " ▲" : " ▼") : ""}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length}>表示するデータがありません。</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function AdminMenu({ onOpen }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    settingsService.getMenuItems().then((nextItems) => {
      if (mounted) setItems(nextItems);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="settings-mode settings-mode--menu">
      <h2 className="settings-mode__title">設定メニュー</h2>
      <div className="settings-mode__tiles">
        {items.map((item) => (
          <button className={`settings-mode__tile settings-mode__tile--${item.tone}`} type="button" key={item.id} onClick={() => onOpen(item.id)}>
            <span className="settings-mode__mark" aria-hidden="true">{item.mark}</span>
            <span className="settings-mode__label">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function AdminPageLayout({ activePage, children }) {
  const [items, setItems] = useState([]);
  const [nowText, setNowText] = useState("");

  useEffect(() => {
    let mounted = true;
    settingsService.getMenuItems().then((nextItems) => {
      if (mounted) setItems(nextItems);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const updateNow = () => setNowText(new Date().toLocaleString("ja-JP", { hour12: false }));
    updateNow();
    const intervalId = window.setInterval(updateNow, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const activeItem = items.find((item) => item.id === activePage);

  return (
    <section className="admin-shell">
      <header className="admin-shell__header">
        <div>
          <div className="admin-shell__mode">設定モード</div>
          <h2>{activeItem?.label || "設定"}</h2>
        </div>
        <div className="admin-shell__time">{nowText}</div>
      </header>
      <main className="admin-content">{children}</main>
    </section>
  );
}
