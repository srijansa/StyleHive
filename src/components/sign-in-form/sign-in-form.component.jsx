import { useState } from "react";
import { signInAuthWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

// How we create a generic object and update it through useState :)
const SignInForm = () =>{
    const defaultFormFields = {
        email: '',
        password: '',
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password } = formFields;
    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = signInAuthWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
    } catch (error) {
      // if (error.code == 'auth/invalid-credential'){
      //   alert('Invalid Credentials');
      // }else{
      //   console.log('Sign-In with email and password', error.code);
      // }
      alert(error.code);
    }
  };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }
    const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    };
    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <form onSubmit={handleSubmit}>
                {/* <label>Display Name</label> */}
                {/* <FormInput label="Display Name" type="name" required onChange={handleChange} name='displayName' value={displayName}/> */}

                {/* <label>Email</label> */}
                <FormInput label="Email" type="email" required onChange={handleChange} name='email' value={email}/>

                {/* <label>Password</label> */}
                <FormInput label="Password" type="password" required onChange={handleChange} name='password' value={password}/>

                {/* <label>Confirm Password</label> */}
                {/* <FormInput label="Confirm Password" type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}/> */}
                <div className='buttons-container'>
                  <Button buttonType='submit'>Sign In</Button>
                  <Button type='button' buttonType='google' onClick={logGoogleUser}>Google SignIn</Button>
                </div>
            </form>
        </div>
    );
};
export default SignInForm;