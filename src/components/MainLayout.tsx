
import {Outlet} from "react-router";
import MainHeader from "./MainHeader.tsx";
import Footer from "./Footer.tsx";

const LandingPageLayout = ({ children }: {children: React.ReactNode}) => {


    return (
        <>
            <MainHeader />
            <div className="container mx-auto pt-24 min-h-screen bg-[url('/homepagebg.png')] bg-cover bg-center pb-24">
                {children}
                <Outlet />
            </div>
            <Footer />

        </>
    )
}
export default LandingPageLayout;