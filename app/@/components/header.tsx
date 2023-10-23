import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import { paths } from "../components/routes";
// import Cookies from "js-cookie";
// import { Button } from "../../@/components/ui/button";
import { Session } from "@supabase/supabase-js";

import axios from "axios";
// import { useUserStore } from "../stores/useUserStore";

const Header = ({
  session,
  signOut,
}: {
  session: Session | null;
  signOut: () => void;
}) => {
  //   const Links = [
  //     { name: "Home", link: "/" },
  //     { name: "Dashboard", link: "/dashboard" },
  //   ];
  let [open, setOpen] = useState(false);
  //   const deleteUser = useUserStore((state) => state.deleteUser);
  //   const user = useUserStore((state) => state.user);

  //   const logout = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_BASE_URL}/user/clearCookie`

  //         // { withCredentials: true }
  //       );
  //       console.log(response);
  //       Cookies.remove("token");
  //       deleteUser();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-10">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
text-gray-800"
        >
          <NavLink to="/">Reamix</NavLink>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <span>
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </span>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-19 " : "top-[-490px]"
          }`}
        >
          {/* {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <NavLink to={link.link}> {link.name}</NavLink>
            </li>
          ))} */}
          {!session ? (
            <>
              {/* <Button variant="outline">Outline</Button> */}
              <Link
                to={"signin"}
                className="w-full ml-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Einloggen
              </Link>
              <Link
                to={"signup"}
                className="w-full ml-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Registrieren
              </Link>
            </>
          ) : (
            <button
              onClick={signOut}
              className=" ml-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Abmelden
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
