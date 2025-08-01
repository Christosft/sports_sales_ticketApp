import { Menu, X} from "lucide-react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const LandingPageHeader = () => {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout =() => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    }

    return (
        <>
            <header className="bg-blue-500">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <img
                        className="my-4 h-16"
                        src="/sports_tick.png"
                        alt="sports_tick"/>

                    <button
                        aria-label="Toggle menu"
                        className="text-white md:hidden"
                        onClick={() => setMenu(!menu)}
                    >
                        { menu ? <X size={36} /> : <Menu size="36" /> }

                    </button>

                    <nav
                        className={`${
                            menu ? "block" : "hidden"
                        } md:flex gap-4  text-white absolute top-28 left-0 w-full md:w-auto md:static p-4 md:p-0
                        bg-blue-500`}
                    >

                        <Link to="/home" className="block md:inline hover:underline hover:underline-offset-4"
                              onClick={() => setMenu(false)}>Home</Link>
                        <Link to="/home/events" className="block md:inline hover:underline hover:underline-offset-4"
                              onClick={() => setMenu(false)}>Events</Link>
                        <Link to="/home/cart" className="block md:inline hover:underline hover:underline-offset-4"
                              onClick={() => setMenu(false)}>Cart</Link>
                        <Link to="/home/subscribe" className="block md:inline hover:underline hover:underline-offset-4"
                              onClick={() => setMenu(false)}>Subscribe</Link>
                        <button
                            onClick={() => {
                                setMenu(false);
                                handleLogout();
                            }}
                            className="block md:inline hover:underline hover:underline-offset-4 text-left"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default LandingPageHeader;