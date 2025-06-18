const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <>
            <header className="bg-neutral-100">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-10">

                    <div className="ml-10">
                        <h3 className="font-serif italic mb-4">Shop</h3>
                        <ul className="space-y-2">
                            <li><a href="#">Events</a></li>
                        </ul>
                    </div>

                    <div className="ml-10">
                        <h3 className="font-serif italic mb-4">Culture</h3>
                        <ul className="space-y-2">
                            <li><a href="#">Our blog</a></li>
                            <li><a href="#">Our videos</a></li>
                        </ul>
                    </div>

                    <div className="ml-10">
                        <h3 className="font-serif italic mb-4">Customer</h3>
                        <ul className="space-y-2">
                            <li><a href="#">Account</a></li>
                            <li><a href="#">Warranty</a></li>
                            <li><a href="#">FAQ'S</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    <div className="ml-10">
                        <h3 className="font-serif italic mb-4">Follow us</h3>
                        <ul className="space-y-2">
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Spotify</a></li>
                            <li><a href="#">Facebook</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8">
                    <div className="container mx-auto text-center text-sm text-gray-600 py-4">
                        Copyright © {currentYear}, Sport-Tick. All rights reserved
                    </div>
                </div>
            </header>
        </>
    )
}
export default Footer;