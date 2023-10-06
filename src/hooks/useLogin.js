import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate()
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const login = async (name, password) => {
    const data = { name, password };

    try {
      setError(null);
      const response = await axios.post("http://localhost:5000/login", data);
      const json = response.data;

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "Loggedin", payload: json });
        navigate("/chat");
      } else {
        setError("user signup unsuccessful");
      }

    //   console.log(json);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return { login, error };
};
