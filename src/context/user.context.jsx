import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    setCurrentUser : () => null,
    currentUser: null
});

const userReducer = (state, action) => {
    const {type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER : 'SET_CURRENT_USER'
};

const INITIAL_STATE = {
    currentUser: null,
}

export const UserProvider = ({ children }) => {
    // const [ currentUser, setCurrentUser ] = useState(null);
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
    
    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }

    const value = { currentUser, setCurrentUser };
    useEffect( () =>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            console.log(user);
            if (user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);
    return <UserContext.Provider value = {value}>
        { children }
    </UserContext.Provider>
}

/*
const userReducer = (state, action) => {
    return{
        currentUser : 
    }
}
*/