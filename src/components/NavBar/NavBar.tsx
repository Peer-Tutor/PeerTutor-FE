import { Link } from "react-router-dom";
import styles from "src/style-sheet/global.module.css";

export default function NavBar() {
    return (
        <nav className="nav-bar text-2xl">
            <ul className="flex flex-row align-items-center my-0">
                <li className="flex mr-5"><Link to="/">LOGO</Link></li>
                <li className="flex align-items-center mr-5">
                    <i className="text-xl mr-3 fa-solid fa-book"></i>
                    <Link to="/PrimeReact-Component">PrimeReact Sample</Link>
                </li>
                <li className="flex align-items-center mr-5">
                    <i className="text-xl mr-3 fa-regular fa-calendar-check"></i>
                    <Link to="/ManageSessions">Manage Sessions</Link>
                </li>
                <li className="flex flex-grow-1 align-items-center mr-5">
                    <i className="text-xl mr-3 fa-solid fa-id-card"></i>
                    <Link to="/AccountManagement">Account Management</Link>
                </li>
                <li className="flex mx-3 text-3xl" >|</li>
                <li className="flex mx-2"><i className="text-3xl fa-regular fa-circle-user"></i></li>
                <li className="flex mx-3 flex-column">
                    <label className="text-lg font-semibold">TAN KENG JUN</label>
                    <label className="text-sm font-normal">Peer Account</label>
                </li>
                <li className="flex ml-5 mr-2"><i className="fa-solid fa-right-from-bracket"></i></li>
            </ul>
        </nav>
    );
}