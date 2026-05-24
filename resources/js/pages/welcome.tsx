import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="POS System" />
            <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50">
                <header className="flex w-full items-center justify-between p-6 lg:px-12">
                    <div className="text-xl font-bold tracking-tight">Sales System</div>
                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={dashboard()} className="rounded-md bg-gray-900 px-5 py-2 text-sm text-white hover:bg-gray-800">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="text-sm font-medium hover:underline">Log in</Link>
                                {canRegister && (
                                    <Link href={register()} className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-100">
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
                        <h1 className="text-4xl font-extrabold tracking-tight">Online Product Sales</h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Manage your products, track sales transactions, and generate reports with ease.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            {auth.user ? (
                                <Link href={dashboard()} className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700">
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <Link href={login()} className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700">
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>
                </main>

                <footer className="p-6 text-center text-sm text-gray-500">
                    Product Sales Management System
                </footer>
            </div>
        </>
    );
}
