import axios from "axios"
import { loginStart, loginFailure, loginSuccess } from "./AuthActions"

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/api/auth/login", user);
        dispatch(loginSuccess(res.data));
    }
    catch (err) {
        console.log(err);
        dispatch(loginFailure())
    }
};