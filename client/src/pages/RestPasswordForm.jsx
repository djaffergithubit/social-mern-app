import React from 'react';

function ResetPasswordForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 my-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Enter new password</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700 dark:text-gray-300">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="your-email@example.com"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-400 text-white font-semibold px-4 py-2 rounded-md transition duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
