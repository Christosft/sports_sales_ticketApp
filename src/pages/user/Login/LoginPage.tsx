import {useEffect} from "react";

const LoginPage = () => {

    useEffect(() => {
        document.title = 'Login Page';
    }, [])

    return (
        <>
            <h1 className="text-center">Login Page</h1>
        </>
    )
}
export default LoginPage;