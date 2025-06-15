import {useEffect} from "react";

const EventsDetailsPage = () => {

    useEffect(() => {
        document.title = 'Event Details Page';
    }, [])

    return (
        <>
            <h1 className="text-center">Events Details</h1>
        </>
    )
}
export default EventsDetailsPage;