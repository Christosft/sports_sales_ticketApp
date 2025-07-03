import {useEffect, useState} from "react";

const images = [
    "/entrance_pictures/basketball1.jpg",
    "/entrance_pictures/basketball3.jpg",
    "/entrance_pictures/basketball4.jpg",
    "/entrance_pictures/basketball5.jpg",
    "/entrance_pictures/basketball6.jpg",
    "/entrance_pictures/football1.jpg",
    "/entrance_pictures/football2.jpg",
    "/entrance_pictures/football3.jpg",
    "/entrance_pictures/football4.jpg",
    "/entrance_pictures/football5.jpg",
    "/entrance_pictures/football6.jpg",
    "/entrance_pictures/tennis1.jpg",
    "/entrance_pictures/tennis2.jpg",
    "/entrance_pictures/tennis3.jpg",
];

const HomeEntrancePictures = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [hidden, setHidden] = useState(false);


    useEffect(() => {
        if (currentIndex < images.length - 1) {
            const timeout = setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 3000);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setFadeOut(true)
                setTimeout(() => setHidden(true), 1000);
            }, 3000);
            return () => clearTimeout(timeout);
                }
    }, [currentIndex]);

    const handleSkip = () => {
        setFadeOut(true);
        setTimeout(() => setHidden(true), 500);
    };

    if (hidden) return null;


    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-1000 ${
                fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
            <div className="relative max-w-3xl w-full max-h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-1000">
                <img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt="entrance pictures"
                    className="w-full h-full object-contain transition-opacity duration-1000"
                    />

                <button
                    onClick={handleSkip}
                    className="absolute bottom-6 right-6 bg-black/60 text-white px-4 py-2 rounded hover:bg-black/80 transition z-50"
                >
                    Skip
                </button>
            </div>
        </div>
    );
};

export default HomeEntrancePictures;