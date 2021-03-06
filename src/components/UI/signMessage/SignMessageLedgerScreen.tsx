import Hoc from "../Hoc";
import imageToRender from "./assets/notAvailableForLedger.svg";

const SignMessageLedgerScreen = () => (
  <Hoc>
    <div className="animate__animated animate__fadeIn">
      <div className="mx-auto">
        <div className="block-container">
          <img
            src={imageToRender}
            className="animate__animated animate__fadeIn"
          />
        </div>
      </div>
    </div>
  </Hoc>
);

export default SignMessageLedgerScreen;
