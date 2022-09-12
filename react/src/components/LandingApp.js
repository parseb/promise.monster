import LandingLogo from './LandingLogo';
import LandingDescription from './LandingDescription';
import LandingParagraph from './LandingParagraph';
import LoginBtnCol from './LoginBtnCol';

function LandingApp() {
    
    return(
        <div className="App">
        <header className="App-header"> 
        </header>
          <div className='container main-container'>
            <br />
            <LandingLogo />
            <LandingDescription />
            <hr className="landing"/>
            <hr className="landing"/>
            <hr className="landing"/>
            <div className='row'>
              <div className='col-6'>
                <LandingParagraph />
              </div>
              <div className='col-6'>
                <LoginBtnCol />
              </div>
            </div>
          </div>
        </div>
    )
}

export default LandingApp;