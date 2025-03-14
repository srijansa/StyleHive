import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as StyleHiveLogo} from '../../assets/logo-style-hive.svg';
// import { UserContext } from '../../context/user.context';
import './navigation.styles.scss';
import  {signOutUser} from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../context/cart.context';
import { useSelector } from 'react-redux';

const Navigation = () =>{
    const currentUser = useSelector((state)=> state.user.currentUser);
    // const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    // console.log(currentUser+"hello");
    // const signOutHandler = async () => {
    //     const res = await signOutUser(); 
    //     setCurrentUser(null);
    // }
    return(
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <StyleHiveLogo className='logo'/>
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                { currentUser ? (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>) : (<Link className='nav-link' to='/sign-in'>SIGN IN</Link>)}
                {<CartIcon/>}
            </div>
            {isCartOpen && <CartDropdown/>}
        </div>
        <Outlet/>
      </Fragment>
    );
}
export default Navigation;