import {useEffect} from "react";
import RegisterForm from "../../../components/RegisterForm.tsx";

const RegisterPage = () => {

    useEffect(() => {
        document.title = 'Register Page';
    }, [])

    return (
        <>
            <RegisterForm />
        </>
    )
}
export default RegisterPage;