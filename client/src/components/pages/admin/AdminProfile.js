import React from 'react';

const Profile = () => {
    return (
        <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Hello, World!
          </h1>
          <p className="text-neutral-700 dark:text-neutral-400">
            Welcome to the Admin profile.
          </p>
        </div>
      </div>
    );
};

export default Profile;