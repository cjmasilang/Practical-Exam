"use client";

import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props as any;

    return (
        <>
            <Head title="POS System" />
            <div className="flex min-h-screen flex-col bg-white text-gray-900">
                <header className="flex w-full items-center justify-between px-8 py-6 border-b border-gray-100">
                    <div className="text-xl font-bold tracking-tight text-blue-600">Tech Company</div>
                    <nav className="flex items-center gap-6">
                        {auth.user ? (
                            <Link href={dashboard()} className="text-sm font-semibold text-gray-600 hover:text-blue-600">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="text-sm font-semibold text-gray-600 hover:text-blue-600">Log in</Link>

                            </>
                        )}
                    </nav>
                </header>

                <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                    <div className="max-w-xl">
                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
                            Professional Sales Management
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                            A streamlined system designed for efficient product tracking, sales processing, and insightful reporting.
                        </p>
                        <div className="mt-10">
                            {auth.user ? (
                                <Link href={dashboard()} className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <Link href={login()} className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
