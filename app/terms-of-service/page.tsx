"use client";
 
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { BiDumbbell } from 'react-icons/bi';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { GoChevronRight } from 'react-icons/go';
 
const page = () => {
    return (
        <div className="pb-10">
            {/* 🔹 Header Section with Video Background */}
            <div className="relative max-w-11/12 xl:max-w-6xl mx-auto rounded-b-4xl overflow-hidden">
                {/* Background Video */}
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/videos/bgVideo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
 
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
 
                {/* Header Content */}
                <div className="relative z-10 p-5 lg:p-10 space-y-5">
                    <Link href="/" className="flex items-center justify-center gap-3 mb-5 group">
                        <h1 className={cn(
                            "text-xl md:text-3xl font-mono-trust-display flex items-center justify-center bg-linear-to-r bg-clip-text text-transparent transition-all duration-300 from-[#EEEEEE] to-[#FF6600]"
                        )}>
                            Nutri
                            <BiDumbbell className={cn(
                                "transition-colors duration-300 text-[#EEEEEE]"
                            )} />
                            Fit
                        </h1>
                    </Link>
 
                    <div className="flex justify-center">
                        <div className="px-8 py-2 bg-transparent border-none rounded-full shadow-md hover:scale-105 transition-all duration-300 hover:shadow-lg text-white flex">
                            <p className="text-sm font-light flex justify-center items-center gap-1">
                                <Link href="/" className="hover:underline" >
                                Home
                                </Link> 
 
                                <GoChevronRight />
                            </p>
                            <p className="text-sm font-medium">Terms of Service</p>
                        </div>
                    </div>
 
                    <div className="text-[#FFFFFF] text-3xl md:text-5xl xl:text-6xl text-center font-semibold">
                        <h1>Terms of Service</h1>
                    </div>
                </div>
            </div>
 
            <div className="max-w-4xl mx-auto px-4 pt-10">
                {/* Heading */}
                <h1 className="text-3xl font-bold mb-2">
                    Terms of Service – NutriFit
                </h1>
                <p className="text-sm text-gray-500 mb-10">
                    (Last updated: August 23, 2025)
                </p>
 
                {/* Content */}
                <div className="space-y-8">
 
                    {/* 1. Introduction */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to NutriFit. By creating an account or using our AI-powered fitness and diet services, you agree to these Terms of Service. These terms define your rights, responsibilities, and the proper use of our platform.
                        </p>
                    </div>
 
                    {/* 2. Services Provided */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">2. Services Provided</h2>
                        <p className="text-gray-600 leading-relaxed">
                            NutriFit provides:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                            <li>Personalized meal and workout recommendations</li>
                            <li>AI-generated fitness and dietary suggestions</li>
                            <li>AI Health Coach chatbot with real-time guidance</li>
                            <li>Meal, workout, and water-intake tracking</li>
                            <li>Progress analytics with weekly/monthly insights</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-2">
                            Features may be updated or enhanced as the platform evolves.
                        </p>
                    </div>
 
                    {/* 3. User Accounts & Responsibilities */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            3. User Accounts & Responsibilities
                        </h2>
 
                        <p className="text-gray-600"><b>3.1 Account Creation –</b> Users must provide accurate details, including age, weight, height, dietary preferences, and fitness goals.</p>
 
                        <p className="text-gray-600 mt-2"><b>3.2 User Responsibilities –</b> Users agree to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                            <li>Provide correct, honest information for accurate AI recommendations</li>
                            <li>Keep login credentials secure</li>
                            <li>Avoid misuse of platform features and AI services</li>
                        </ul>
 
                        <p className="text-gray-600 mt-2"><b>3.3 Profile Modifications –</b> Users can update their health information anytime to improve AI accuracy.</p>
                    </div>
 
                    {/* 4. Payments */}
                    {/* <div>
                        <h2 className="text-xl font-semibold mb-2">4. Payments</h2>
                        <p className="text-gray-600"><b>4.1 Premium Features –</b> Certain advanced analytics or AI features may require paid subscriptions in the future.</p>
                        <p className="text-gray-600 mt-2"><b>4.2 Accepted Methods –</b> Payments will be processed through secure gateways if applicable.</p>
                        <p className="text-gray-600 mt-2"><b>4.3 Refunds –</b> Digital services are non-refundable unless required by law.</p>
                    </div> */}
 
                    {/* 5. Intellectual Property */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
                        <p className="text-gray-600">
                            <b>5.1 User Ownership –</b> Users retain ownership of their logged data such as meals, workouts, and progress records.
                        </p>
                        <p className="text-gray-600 mt-2">
                            <b>5.2 Platform Rights –</b> All software, UI, analytics systems, AI logic, and branding belong to NutriFit.
                        </p>
                        <p className="text-gray-600 mt-2">
                            <b>5.3 Third-Party Assets –</b> Any AI or API integrations follow their respective license agreements.
                        </p>
                    </div>
 
                    {/* 6. Confidentiality */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">6. Confidentiality</h2>
                        <p className="text-gray-600">
                            We ensure that all user information including health data, progress logs, and personal details are kept confidential and never shared without permission, except when required by law.
                        </p>
                    </div>
 
                    {/* 7. Limitation of Liability */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
                        <p className="text-gray-600">
                            NutriFit is not liable for:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                            <li>Health consequences due to incorrect user-provided information</li>
                            <li>Service interruptions from third-party providers or AI APIs</li>
                            <li>Any misuse of workout or dietary recommendations</li>
                            <li>Loss of progress data due to user device failures</li>
                        </ul>
                    </div>
 
                    {/* 8. Termination */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">8. Termination of Services</h2>
                        <p className="text-gray-600">
                            Either party may terminate the account at any time. Users must ensure they back up their data before deletion.
                        </p>
                    </div>
 
                    {/* 9. Policy Updates */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">9. Policy Updates</h2>
                        <p className="text-gray-600">
                            We may update these Terms of Service periodically. Continued use of the platform indicates acceptance of updated policies.
                        </p>
                    </div>
 
                    {/* 10. Governing Law */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
                        <p className="text-gray-600">
                            These Terms of Service follow the laws of Bangladesh and any disputes fall under its jurisdiction.
                        </p>
                    </div>
 
                    {/* 11. Contact Us */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">11. Contact Us</h2>
                        <p className="text-gray-600">
                            For support or inquiries:
                        </p>
                        <div className="mt-3 space-y-2">
                            <p className="flex items-center gap-2 text-gray-700">
                                <FaEnvelope className="text-[#000000]" />{" "}
                                <span>Email: support@smartfitnessplanner.com</span>
                            </p>
                            <p className="flex items-center gap-2 text-gray-700">
                                <FaPhone className="text-[#000000]" />{" "}
                                <span>Phone: +880 1XXX-XXXXXX</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default page;