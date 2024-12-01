import React from "react";
import { useNavigate } from "react-router-dom";
import { IconCalendarEvent, IconUsers } from "@tabler/icons-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full h-full p-8 bg-gray-100 dark:bg-neutral-900">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-20">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Manage Events Card */}
        <div
          className="relative group cursor-pointer"
          onClick={() => navigate("/admin/manage-events")}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-neutral-900 dark:bg-neutral-800 text-white rounded-xl p-6 shadow-lg flex flex-col items-center gap-4">
            <IconCalendarEvent className="w-12 h-12 text-teal-400" />
            <h2 className="text-xl font-semibold">Manage Events</h2>
            <p className="text-sm text-neutral-400 text-center">
              Create and manage events, assign contractors, and track progress.
            </p>
          </div>
        </div>

        {/* Manage Users Card */}
        <div
          className="relative group cursor-pointer"
          onClick={() => navigate("/admin/manage-users")}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-neutral-900 dark:bg-neutral-800 text-white rounded-xl p-6 shadow-lg flex flex-col items-center gap-4">
            <IconUsers className="w-12 h-12 text-teal-400" />
            <h2 className="text-xl font-semibold">Manage Users</h2>
            <p className="text-sm text-neutral-400 text-center">
              Manage user accounts, permissions, and access levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
