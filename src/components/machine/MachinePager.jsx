import "./MachinePager.css";

export default function MachinePager({ pagination, onPageChange }) {
  return (
    <div className="machine-pager">
      <button
        className={`machine-pager__arrow${pagination.hasPrevious ? " machine-pager__arrow--active" : ""}`}
        type="button"
        disabled={!pagination.hasPrevious}
        onClick={() => onPageChange(pagination.previousScreen)}
        aria-label="前のページ"
      >
        ↑
      </button>
      <div className="machine-pager__count">
        {pagination.page}/{pagination.pageCount}
      </div>
      <button
        className={`machine-pager__arrow${pagination.hasNext ? " machine-pager__arrow--active" : ""}`}
        type="button"
        disabled={!pagination.hasNext}
        onClick={() => onPageChange(pagination.nextScreen)}
        aria-label="次のページ"
      >
        ↓
      </button>
    </div>
  );
}
