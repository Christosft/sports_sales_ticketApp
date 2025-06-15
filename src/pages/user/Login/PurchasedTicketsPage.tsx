import {useEffect} from "react";

const PurchasedTicketsPage = () => {

    useEffect(() => {
        document.title = 'Checkout Page';
    }, [])

    return (
        <>
            <h1 className="text-center">Purchased Tickets</h1>
        </>
    )
}
export default PurchasedTicketsPage;