import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

type Ticket = {
    id: number;
    name: string;
    location: string;
    date: string;
    events_id: number;
    price: number;
    status: string;
}

const Cart = () => {

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [canceling, setCanceling] = useState(false);
    const [canceledTickets, setCanceledTickets] = useState<Ticket[]>([]);


    useEffect(() => {
        fetch("http://localhost:3001/cart")
            .then(res => res.json())
            .then(data => {
                setTickets(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load cart tickets:", err);
                setLoading(false);
            });
    }, []);

    const total = tickets.reduce((sum, ticket) => sum + ticket.price, 0);

    const handleCancel = async () => {
        if (tickets.length === 0) return [];

        setCanceling(true);

        try {
            const res = await fetch("http://localhost:3001/cart/cancel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ticketIds: tickets.map(t => t.id) }),
            });

            const data = await res.json();
            console.log("Returned from backend:", data);

            if (data.success) {
                setTickets([]);
                setCanceledTickets(data.tickets || []);
            } else {
                console.error("Cancel failed", data);
            }
        } catch (err) {
            console.error("Error canceling tickets:", err);
        } finally {
            setCanceling(false);
        }
    };

        const navigate = useNavigate();

        const handleCheckout = () => {
            navigate("/cart/checkout");
        }

    return (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : tickets.length === 0 ? (
                    <p>No reserved tickets in cart.</p>
                ) : (
                    <div className="space-y-4">
                        {tickets.map(ticket => (
                            <div key={ticket.id} className="border rounded p-4">
                                <p><strong>Ticket ID:</strong> {ticket.id}</p>
                                <p><strong>Description:</strong> {ticket.name}</p>
                                <p><strong>Location:</strong> {ticket.location}</p>
                                <p><strong>Game Date:</strong> {ticket.date}</p>
                                <p><strong>Event ID:</strong> {ticket.events_id}</p>
                                <p><strong>Price:</strong> €{ticket.price.toFixed(2)}</p>
                            </div>
                        ))}
                        <div className="text-right mt-6 text-lg font-semibold">
                            Total: €{total.toFixed(2)}
                        </div>

                        {canceledTickets.length > 0 && (
                            <div className="mt-6">
                                <h2 className="font-semibold text-lg">Canceled Tickets:</h2>
                                <ul className="list-disc ml-5 mt-2">
                                    {canceledTickets.map(ticket => (
                                        <li key={ticket.id}>
                                            #{ticket.id} — {ticket.name} ({ticket.status})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="text-right mt-4">
                            <button
                                type="button"
                                onClick={handleCheckout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Checkout
                            </button>
                        </div>

                        <div className="text-right mt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={canceling || tickets.length === 0}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                {canceling ? "Canceling..." : "Cancel Tickets"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
export default Cart;