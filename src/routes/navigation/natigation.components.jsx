import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as StyleHiveLogo} from '../../assets/logo-style-hive.svg';
import { UserContext } from '../../context/user.context';
import './navigation.styles.scss';
import  {signOutUser} from '../../utils/firebase/firebase.utils';
const Navigation = () =>{
    const {currentUser, setCurrentUser} = useContext(UserContext);
    // console.log(currentUser+"hello");
    const signOutHandler = async () => {
        const res = await signOutUser(); 
        setCurrentUser(null);
    }
    return(
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <StyleHiveLogo className='logo'/>
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/'>
                    SHOP
                </Link>
                { currentUser ? (<span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>) : (<Link className='nav-link' to='/sign-in'>SIGN IN</Link>)}
            </div>
        </div>
        <Outlet/>
      </Fragment>
    );
}
export default Navigation;