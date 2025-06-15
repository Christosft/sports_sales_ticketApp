import { Menu, X} from "lucide-react";
import {Link} from "react-router-dom";
import {useState} from "react";

const LandingPageHeader = () => {
    const [menu, setMenu] = useState(false);

    return (
        <>
            <header className="bg-black">
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
                        bg-black`}
                    >

                        <Link to="/landing/login" className="block md:inline hover:underline hover:underline-offset-4"
                              onClick={() => setMenu(false)}>Login</Link>
                        <Link to="/landing/register" className="block md:inline hover:underline hover:underline-offset-4"
                              onClick={() => setMenu(false)}>Register</Link>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default LandingPageHeader;