import {useEffect} from "react";

const RegisterPage = () => {

    useEffect(() => {
        document.title = 'Register Page';
    }, [])

    return (
        <>
            <h1 className="text-center">Register Page</h1>
        </>
    )
}
export default RegisterPage;