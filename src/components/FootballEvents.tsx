import {useState} from "react";

type TicketCounts = {
    [eventId: number]: number;
}

const FootballEvents = () => {


    const [ticketCounts, setTicketCounts] = useState<TicketCounts>({});

        const [events, setEvents] = useState([
            {
                id: 1,
                title: "Olympiacos vs Fiorentina",
                date: "2024-05-29",
                location: "Athens Olympic Stadium",
                availableTickets: 50,
                price: 100,
            },
            {
                id: 2,
                title: "Real Madrid vs Barcelona",
                date: "2024-06-10",
                location: "Santiago Bernabéu",
                availableTickets: 50,
                price: 50,
            },
        ]);

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

    const handleAddToCart = (eventId: number) => {
        const count = ticketCounts[eventId] || 0;
        if (count === 0) return;

        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === eventId
                    ? {...event, availableTickets: event.availableTickets - count}
                    : event
            )
        );

        setTicketCounts((prev) => ({...prev, [eventId]: 0}));

        alert(`${count} Tickets added to cart`);
    }

    return (
        <div className="space-y-4">
            {events.map((event) => {
                const count = ticketCounts[event.id] || 0;
                return (
                    <div
                        key={event.id}
                        className="bg-white text-black rounded-lg shadow-md"
                        >
                        <h2 className="text-xl font-semibold">{event.title}</h2>
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

export default FootballEvents;