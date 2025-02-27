import { useState } from "react";

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
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }
    return(
        <>
            <h1>Sign up using your email and password</h1>
            <form>
                <label>Display Name</label>
                <input type="name" required onChange={handleChange} name='dispalyName'/>

                <label>Email</label>
                <input type="email" required onChange={handleChange} name='email'/>

                <label>Password</label>
                <input type="password" required onChange={handleChange} name='password'/>

                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name='confirmPassword'/>

                <button type="submit">Sign Up</button>
            </form>
        </>
    );
};
export default SignUpForm;