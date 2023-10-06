import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const signup = async (name, email, password) => {
    const data = { name, email, password };

    try {
      setError(null);
      const response = await axios.post("http://localhost:5000/signup", data);
      const json = response.data;

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "Loggedin", payload: json });
      } else {
        setError("user signup unsuccessful");
      }

      console.log(json);
    } catch (error) {
      console.log(error);
      setError("An error occurred during signup.");
    }
  };

  return { signup, error };
};
