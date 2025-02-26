import { Outlet } from 'react-router-dom';

const Navigation = () =>{
    return(
      <>
        <div>
          <h1>Navigation Bar</h1>
        </div>
        <Outlet/>
      </>
    );
}
export default Navigation;