import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { PayementFormContainer, FormContainer } from './payment-form.styles';

const PaymentForm = () =>{
    return (
        <PayementFormContainer>
            <FormContainer>
                <h2>Credit Card Payment</h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
            </FormContainer>
        </PayementFormContainer>
    )
}
export default PaymentForm;