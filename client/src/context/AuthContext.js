import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

// Check if "user" exists in localStorage and parse it if it does
const userFromLocalStorage = localStorage.getItem("user");
if (userFromLocalStorage) {
  try {
    INITIAL_STATE.user = JSON.parse(userFromLocalStorage);
  } catch (error) {
    // Handle the error, e.g., by setting user to null
    INITIAL_STATE.user = null;
  }
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};