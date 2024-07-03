import axios from "axios";
import Cookie from "universal-cookie";

import {clearUser, setUser} from '../features/userSlice';
import { useAppDispatch } from "../app/hooks";

const cookie = new Cookie();

const useAuth = () => {
  const dispatch = useAppDispatch();
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post("http://localhost:8081/auth/login", {
      email,
      password,
    });
    const {token, user} = response.data;
    dispatch(setUser({
      email: user.email,
      username: user.username
    }));
    cookie.set("session_token", token);
    return response.data;
  };

  const signup = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    const response = await axios.post("http://localhost:8081/auth/signup", {
      email,
      password,
      username,
    });
    const {token, user} = response.data;
    dispatch(setUser({
      email: user.email,
      username: user.username
    }));
    cookie.set("session_token", token);
    return response.data;
  };

  const fetchUser = async () => { 
    const sessionToken = cookie.get("session_token");
    try {
    const response = await axios.get("http://localhost:8081/auth/me", {
      headers: {
        ...(sessionToken ? {Authorization: `Bearer ${sessionToken}`} : null)
      }
    });
    const user = response.data;
    if (!user) {
      return dispatch(clearUser());
    }
    dispatch(setUser({
      email: user.email,
      username: user.username
    }));
    } catch(error) {
      return dispatch(clearUser());
    }

  };

  const logout = () => {
    cookie.remove("session_token");
    return dispatch(clearUser());
  }

  return { signup, login, logout, fetchUser };
};

export default useAuth;