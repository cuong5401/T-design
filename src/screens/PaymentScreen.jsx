import PaymentPanel from "../components/payment/PaymentPanel";

export default function PaymentScreen({ state, dispatch }) {
  return (
    <PaymentPanel
      state={state}
      onInsertCard={() => dispatch({ type: "INSERT_CARD" })}
      onDecision={(decision) => dispatch({ type: "PAYMENT_DECISION", decision })}
    />
  );
}
