import LandingPageHeader from "./LandingPageHeader.tsx";
import {Outlet, useLocation} from "react-router";
import Footer from "./Footer.tsx";

const LandingPageLayout = ({ children }: {children: React.ReactNode}) => {

    const location = useLocation();
    const isAuthPage = location.pathname.includes("/landing/login") || location.pathname.includes("/landing/register");

    const containerClasses = isAuthPage
        ?"container mx-auto pt-24 min-h-screen bg-[url('/homepagebg.png')] bg-cover bg-center pb-24\""
        :"container mx-auto pt-24 min-h-screen bg-[url('/sporttickbg.png')] bg-cover bg-center pb-24\""

    return (
        <>
            <LandingPageHeader />
            <div className={containerClasses}>
                {children}
                <Outlet />
            </div>
            <Footer />

        </>
    )
}
export default LandingPageLayout;