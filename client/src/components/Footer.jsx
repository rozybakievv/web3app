import { Link } from "react-router-dom";

const Footer = () => {
    const githubLink = "https://github.com/rozybakievv";
    return (
        <footer className="fixed bottom-0 p-6 w-full">
            <div className="flex justify-between">
                <span className="text-sm sm:text-center">© 2022 CrypteX™ by Guyass Rozybakiev. All Rights Reserved.</span>
                <ul className="flex flex-wrap items-center mt-3 text-sm sm:mt-0">
                    <li>
                        <a href={githubLink} target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6">About</a>
                    </li>
                    <li>
                        <Link to="/">
                            <span className="mr-4 hover:underline md:mr-6">Privacy Policy</span>
                        </Link>
                    </li>
                    <li>
                        <a href={githubLink} target="_blank" rel="noreferrer" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;