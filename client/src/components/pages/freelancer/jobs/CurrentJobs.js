import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../AuthContext";
import { toast } from "sonner";

const CurrentJobs = () => {
    const { auth } = useContext(AuthContext);
    const [currentJobs, setCurrentJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/events/contractor/${auth.email}`);
            if (response.ok) {
                const data = await response.json();
                
                // Filter jobs based on status and dates
                const currentDate = new Date();
                const filteredJobs = data.filter(job => {
                    const loadInDate = new Date(job.eventLoadIn);
                    const deniedDate = job.deniedAt ? new Date(job.deniedAt) : null;

                    if (job.status === 'approved') {
                        return true; // Keep all approved jobs
                    }
                    else if (job.status === 'applied') {
                        return currentDate < loadInDate; // Keep only if before load-in date
                    }
                    else if (job.status === 'denied' && deniedDate) {
                        const hoursSinceDenied = (currentDate - deniedDate) / (1000 * 60 * 60);
                        return hoursSinceDenied < 24; // Keep only if within 24 hours
                    }
                    return false;
                });

                setCurrentJobs(filteredJobs);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            toast.error("Error fetching jobs");
        }
    };

    useEffect(() => {
        if (auth.email) {
            fetchJobs();
            // Refresh every minute to handle expired jobs
            const interval = setInterval(fetchJobs, 60000);
            return () => clearInterval(interval);
        }
    }, [auth.email]);

    const getStatusBadge = (status) => {
        const badges = {
            applied: "bg-yellow-500/10 text-yellow-500",
            approved: "bg-green-500/10 text-green-500",
            denied: "bg-red-500/10 text-red-500"
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs ${badges[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="flex flex-col w-full h-full p-8 bg-neutral-900">
            <h1 className="text-3xl font-bold text-white mb-6">Current Jobs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentJobs.map((job) => (
                    <div key={job._id} className="bg-neutral-800 rounded-lg p-6 shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold text-white">{job.eventName}</h2>
                            {getStatusBadge(job.status)}
                        </div>
                        <p className="text-neutral-400 mb-2">{job.eventLocation}</p>
                        <p className="text-neutral-400 mb-2">
                            Load In: {new Date(job.eventLoadIn).toLocaleString()}
                        </p>
                        <p className="text-neutral-400">
                            Load Out: {new Date(job.eventLoadOut).toLocaleString()}
                        </p>
                    </div>
                ))}
                {currentJobs.length === 0 && (
                    <p className="text-neutral-400 col-span-3 text-center">No current jobs found.</p>
                )}
            </div>
        </div>
    );
};

export default CurrentJobs;
