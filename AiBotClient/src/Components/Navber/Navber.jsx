
import  {useState} from "react";

// react icons
import {IoIosSearch} from "react-icons/io";
import {CiMenuFries} from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.jpg'
const Navbar = () => {

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

    return (
        <nav
            className="flex items-center justify-between  w-full relative bg-gray-100 boxShadow  px-20 py-4">
            <img src={logo} alt="logo" className="w-12 rounded-full "/>
            <ul className="items-center gap-[20px] text-[1rem] text-text lg:flex hidden">
                <Link className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 text-xl cursor-pointer capitalize">home</Link>
                <Link className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 text-xl cursor-pointer capitalize">features</Link>
                <Link className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 text-xl cursor-pointer capitalize">blogs</Link>
                <Link to={'/chat'} className="before:w-0 hover:before:w-full before:bg-primary before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-primary transition-all duration-300 before:left-0 text-xl cursor-pointer capitalize">Chatbot</Link>
            </ul>

            <div className="items-center gap-[10px] flex">
                <button
                    className="py-[7px] text-xl px-[16px] rounded-full capitalize hover:text-primary transition-all duration-300 sm:flex hidden">Sign
                    in
                </button>
                <button
                    className="py-[7px] text-xl px-[16px] rounded-full capitalize bg-primary text-white hover:bg-blue-400 transition-all duration-300 sm:flex hidden">Sign
                    up
                </button>

                <CiMenuFries className="text-[1.8rem] mr-1 text-textc cursor-pointer lg:hidden flex"
                             onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}/>
            </div>

            <aside
                className={` ${mobileSidebarOpen ? "translate-x-0 opacity-100 z-20" : "translate-x-[200px] opacity-0 z-[-1]"} lg:hidden bg-white boxShadow p-4 text-center absolute top-[65px] right-0 w-full rounded-md transition-all duration-300`}>
                <div className="relative mb-5">
                    <input
                        className="py-1.5 pr-4 w-full pl-10 rounded-full border border-gray-200 outline-none focus:border-primary"
                        placeholder="Search..."/>
                    <IoIosSearch className="absolute top-[8px] left-3 text-gray-500 text-[1.3rem]"/>
                </div>
                <ul className="items-center gap-[20px] text-[1rem] text-gray-600 flex flex-col">
                    <Link className="hover:border-b-primary border-b-[2px] border-transparent transition-all duration-500 cursor-pointer text-xl capitalize">home</Link>
                    <Link className="hover:border-b-primary border-b-[2px] border-transparent transition-all duration-500 cursor-pointer text-xl capitalize">Features
                    </Link>
                    <Link className="hover:border-b-primary border-b-[2px] border-transparent transition-all duration-500 cursor-pointer text-xl capitalize">Blogs</Link>
                    <Link to={'/chat'} className="hover:border-b-primary border-b-[2px] border-transparent transition-all duration-500 cursor-pointer text-xl capitalize">Chatbot</Link>
                </ul>
            </aside>
        </nav>
    );
};

export default Navbar;
          