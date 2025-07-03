import {Navigate} from "react-router";
import type {JSX} from "react";

const PrivateRoute =({children}: {children: JSX.Element}) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/landing/login" replace/>;
    }

    return children;

}
export default PrivateRoute