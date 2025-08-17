import {useEffect} from "react";
import PrivateDetails from "../components/PrivateDetails.tsx";

const UserDetails = () => {

    useEffect(() => {
        document.title = "User Details Page";
    }, []);


    return (
        <>
            <PrivateDetails />


        </>
    )
}
export default UserDetails;