import { useEffect } from "react";
import { auth, signInWithGooglePopup, signInWithGoogleRedirect,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    // useEffect(async () =>{
    //     const response = await getRedirectResult(auth);

    //     if (response){
    //         // When we use google redirect the component redirects i.e. unmounts and then it comes again 
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }

    // }, []);

    const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    };

// const logGoogleRedirectUser = async() =>{
//     const { user } = await signInWithGoogleRedirect();
//     console.log({user});
// };
  return (
    <div>
      <h1>Sign in Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Pop-up</button>
      <SignUpForm />
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
    </div>
  );
};

export default SignIn;
