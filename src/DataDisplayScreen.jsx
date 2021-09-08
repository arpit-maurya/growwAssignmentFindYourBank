import "./DataDisplayScreen.css";
import { createContext, useState } from "react";
import AllBanksDataDisplay from "./AllBanksDataDisplay.jsx";
import { BrowserRouter as Router, Switch, Route ,Redirect} from "react-router-dom";
import LeftNavBar from "./LeftNavBar.jsx";
import FavoritesDataDisplay from "./FavoritesDataDisplay.jsx";
import IndividualBank from "./IndividualBank.jsx";

export const favBankData = createContext();

let DataDisplayScreen = () => {
  /* 
  
  * Storing Data For Favorite Bank And Individual Bank from 
  AllBanksDataDisplay (Component) By clicking On Add Button and BankName-Box
   
  */

  let [favoriteBankData, setFavoriteBankData] = useState({});
  let [individualBankData, setIndividualBankData] = useState(null);

  return (
    <>
      {/* 

        * Using Router>Switch To Render or Re-Render Different Component In Different 
        Selected Option By User 

        * Sending Data To Different Component By Using CONTEXT - HOOKS
        
      */}

      <Router>
        <Switch>
          <div className="main-grid-container">
            <LeftNavBar />

            <favBankData.Provider
              value={{
                favoriteBankData,
                setFavoriteBankData,
                individualBankData,
                setIndividualBankData,
              }}
            >
              <div className="DataDisplayScreen-mainBody">
                <Route exact path="/">
                  <Redirect to="/all-banks"/>
                </Route>
                <Route exact path="/all-banks">
                  <AllBanksDataDisplay />
                </Route>

                <Route exact path="/favorites">
                  <FavoritesDataDisplay />
                </Route>
              </div>

              <Route exact path="/bank-details/{ifsc_code}">
                <IndividualBank />
              </Route>
            </favBankData.Provider>
          </div>
        </Switch>
      </Router>
    </>
  );
};
export default DataDisplayScreen;
