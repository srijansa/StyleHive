/*
    1. default Button
    2. Inverted Button
    3. Google Style Sign-In
*/
const Button = ({children, buttonType, ...OtherProps}) => {
    return(
        <button
            className = {`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...OtherProps} >
            {children}
        </button>
    );
};
export default Button;