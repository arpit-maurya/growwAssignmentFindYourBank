/* ArpitMaurya - GROWW ASSIGNMENT */

import { createContext, useState, useEffect } from "react";
import TopNavBar from "./TopNavbar.jsx";
import DataDisplayScreen from "./DataDisplayScreen.jsx";
import "./App.css";
import LoadingPage from "./LoadingPage.jsx";
export const allRequiredDataDetails = createContext();

let App = () => {
  
  let [selected_allBanks_or_fav, setSelected_allBanks_or_fav] =
    useState("All Banks");
  let [banksDetails, setBankDetails] = useState(null);

  // useEffect is used for Fetching Data Once when page is loaded
  
  useEffect(() => {
    let run = async () => {
      let fetchBankDetails = await fetch(
        "https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI"
      );
      let details = await fetchBankDetails.json();
      setBankDetails(details);
    };
    run();
  }, []);

  return (
    <>
      {/* 

        * Conditional (ternary) operator is Used
        To Show LoadingPage and Actual Bank Data

        * If data is Fetched From Given GROWW Link DisplayScreen Will Be Shown 
          If Not Then Loading Page Will be shown

      */}

      {banksDetails ? (
        <div className="mainBody">
          <TopNavBar />
          <allRequiredDataDetails.Provider
            value={{
              selected_allBanks_or_fav,
              setSelected_allBanks_or_fav,
              banksDetails,
            }}
          >
            <DataDisplayScreen />
          </allRequiredDataDetails.Provider>
        </div>
     ) : (
         <LoadingPage />
     )}
    </>
  );
};

export default App;
