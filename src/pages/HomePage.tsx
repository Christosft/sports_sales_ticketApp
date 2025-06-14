import {useEffect} from "react";


const HomePage = () => {

    useEffect(() => {
        document.title = 'Index Page';
    })


    return (
        <>
            <h1 className="font-bold text-8xl text-center text-black mt-8 mb-15">SPORT-TICK</h1>
            <div className="flex flex-wrap justify-around text-center mr-30 ml-30">
                <p className="text-black text-5xl font-bold mb-10">Your ticket for every sport event.</p>
                <p className="text-black text-4xl font-bold mb-10">Sport tick is an online ticket platform for sport events.</p>
                <p className="text-black text-4xl font-bold">Whether you are a passionate fan or searching for your next live experience.
                 Sport Tick is here to get you there!</p>
            </div>
        </>
    )
}
export default HomePage;