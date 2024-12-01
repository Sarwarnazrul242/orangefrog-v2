"use client";
import React, { useState, useContext } from "react";
import { Sidebar, SidebarBody } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconUserBolt,
  IconHome,
  IconCalendarEvent,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { cn } from "../lib/utils";
import { AuthContext } from "../AuthContext";

export default function SidebarDemo({ role }) {
  const [open, setOpen] = useState(false); // Sidebar collapse state
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  // Admin Sidebar Links
  const adminLinks = [
    {
      label: "Dashboard",
      key: "dashboard",
      path: "/admin/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      key: "profile",
      path: "/admin/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      key: "logout",
      path: "/",
      icon: (
        <IconArrowLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
      ),
    },
  ];

  // User Sidebar Links
  const userLinks = [
    {
      label: "Dashboard",
      key: "dashboard",
      path: "/user/dashboard",
      icon: (
        <IconHome className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      key: "profile",
      path: "/user/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      key: "logout",
      path: "/",
      icon: (
        <IconArrowLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
      ),
    },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  // Navigate to the selected tab
  const handleNavigation = (path, key) => {
    if (key === "logout") {
      logout();
      navigate("/");
    } else {
      navigate(path);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      {/* Sidebar Component */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link) => (
                <div
                  key={link.key}
                  onClick={() => handleNavigation(link.path, link.key)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700",
                    location.pathname === link.path && "bg-neutral-100 dark:bg-neutral-700"
                  )}
                >
                  {link.icon}
                  <span className="text-neutral-700 dark:text-neutral-200">
                    {link.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {/* Main Content Area */}
      <div className="flex flex-1 p-6">
        <Outlet /> {/* Renders child routes here */}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20">
      <img
        src={require("../images/orange-frog-logo.png")}
        alt="Orange Frog Logo"
        className="h-8 w-8 flex-shrink-0"
      />
      <span className="font-medium text-white whitespace-pre">
        Orange Frog Production
      </span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20">
      <img
        src={require("../images/orange-frog-logo.png")}
        alt="Orange Frog Logo"
        className="h-8 w-8 flex-shrink-0"
      />
    </a>
  );
};
