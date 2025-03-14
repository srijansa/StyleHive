import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/natigation.components';
import Home from "./routes/home/home.component";
import SignIn from './routes/sign-in/sign-in.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect( () =>{
      const unsubscribe = onAuthStateChangedListener((user)=>{
          console.log(user);
          if (user){
              createUserDocumentFromAuth(user);
          }
          dispatch(setCurrentUser(user));
      });
      return unsubscribe;
  }, [dispatch]);
  
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
