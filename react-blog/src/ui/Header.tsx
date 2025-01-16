import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function Header() {
    const username = localStorage.getItem('username')
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">

                <Link to="#" className="flex justify-center items-center">
                    <img src="The_Journal-removebg-preview.png" alt="The Journal" width={150} className="object-contain" />
                </Link>
                <Link to={username ? "/homepage" : "/authpage"}>
                    <Button variant="outline">{username ? username : "Log In"}</Button>
                </Link>
            </div>
        </header>
    );
}
