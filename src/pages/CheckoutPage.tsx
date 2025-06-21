import {useEffect} from "react";
import CheckoutForm from "../components/CheckoutForm.tsx";



const CheckoutPage = () => {

    useEffect(() => {
        document.title = 'Checkout Page';
    }, [])

    return (
        <>
                <div className="container mx-auto px-4 border-b border-gray-200">
                    <CheckoutForm />
                </div>
        </>
    );
};
export default CheckoutPage;