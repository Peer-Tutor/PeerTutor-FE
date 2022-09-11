import { Link } from "react-router-dom";
import styles from "src/style-sheet/global.module.css";

export default function NavBar() {
    return (
        <nav className="nav-bar text-2xl">
            <ul className="flex flex-row my-0">
                <li className="mr-5"><i className="text-xl mx-3 fa-regular fa-calendar-check"></i><Link to="/PageOne">PrimeReact Sample</Link></li>
                <li className="mr-5"><Link to="/PageTwo">Page One hi</Link></li>
            </ul>
        </nav>
    );
}