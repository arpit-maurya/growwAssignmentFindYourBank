import "./LoadingPage.css";

let LoadingPage = () => {
  return (
    <div className="loadingPage-container">
      <div className="loadingPage-inner-container">
        
        <div className="loadingAnimation-positionDiv">
          <div className="loadingAnimationDiv"></div>
        </div>
        <div className="loadingTextDiv">Loading</div>

      </div>
    </div>
  );
};

export default LoadingPage;