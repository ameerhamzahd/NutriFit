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
                            "text-xl md:text-3xl font-unbounded flex items-center justify-center bg-linear-to-r bg-clip-text text-transparent transition-all duration-300 from-[#EEEEEE] to-[#FF6600]"
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
                            <p className="text-sm font-medium">Privacy Policy</p>
                        </div>
                    </div>

                    <div className="text-[#FFFFFF] text-3xl md:text-5xl xl:text-6xl text-center font-semibold">
                        <h1>Privacy Policy</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 pt-10">
                {/* Heading */}
                <h1 className="text-3xl font-bold mb-2">
                    Privacy Policy – NutriFit
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
                            At NutriFit, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our AI-powered fitness and diet platform.
                        </p>
                    </div>

                    {/* 2. Information We Collect */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We collect the following types of information:
                        </p>

                        <p className="text-gray-600 mt-3"><b>2.1 Personal Information –</b></p>
                        <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                            <li>Name, email address, and contact details</li>
                            <li>Age, gender, height, and weight</li>
                            <li>Dietary preferences and restrictions</li>
                            <li>Fitness goals and activity levels</li>
                        </ul>

                        <p className="text-gray-600 mt-3"><b>2.2 Health and Fitness Data –</b></p>
                        <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                            <li>Meal logs and nutritional intake</li>
                            <li>Workout routines and exercise tracking</li>
                            <li>Water intake records</li>
                            <li>Progress measurements and analytics</li>
                        </ul>

                        <p className="text-gray-600 mt-3"><b>2.3 Technical Information –</b></p>
                        <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                            <li>Device information and browser type</li>
                            <li>IP address and location data</li>
                            <li>Usage patterns and feature interactions</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>
                    </div>

                    {/* 3. How We Use Your Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            3. How We Use Your Information
                        </h2>

                        <p className="text-gray-600">We use your information to:</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                            <li>Generate personalized meal plans and workout recommendations</li>
                            <li>Provide AI-powered health coaching and guidance</li>
                            <li>Track your progress and generate analytics</li>
                            <li>Improve our AI algorithms and service quality</li>
                            <li>Send notifications and updates about your fitness journey</li>
                            <li>Respond to support requests and inquiries</li>
                            <li>Ensure platform security and prevent fraud</li>
                        </ul>
                    </div>

                    {/* 4. Data Sharing and Disclosure */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">4. Data Sharing and Disclosure</h2>

                        <p className="text-gray-600"><b>4.1 We DO NOT Sell Your Data –</b> NutriFit will never sell your personal or health information to third parties.</p>

                        <p className="text-gray-600 mt-2"><b>4.2 Limited Sharing –</b> We may share data only in these circumstances:</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                            <li>With AI service providers necessary for platform functionality</li>
                            <li>When required by law or legal processes</li>
                            <li>To protect user safety or prevent fraud</li>
                            <li>With your explicit consent</li>
                        </ul>

                        <p className="text-gray-600 mt-2"><b>4.3 Anonymized Data –</b> We may use aggregated, anonymized data for research and platform improvements without identifying individual users.</p>
                    </div>

                    {/* 5. Data Security */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
                        <p className="text-gray-600">
                            We implement industry-standard security measures to protect your information:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Secure authentication and access controls</li>
                            <li>Regular security audits and monitoring</li>
                            <li>Limited employee access to personal data</li>
                        </ul>
                        <p className="text-gray-600 mt-2">
                            While we strive to protect your data, no system is completely secure. Users should also take precautions to protect their account credentials.
                        </p>
                    </div>

                    {/* 6. Data Retention */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">6. Data Retention</h2>
                        <p className="text-gray-600">
                            We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time, after which we will remove your information within 30 days, except where retention is required by law.
                        </p>
                    </div>

                    {/* 7. Your Rights and Choices */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">7. Your Rights and Choices</h2>
                        <p className="text-gray-600">You have the right to:</p>
                        <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                            <li>Access and review your personal data</li>
                            <li>Update or correct inaccurate information</li>
                            <li>Request deletion of your account and data</li>
                            <li>Export your data in a portable format</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Disable certain data collection features</li>
                        </ul>
                        <p className="text-gray-600 mt-2">
                            To exercise these rights, contact us using the information provided below.
                        </p>
                    </div>

                    {/* 8. Cookies and Tracking */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">8. Cookies and Tracking Technologies</h2>
                        <p className="text-gray-600">
                            We use cookies and similar technologies to enhance user experience, analyze platform usage, and remember your preferences. You can manage cookie preferences through your browser settings, though some features may not function properly if cookies are disabled.
                        </p>
                    </div>

                    {/* 9. Children's Privacy */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">9. Children's Privacy</h2>
                        <p className="text-gray-600">
                            NutriFit is not intended for users under 13 years of age. We do not knowingly collect personal information from children. If we discover that a child's information has been collected, we will delete it immediately.
                        </p>
                    </div>

                    {/* 10. Third-Party Services */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">10. Third-Party Services</h2>
                        <p className="text-gray-600">
                            Our platform may integrate with third-party AI services and APIs. These providers have their own privacy policies, and we encourage you to review them. NutriFit is not responsible for the privacy practices of third-party services.
                        </p>
                    </div>

                    {/* 11. International Users */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">11. International Users</h2>
                        <p className="text-gray-600">
                            NutriFit operates in Bangladesh. If you access our platform from outside Bangladesh, your information may be transferred to and processed in Bangladesh. By using our services, you consent to this transfer and processing.
                        </p>
                    </div>

                    {/* 12. Changes to Privacy Policy */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">12. Changes to This Privacy Policy</h2>
                        <p className="text-gray-600">
                            We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify users of significant changes via email or platform notifications. Continued use of NutriFit after updates indicates acceptance of the revised policy.
                        </p>
                    </div>

                    {/* 13. Contact Us */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">13. Contact Us</h2>
                        <p className="text-gray-600">
                            If you have questions about this Privacy Policy or wish to exercise your data rights:
                        </p>
                        <div className="mt-3 space-y-2">
                            <p className="flex items-center gap-2 text-gray-700">
                                <FaEnvelope className="text-[#000000]" />{" "}
                                <span>Email: info@nutrifit.com.bd</span>
                            </p>
                            <p className="flex items-center gap-2 text-gray-700">
                                <FaPhone className="text-[#000000]" />{" "}
                                <span>Phone: +880 123 456 7890</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;