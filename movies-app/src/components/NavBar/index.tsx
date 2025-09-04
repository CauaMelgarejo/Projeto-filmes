import './index.scss';
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="navbar">
            <Link href={"/"} className='link'><h1 className="page-title">Filmes</h1></Link>
        </nav>
    );
}