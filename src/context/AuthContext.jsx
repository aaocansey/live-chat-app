import React, { useEffect } from "react";
import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "Loggedin":
      return { user: action.payload };
    case "Logout":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user) {
      dispatch({type:'Loggedin', payload:user})
    }
  }, [])
  console.log('auth state', state)
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
    
  );
};
