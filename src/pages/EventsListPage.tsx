import {useEffect} from "react";

const EventsListPage = () => {

    useEffect(() => {
        document.title = 'Events List Page';
    }, [])

    return (
        <>
            <h1 className="text-center">Events List</h1>
        </>
    )
}
export default EventsListPage;