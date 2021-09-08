import { useContext } from "react";
import { optionsBankDataAllBanks } from "./AllBanksDataDisplay";
import { allRequiredDataDetails } from "./App";
import { optionsBankDataFavBanks } from "./FavoritesDataDisplay";
import "./SearchBox.css";

let SearchBox = () => {
  let AllBankData = useContext(optionsBankDataAllBanks);
  let FavBankData = useContext(optionsBankDataFavBanks);
  let values;
  
  const forCheckingCondition = useContext(allRequiredDataDetails);
  if (forCheckingCondition.selected_allBanks_or_fav === "All Banks") {
    values = AllBankData;;
  } else {
    values = FavBankData;
  }
   
  return (
    <div className="searchBox-main-container">
      <div className="searchBox-bankData-typeText">
        {`${forCheckingCondition.selected_allBanks_or_fav}`}
      </div>

      <div className="searchBox-category-mainContainer">
        <div className="searchBox-category-innerBox">
          <select
            class="selectCategory"
            onChange={(e) => {
              values.setSelectedCity(e.currentTarget.value);
              values.setCurrentPage(1);
            }}
          >
            <option selected>Select City</option>
            <option value="POWAI">POWAI</option>
            <option value="BORIVALI">BORIVALI</option>
            <option value="DOMBIVLI">DOMBIVLI</option>
            <option value="KHARGHAR">KHARGHAR</option>
            <option value="PRABHADEVI">PRABHADEVI</option>
          </select>
        </div>

        <div className="searchBox-category-innerBox">
          <select
            className="selectCategory"
            onChange={(e) => {
              values.setSelectCategoryBankRelated(e.currentTarget.value);
            }}
          >
            <option selected>Branch</option>
            <option value="ifsc">IFSC</option>
            <option value="bank_name">Bank Name</option>
          </select>
        </div>

        <div className="searchBox-innerSearch-box">
          <span className="material-icons-round">search</span>
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => {
              values.setSearchBox(e.currentTarget.value);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
