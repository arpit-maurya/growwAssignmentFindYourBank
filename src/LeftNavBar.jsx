import { allRequiredDataDetails } from "./App";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./LeftNavbar.css";

let LeftNavBar = () => {
  const history = useHistory();
  const values = useContext(allRequiredDataDetails);
  return (
    <div className="leftNavBar">
      <div className="leftNavBar-innerContainer">
        <div className="leftNavBar-innerContainer-2">
          <div
            className={`leftNavBar-box AllBanks
            ${
              values.selected_allBanks_or_fav === "All Banks"
                ? "selected-leftNavbarBox "
                : ""
            }
            `}
            onClick={() => {
              values.setSelected_allBanks_or_fav("All Banks");
              history.push("/all-banks");
            }}
          >
            <span
              className={`material-icons-round leftNavBar-box-iconSpan ${
                values.selected_allBanks_or_fav === "All Banks"
                  ? "selected-leftNavbarIconSpan "
                  : ""
              }`}
            >
              account_balance
            </span>
            <span className="leftNavBar-box-iconText">All Banks</span>
          </div>
        </div>

        <div className="leftNavBar-innerContainer-2">
          <div
            className={`leftNavBar-box AllBanks
              ${
                values.selected_allBanks_or_fav === "Favorites"
                  ? "selected-leftNavbarBox"
                  : ""
              }
            `}
            onClick={() => {
              values.setSelected_allBanks_or_fav("Favorites");
                  history.push("/favorites");
            }}
          >
            <span
              className={`material-icons-round leftNavBar-box-iconSpan ${
                values.selected_allBanks_or_fav === "Favorites"
                  ? "selected-leftNavbarIconSpan "
                  : ""
              }`}
            >
              class
            </span>
            <span className="leftNavBar-box-iconText">Favorites</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftNavBar;
