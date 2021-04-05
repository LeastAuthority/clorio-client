import ErrorImage from "../../assets/Error.png";
import NoTransactionsOrNotAvailableImage from "../../assets/NoTransactionsOrNotAvailable.svg";
import TxHistoryNotAvailableImage from "../../assets/TxHistoryNotAvailable.svg";
import NoTransactions from "../../assets/NoTransactions.svg";

const TransactionsTableError = (balance: number, hasErrors: boolean) => {
  let imageToRender = hasErrors ? ErrorImage : NoTransactions;
  if (balance === 0) {
    imageToRender = NoTransactionsOrNotAvailableImage;
  } else if (balance > 0) {
    imageToRender = TxHistoryNotAvailableImage;
  }
  return (
    <div className="block-container">
      <div className="full-width padding-y-50">
        <img
          src={imageToRender}
          className="animate__animated animate__fadeIn"
        />
      </div>
    </div>
  );
};

export default TransactionsTableError;
