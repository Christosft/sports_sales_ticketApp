import {useEffect, useRef, useState} from "react";

const videos = [
    "/videos/basketball.mp4",
    "/videos/football.mp4",
    "/videos/running.mp4",
    "/videos/tennis.mp4",
    "/videos/surf.mp4",
    "/videos/ski.mp4",
];

const HomeEntranceVideos = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isNextLoaded, setIsNextLoaded] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [hidden, setHidden] = useState(false);

    const videoRefA = useRef<HTMLVideoElement | null>(null);
    const videoRefB = useRef<HTMLVideoElement | null>(null);

    const [useA, setUseA] = useState(true);

    const handleVideoEnd = () => {
        if (currentIndex < videos.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setUseA((prev) => !prev);
            setIsNextLoaded(false);
        } else {
            setFadeOut(true);
            setTimeout(() => setHidden(true), 1000);
        }
    };

    useEffect(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < videos.length) {
            const preloadVideo = useA ? videoRefB.current : videoRefA.current;
            if (preloadVideo) {
                preloadVideo.src = videos[nextIndex];
                preloadVideo.load();
                preloadVideo.oncanplaythrough = () => {
                    setIsNextLoaded(true);
                };
            }
        }
    }, [currentIndex, useA]);

    const handleSkip = () => {
        setFadeOut(true);
        setTimeout(() => setHidden(true), 500);
    };

    if (hidden) return null;

    // const currentVideo = useA ? videoRefA : videoRefB;
    // const nextVideo = useA ? videoRefB : videoRefA;

    return (
        <div
            className={`fixed top-0 left-0 w-full h-screen z-50 transition-opacity duration-1000 ${
                fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
            <video
                key={currentIndex} // προκαλεί reload του στοιχείου όταν αλλάζει index
                ref={videoRefA}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                    useA ? "opacity-100 z-20" : "opacity-0 z-10"
                }`}
                src={videos[currentIndex]}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
            />

            <video
                key={currentIndex} // προκαλεί reload του στοιχείου όταν αλλάζει index
                ref={videoRefB}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                    useA ? "opacity-100 z-20" : "opacity-0 z-10"
                }`}
                src={videos[currentIndex]}
                autoPlay
                muted
                playsInline
                />

            <button
                onClick={handleSkip}
                className="absolute bottom-6 right-6 bg-black/60 text-white px-4 py-2 rounded hover:bg-black/80 transition z-50"
            >
                Skip
            </button>
        </div>
    );
};

export default HomeEntranceVideos;