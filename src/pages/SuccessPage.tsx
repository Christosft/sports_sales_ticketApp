import {useEffect} from "react";

const SuccessPage =() => {

    useEffect(() => {
        document.title = 'Success Page';
    }, []);

    return (
        <>
            <h1 className="text-center">Register Page</h1>
        </>
    )
}
export default SuccessPage;