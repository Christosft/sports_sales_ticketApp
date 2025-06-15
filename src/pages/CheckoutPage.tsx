import {useEffect} from "react";

const CheckoutPage = () => {

    useEffect(() => {
        document.title = 'Checkout Page';
    }, [])

    return (
        <>
            <h1 className="text-center">Checkout Page</h1>
        </>
    )
}
export default CheckoutPage;