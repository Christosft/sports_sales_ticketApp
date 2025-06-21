import React from "react";
import MainHeader from "./MainHeader";
import Footer from "./Footer";


const eventSections = [
    { title: "Football Events", bg: "/football.jpg" },
    { title: "Basketball Events", bg: "/basketball.jpg" },
    { title: "Tennis Events", bg: "/tennis.jpg" },
];

const EventsPageLayout = ({ children }: { children: React.ReactNode }) => {
    // Normalize children to array
    const childrenArray = React.Children.toArray(children);

    return (
        <>
            <MainHeader />

            {eventSections.map((section, index) => (
                <section
                    key={index}
                    className="container mx-auto pt-24 min-h-screen bg-cover bg-center pb-24 text-white"
                    style={{ backgroundImage: `url('${section.bg}')` }}
                >
                    <div className="flex flex-col items-center justify-center bg-black/50 py-8 rounded-lg">
                        <h1 className="text-4xl font-bold mb-6">{section.title}</h1>
                        <div className="w-full max-w-4xl px-4">
                            {childrenArray[index] ?? <p>No content available.</p>}
                        </div>
                    </div>
                </section>
            ))}

            <Footer />
        </>
    );
};

export default EventsPageLayout;