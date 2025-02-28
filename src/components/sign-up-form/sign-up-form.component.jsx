import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { Button } from '../button/button.component';
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
        if (password != confirmPassword){
            alert('Passwords do not match! ');
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            console.log(user);
            await createUserDocumentFromAuth(user, { displayName});
            resetFormFields();
        }catch(error){
            if (error.code == 'auth/email-already-in-use'){
                alert('Email already in use.');
            }else{
                console.log('user creation failed for user with email and password ->', error);
            }
        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }
    return(
        <>
            <h1>Sign up using your email and password</h1>
            <form onSubmit={()=> { }}>
                <label>Display Name</label>
                <input type="name" required onChange={handleChange} name='dispalyName' value={dispalyName}/>

                <label>Email</label>
                <input type="email" required onChange={handleChange} name='email' value={email}/>

                <label>Password</label>
                <input type="password" required onChange={handleChange} name='password' value={password}/>

                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

                <Button >Sign Up</Button>
            </form>
        </>
    );
};
export default SignUpForm;