import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './sign-in.styles.scss';
const SignIn = () => {
  return (
    <div>
      <h1>Sign in Page</h1>
        <div className='authentication-container'>
          <SignInForm />
          <SignUpForm />
        </div>
    </div>
  );
};

export default SignIn;
