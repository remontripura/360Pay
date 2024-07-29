/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { images, mainNavItem, subNavItem } from "../..";
import { MenuInterface } from "../../types/menuType";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const [mouseHover, setMouseHover] = useState<number | null>(null);

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      // ref={sidebar}
      className={`absolute left-0 top-0 z-999 flex h-screen w-64 flex-col overflow-y-hidden border-r-2 bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-2 lg:py-2.5">
        <NavLink to="/dashboard" className=" w-full">
          <h1 className="text-[24px] font-semibold text-black mx-auto w-fit">
            Web 320
          </h1>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-0 py-4 px-4 lg:mt-0 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {mainNavItem.map((item: MenuInterface, i: number) => (
                <NavLink
                  key={i}
                  to={item.pathname}
                  onMouseEnter={() => setMouseHover(i)}
                  onMouseLeave={() => setMouseHover(null)}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 rounded-md font-semibold  text-primary  hover:bg-[#EFEBFE] duration-300 cursor-pointer flex items-center gap-3 bg-[#EFEBFE]"
                      : "p-2 rounded-md font-semibold hover:bg-[#EFEBFE] hover:text-primary text-[#868B8F] text-[16px] duration-300 cursor-pointer flex items-center gap-3"
                  }
                >
                  <span>
                    {mouseHover == i || item.pathname === pathname ? (
                      <img src={item?.icon2} alt="" />
                    ) : (
                      <img src={item?.icon1} alt="" />
                    )}
                  </span>
                  <span> {item.item}</span>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="mt-5">
            <h4 className="font-semibold text-[14px] text-[#868B8F]">
              Post Purchase Step
            </h4>
            <ul className="mb-6 flex flex-col space-y-2">
              {subNavItem.map((item: MenuInterface, i: number) => (
                <NavLink
                  key={i}
                  to={item.pathname}
                  onMouseEnter={() => setMouseHover(i)}
                  onMouseLeave={() => setMouseHover(null)}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 rounded-md font-semibold  text-primary  hover:bg-[#EFEBFE] duration-300 cursor-pointer flex items-center gap-3 bg-[#EFEBFE]"
                      : "p-2 rounded-md font-semibold hover:bg-[#EFEBFE] hover:text-primary text-[#868B8F] text-[16px] duration-300 cursor-pointer flex items-center gap-3"
                  }
                >
                  <span>
                    {mouseHover == i + 6 || item.pathname === pathname ? (
                      <img src={item?.icon2} alt="" />
                    ) : (
                      <img src={item?.icon1} alt="" />
                    )}
                  </span>
                  <span> {item.item}</span>
                </NavLink>
              ))}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
