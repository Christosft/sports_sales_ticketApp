import {useEffect} from "react";
import NewsletterForm from "../components/NewsletterForm.tsx";


const LandingPage = () => {

    useEffect(() => {
        document.title = 'Landing Page';
    }, [])


    return (
        <>
            <NewsletterForm />
        </>
    )
}
export default LandingPage;