import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/natigation.components';
import Home from "./routes/home/home.component";
import SignIn from './routes/sign-in/sign-in.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/> 
        <Route path='shop/*' element={<Shop/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
        <Route path='checkout' element= {<Checkout/>}/>
      </Route>
    </Routes>
  );
}

export default App;
