import LandingPageHeader from "./LandingPageHeader.tsx";
import {Outlet} from "react-router";

const LandingPageLayout = ({ children }: {children: React.ReactNode}) => {


    return (
        <>
            <LandingPageHeader />
            <div className="container mx-auto pt-24 min-h-screen bg-[url('/public/sporttickbg.png')] bg-cover bg-center pb-24">
                {children}
                <Outlet />
            </div>

        </>
    )
}
export default LandingPageLayout;