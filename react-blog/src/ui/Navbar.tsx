import { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_PUBLIC_SERVER_URL
import { TfiWrite } from "react-icons/tfi";
import logoImage from '/The_Journal-removebg-preview.png';


interface userTs {
    username: string | null

}
const Navbar = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<userTs | null>(null);
    const username = localStorage.getItem('username')
    useEffect(() => {
        // Fetch user details on component mount
        // This should be replaced with your actual authentication check
        setUserDetails({
            username
        });
    }, []);


    const handleLogout = async () => {
        try {
            const res = await axios.post(`${url}/auth/logout`, {}, { withCredentials: true })
            if (res.status === 200) {
                navigate("/authpage")
            }
        } catch (error) {
            console.error("Loggingout failed", error)
            navigate("/authpage");
        }
    }


    return (
        <nav className="w-full z-10 sticky">
            <div className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
                <div className="flex gap-14 mt-5">
                    <Link to="#" className="flex justify-center items-center">
                        <img src={logoImage} alt="The Journal" width={150} className="object-contain" />
                    </Link>
                </div>

                {userDetails ? (
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Link to={"/create-blog"}>
                                <TfiWrite
                                    className="text-xl font-extrabold transition-transform transform hover:scale-110 text-black"
                                />
                                <span className="absolute left-1/2 transform -translate-x-1/2 top-4 scale-0 group-hover:scale-100 transition-all  text-black text-xs py-1">
                                    Write
                                </span>
                            </Link>
                        </div>
                        <Dropdown label={<span className="text-black font-semibold">{userDetails?.username}<FontAwesomeIcon icon={faCaretDown} className="ml-1 text-black" /></span>} dismissOnClick={false}>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>

                        </Dropdown>


                    </div>
                ) : (
                    <div>
                        <Link to="/signin">
                            <button
                                title="Sign Up"
                                type="button"
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            />
                        </Link>
                        <Link to="/login">
                            <button
                                title="Log In"
                                type="button"
                                className={"text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"}
                            />
                        </Link>
                    </div>
                )
                }
            </div>
        </nav>
    );
};

export default Navbar;
