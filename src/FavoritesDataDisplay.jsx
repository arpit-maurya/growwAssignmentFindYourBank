import "./tableDataDisplay.css";
import { favBankData } from "./DataDisplayScreen";
import { useContext, useState, createContext } from "react";
import SearchBox from "./SearchBox";
import { useHistory } from "react-router-dom";
export const optionsBankDataFavBanks = createContext();

let FavoritesDataDisplay = () => {
  const history = useHistory();

  let value = useContext(favBankData);

  let [rowPerPage, setrowPerPage] = useState(10);

  let [usingForRerender, setUsingForRerender] = useState(false);

  const values = useContext(favBankData);

  //Converting Obj in ProperArray

  let arrBankDetails = [];
  for (let key in values.favoriteBankData) {
    arrBankDetails.push(values.favoriteBankData[key]);
  }

  let [selectCategoryBankRelated, setSelectCategoryBankRelated] =
    useState("Branch");
  let [selectedCity, setSelectedCity] = useState("Select City");
  let [searchBox, setSearchBox] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);

  if (arrBankDetails) {
    arrBankDetails = arrBankDetails.filter((el) => {
      if (selectedCity === "Select City") {
        return el;
      } else if (selectedCity === el.branch) {
        return el;
      }
    });
  }

  //Filtering Data According to options selected by User

  if (arrBankDetails) {
    arrBankDetails = arrBankDetails.filter((el) => {
      if (selectCategoryBankRelated === "Branch") {
        let elBranch = el.branch;
        elBranch = String(elBranch).toLowerCase();
        let searchInput = searchBox;
        if (searchInput) searchInput = searchInput.toLowerCase();

        if (searchBox === "" || searchBox === null) {
          return el;
        } else if (elBranch.includes(searchInput)) {
          return el;
        }
      } else if (selectCategoryBankRelated === "ifsc") {
        let elifsc = el.ifsc;
        elifsc = String(elifsc).toLowerCase();
        let searchInput = searchBox;
        if (searchInput) searchInput = searchInput.toLowerCase();

        if (searchBox === "" || searchBox === null) {
          return el;
        } else if (elifsc.includes(searchInput)) {
          return el;
        }
      } else if (selectCategoryBankRelated === "bank_name") {
        let bankName = el.bank_name;
        bankName = String(bankName).toLowerCase();
        let searchInput = searchBox;
        if (searchInput) searchInput = searchInput.toLowerCase();

        if (searchBox === "" || searchBox === null) {
          return el;
        } else if (bankName.includes(searchInput)) {
          return el;
        }
      }
    });
  }

  // Creating requirePage for showing no require page in UI

  let requirePage;

  if (arrBankDetails) {
    requirePage = Math.ceil(arrBankDetails.length / rowPerPage);
    let firstIndex = (currentPage - 1) * rowPerPage;
    let lastIndex = Math.min(arrBankDetails.length, currentPage * rowPerPage);
    arrBankDetails = arrBankDetails.slice(firstIndex, lastIndex);
  }

  return (
    <>
      <optionsBankDataFavBanks.Provider
        value={{
          selectedCity,
          setSelectedCity,
          searchBox,
          setSearchBox,
          searchBox,
          setSearchBox,
          currentPage,
          setCurrentPage,
          selectCategoryBankRelated,
          setSelectCategoryBankRelated,
        }}
      >
        <SearchBox />
      </optionsBankDataFavBanks.Provider>

      {/* Creating table Divided into 2 part one head and 
        Another is for Data Table Which is fetched from Given GROWW link*/}

      {/* PART ONE OF CREATING TABLE - HEAD*/}

      <div className="tableDataDisplayScreen-mainBody">
        <div className="tableDataDisplayInnerScreen">
          <div className="tableDataDisplay-tableContainer">
            <div className="tableDataDisplay-tableHead">
              <div className="tableDataDisplay-tableHead-box1">Bank Name</div>
              <div className="tableDataDisplay-tableHead-box2">IFSC</div>
              <div className="tableDataDisplay-tableHead-box2">Branch</div>
              <div className="tableDataDisplay-tableHead-box2">Bank ID</div>
              <div className="tableDataDisplay-tableHead-box3">Address </div>
              <div className="tableDataDisplay-tableHead-box4">
                Add Favorites
              </div>
            </div>

            {/* PART two OF CREATING TABLE - TABLE ACCORDING TO DATA*/}

            {arrBankDetails
              ? arrBankDetails.map((el, index) => {
                  return (
                    <div
                      className={`tableDataDisplay-tableHeadDataContainer ${
                        index % 2 === 0 ? "tableRow-color" : ""
                      }`}
                      key={index}
                    >
                      <div
                        className="tableDataDisplay-tableHead-box1-bankName"
                        onClick={() => {
                          value.setIndividualBankData(el);

                          history.push("/bank-details/{ifsc_code}");
                        }}
                      >
                        {el.bank_name}
                      </div>
                      <div className="tableDataDisplay-tableHead-box2-dataEntry">
                        {el.ifsc}
                      </div>
                      <div className="tableDataDisplay-tableHead-box2-dataEntry">
                        {el.branch}
                      </div>
                      <div className="tableDataDisplay-tableHead-box2-dataEntry">
                        {el.bank_id}
                      </div>
                      <div className="tableDataDisplay-tableHead-box3-Address">
                        {el.address}
                      </div>
                      <div className="tableDataDisplay-tableHead-box4-fav">
                        <div
                          className="favBox"
                          onClick={() => {
                            if (
                              value.favoriteBankData.hasOwnProperty([el.ifsc])
                            ) {
                              let arr = value.favoriteBankData;
                              delete arr[el.ifsc];
                              value.setFavoriteBankData(arr);

                              if (usingForRerender) {
                                setUsingForRerender(false);
                              } else {
                                setUsingForRerender(true);
                              }
                              return;
                            }
                            value.setFavoriteBankData({
                              ...value.favoriteBankData,
                              [el.ifsc]: el,
                            });
                          }}
                        >
                          {value.favoriteBankData.hasOwnProperty([el.ifsc])
                            ? "Remove"
                            : "Add"}
                        </div>
                      </div>
                    </div>
                  );
                })
              : "NO DATA FOUND - GIVE PROPER INPUT"}
          </div>

          {/* PAGE NAV SECTION */}

          <div className="tableDataDisplay-pageNav">
            <div className="pageNav-movieDownText">
              * Scroll Down To More View &nbsp; * Editable Row PerPage
              <br />
              * Editable :- Go To Any Page Directly
              <br />
            </div>

            <div className="pageNav-innerContainer">
              <span className="rowPerPage">
                Rows Per Page{" "}
                <span
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  onInput={(e) => {
                    // BECAUSE OF THIS CODE USER CAN ONLY CENTER NUMBER IN PAGENAV

                    let reg = /\d+/g;
                    let result = e.currentTarget.innerText.match(reg);
                    if (result === null) {
                      result = [0];
                    }
                    let actualNumber = parseInt(result[0]);
                    if (actualNumber < 1) {
                      actualNumber = 1;
                    }

                    setrowPerPage(actualNumber);
                    e.currentTarget.innerText = actualNumber;
                  }}
                >
                  {rowPerPage}
                </span>
              </span>

              <span
                className="material-icons-round previousBtn"
                onClick={(e) => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                arrow_drop_down
              </span>

              <span className="pageNav-rowText">
                <span
                  className="goToDirectPage"
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  onInput={(e) => {
                    let reg = /\d+/g;
                    let result = e.currentTarget.innerText.match(reg);
                    if (result === null) {
                      result = [0];
                    }
                    let actualNumber = parseInt(result[0]);
                    if (actualNumber < 1) {
                      actualNumber = 1;
                    }
                    if (actualNumber > requirePage) {
                      actualNumber = requirePage;
                    }
                    setCurrentPage(actualNumber);
                    e.currentTarget.innerText = actualNumber;
                  }}
                >
                  {String(currentPage)}
                </span>{" "}
                of {requirePage}
              </span>

              <span
                className="material-icons-round nextBtn"
                onClick={() => {
                  if (currentPage < requirePage) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              >
                arrow_drop_down
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritesDataDisplay;
