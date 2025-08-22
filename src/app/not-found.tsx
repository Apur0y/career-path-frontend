'use client'
import Footer from '@/components/shared/footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const navitem = [
        { name: "Home", href: "/" },
        { name: "For Job Seekers", href: "/jobSeeker/home" },
        { name: "For Employers", href: "/create-account" },
        { name: "Course", href: "#course" },
        { name: "Pricing", href: "#pricing" },
    ];

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const popularLinks = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/#course" },
        { name: "Pricing Plans", href: "/#pricing" },
    ];

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 1000);
        return () => clearTimeout(timer);
    }, []);

 

    return (
        <>
            <Head>
                <title>Page Not Found | 404 Error</title>
                <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
            </Head>

            <div className="min-h-screen flex flex-col">
                {/* <Navbar navItem={navitem} /> */}
                
                <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl w-full space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <motion.div
                                animate={isAnimating ? { rotate: [0, 10, -10, 0] } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <svg
                                    className="mx-auto h-24 w-24 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </motion.div>
                            <h1 className="mt-6 text-6xl font-extrabold text-gray-900">
                                4<span className="text-green-600">0</span>4
                            </h1>
                            <h2 className="mt-4 text-3xl font-medium text-gray-800">Page Not Found</h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Oops! The page you're looking for doesn't exist or has been moved.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="bg-white p-6 rounded-xl shadow-lg"
                        >
                         

                            <div className="mt-8">
                                <h3 className="text-sm font-medium text-gray-500">Try these links:</h3>
                                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {popularLinks.map((link, index) => (
                                        <motion.li
                                            key={index}
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <a
                                                href={link.href}
                                                className="flex items-center px-4 py-3 border border-gray-200 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                                            >
                                                <svg
                                                    className="mr-3 h-5 w-5 text-green-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                                {link.name}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 text-center">
                                <a
                                    href="/"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                >
                                    <svg
                                        className="-ml-1 mr-3 h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    Go back home
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </main>

                {/* <Footer /> */}
            </div>
        </>
    );
}