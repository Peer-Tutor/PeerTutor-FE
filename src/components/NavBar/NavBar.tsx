import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav
            style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem",
            }}
        >
            <Link to="/PageOne">Page One hi</Link> 
            <Link to="/PageTwo">Page Two</Link>
        </nav>
    );
}