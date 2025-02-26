import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as StyleHiveLogo} from '../../assets/logo-style-hive.svg';
import './navigation.styles.scss';

const Navigation = () =>{
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
            </div>
        </div>
        <Outlet/>
      </Fragment>
    );
}
export default Navigation;