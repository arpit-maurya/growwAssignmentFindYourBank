import "./IndividualBank.css";
import { favBankData } from "./DataDisplayScreen";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
let IndividualBank = () => {
  let value = useContext(favBankData);
  const history = useHistory();
  return (
    <>
      {/* INDIVIDUAL BANK COMPONENT */}

      <div className="individualBank-mainBody">
        <div className="inner-IndividualBank-container">
          <div
            className="individualBank-BackMainPage"
            onClick={() => {
              history.push("/all-banks");
            }}
          >
            {" "}
            <span class="material-icons-round">chevron_left</span>Go Back
          </div>
          <div className="individualBank-BankLogo-Name-Box">
            <span class="material-icons-round">account_balance</span>
            {`${
              value.individualBankData ?value.individualBankData.bank_name : ""
            }`}
            
          </div>
          <div className="individualBank-BankData">
            <div className="individualBank-BankData-oneBox">
              {`${
                value.individualBankData ? ` IFSC : ${value.individualBankData.ifsc}` : ""
              }`}
            </div>
            <div className="individualBank-BankData-oneBox">
              {`${
                value.individualBankData ? `BRANCH : ${value.individualBankData.branch}` : ""
              }`}
            </div>
            <div className="individualBank-BankData-oneBox">
              {`${
                value.individualBankData ? `BANK ID : ${value.individualBankData.bank_id}` : ""
              }`}
            </div>
            <div className="individualBank-BankData-AddressBox">
              {`${
                value.individualBankData ? `ADDRESS : ${value.individualBankData.address}` : ""
              }`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default IndividualBank;
