import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as StyleHiveLogo} from '../../assets/logo-style-hive.svg';
import { UserContext } from '../../context/user.context';
import './navigation.styles.jsx';
import  {signOutUser} from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../context/cart.context';
import { LogoContainer, NavigationContainer, NavLinks, NavLin } from './navigation.styles.jsx';

const Navigation = () =>{
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    // console.log(currentUser+"hello");
    // const signOutHandler = async () => {
    //     const res = await signOutUser(); 
    //     setCurrentUser(null);
    // }
    return (
        <Fragment>
          <NavigationContainer>
            <LogoContainer to='/'>
            <StyleHiveLogo className='logo'/>
            </LogoContainer>
            <NavLinks>
              <NavLin  to='/shop'>SHOP</NavLin>
    
              {currentUser ? (
                <NavLin  onClick={signOutUser}>
                  SIGN OUT
                </NavLin>
              ) : (
                <NavLin to='/sign-in'>SIGN IN</NavLin>
              )}
              <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
          </NavigationContainer>
          <Outlet />
        </Fragment>
    );
}
export default Navigation;
