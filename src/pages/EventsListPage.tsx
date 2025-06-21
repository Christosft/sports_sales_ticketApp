import {useEffect} from "react";
import EventsPageLayout from "../components/EventsPageLayout.tsx";
import FootballEvents from "../components/FootballEvents.tsx";
import BasketballEvents from "../components/BasketballEvents.tsx";
import TennisEvents from "../components/TennisEvents.tsx";


const EventsListPage = () => {

    useEffect(() => {
        document.title = 'Events List Page';
    }, []);

    return (
        <EventsPageLayout>
                <FootballEvents />
                <BasketballEvents />
                <TennisEvents />
        </EventsPageLayout>
    );
};

export default EventsListPage;