import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

// How we create a generic object and update it through useState :)
const SignUpForm = () =>{
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }


    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword } = formFields;
    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user);
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }
    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up using your email and password</span>
            <form onSubmit={handleSubmit}>
                {/* <label>Display Name</label> */}
                <FormInput label="Display Name" type="name" required onChange={handleChange} name='displayName' value={displayName}/>

                {/* <label>Email</label> */}
                <FormInput label="Email" type="email" required onChange={handleChange} name='email' value={email}/>

                {/* <label>Password</label> */}
                <FormInput label="Password" type="password" required onChange={handleChange} name='password' value={password}/>

                {/* <label>Confirm Password</label> */}
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};
export default SignUpForm;