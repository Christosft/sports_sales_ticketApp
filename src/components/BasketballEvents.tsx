import {useEffect, useState} from "react";

type Event = {
    id: number;
    name: string;
    location: string;
    date: string;
    availableTickets: number;
    price: number;
}

type TicketCounts = {
    [eventId: number]: number;
}

const BasketballEvents = () => {


    const [events, setEvents] = useState<Event[]>([]);
    const [ticketCounts, setTicketCounts] = useState<TicketCounts>({});

    useEffect(() => {
        fetch("http://localhost:3001/events/basketball")
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.log("Error fetching events:", err));
    }, []);

    const increaseCount = (eventId: number) => {
        setTicketCounts((prev) => {
            const current = prev[eventId] || 0;
            const maxTickets = events.find((e) => e.id === eventId)?.
                availableTickets ?? 0;

            if(current < maxTickets) {
                return {...prev, [eventId]: current + 1};
            }
            return prev;
        })
    }

    const decreaseCount = (eventId: number) => {
        setTicketCounts((prev) => {
            const current = prev[eventId] || 0;
            if (current > 0) {
                return { ...prev, [eventId]: current - 1 };
            }
            return prev;
        });
    };


    const resetCount = (eventId: number) => {
        setTicketCounts((prev) => ({ ...prev, [eventId]: 0 }))
    };

    const handleAddToCart = async (eventId: number) => {
        const count = ticketCounts[eventId] || 0;
        if (count === 0) return;

        try {
            const res = await fetch("http://localhost:3001/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventId,
                    quantity: count,
                })
            })

            const data = await res.json();

            if (data.success) {

                setEvents((prevEvents) =>
                    prevEvents.map((event) =>
                        event.id === eventId
                            ? { ...event, availableTickets: event.availableTickets - count }
                            : event
                    )
                );
                setTicketCounts((prev) => ({ ...prev, [eventId]: 0 }));
                alert(`${count} Tickets reserved successfully`);
            } else {
                alert("Reservation failed: " + (data.message || "unknown error"));
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
            alert("Something went wrong while reserving tickets.");
        }
    };

    return (
        <div className="space-y-4">
            {events.map((event) => {
                const count = ticketCounts[event.id] || 0;
                return (
                    <div
                        key={event.id}
                        className="bg-white text-black rounded-lg shadow-md"
                    >
                        <h2 className="text-xl font-semibold">{event.name}</h2>
                        <p>Date: {event.date}</p>
                        <p>Location: {event.location}</p>
                        <p>Available Tickets: {event.availableTickets}</p>
                        <p>Price: {event.price}</p>

                        <div className="mt-4 flex justify-end items-center gap-4 mr-4">
                            <p>Selected Tickets: {count}</p>                            <button
                            type="button"
                            className="px-3 py-1 bg-gray-300 rounded"
                            onClick={() => decreaseCount(event.id)}
                            disabled={count === 0}
                        >
                            -
                        </button>

                            <button
                                type="button"
                                className="px-3 py-1 bg-gray-300 rounded"
                                onClick={() => increaseCount(event.id)}
                                disabled={count >= event.availableTickets}
                            >
                                +
                            </button>

                            <button
                                type="button"
                                className="px-3 py-1 bg-gray-300 rounded"
                                onClick={() => resetCount(event.id)}
                                disabled={count === 0}
                            >
                                reset
                            </button>

                            <button
                                type="button"
                                className="px-3 py-1 bg-blue-600 text-white rounded"
                                onClick={() => handleAddToCart(event.id)}
                                disabled={count === 0}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default BasketballEvents;