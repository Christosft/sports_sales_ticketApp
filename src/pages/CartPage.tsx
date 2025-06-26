import {useEffect} from "react";
import Cart from "../components/Cart.tsx";

const CartPage = () => {


    useEffect(() => {
        document.title = 'Cart Details Page';
    }, [])

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">🛒 Cart</h1>
                <Cart />
            </div>
        </>
    )
}
export default CartPage;