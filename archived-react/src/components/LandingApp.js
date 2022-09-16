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
                <br />
              </div>
              <hr className="landing"/>
            <hr className="landing"/>
            <hr className="landing"/>
            <hr className="landing"/>
            <hr className="landing"/>
            <hr className="landing"/>
            <hr className="landing"/>
            <hr className="landing"/>
            <hr className="landing"/>
            <hr className="landing"/>
            <br />
            </div>

            <p className='text text-muted'>inspired by <a href="https://github.com/delegatable/delegatable-eth">delegatable-eth</a> framework by Dan Finlay</p>
          </div>
        </div>
    )
}

export default LandingApp;