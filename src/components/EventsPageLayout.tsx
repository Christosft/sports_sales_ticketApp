import { Outlet } from "react-router";
import MainHeader from "./MainHeader";
import Footer from "./Footer.tsx";

const eventSections = [
    { title: 'Football Events', bg: "/football.jpg" },
    { title: 'Basketball Events', bg: "/basketball.jpg" },
    { title: 'Tennis Events', bg: "/tennis.jpg" },
];

const EventsPageLayout = ({ children }: {children: React.ReactNode}) => {


    return (
        <>
            <MainHeader />
                    {eventSections.map((section, index) => (
                        <div
                            key={index}
                            className="container mx-auto pt-24 min-h-screen bg-cover bg-center pb-24 flex items-center justify-center text-white"
                            style={{ backgroundImage: `url('${section.bg}')` }}
                        >
                            <h1 className="text-4xl font-bold bg-black/50 px-6 py-4 rounded-lg">
                                {section.title}
                            </h1>
                        </div>
            ))}
                    {children}
                    <Outlet />
            <Footer />
        </>
    )
}
export default EventsPageLayout;