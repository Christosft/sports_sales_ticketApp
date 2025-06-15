import {useEffect} from "react";
import LoginForm from "../../../components/LoginForm.tsx";

const LoginPage = () => {


    useEffect(() => {
        document.title = 'Login Page';
    }, [])

    return (
        <>
            <LoginForm />
        </>
    )
}
export default LoginPage;