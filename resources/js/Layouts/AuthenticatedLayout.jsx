import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    // Show flash message and auto-dismiss after 4 seconds
    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            const timer = setTimeout(() => setMessage(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    const linkClass = (active) =>
        `text-sm font-medium ${
            active ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'
        }`;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6">
                        <Link href={route('dashboard')} className="text-lg font-bold text-indigo-600">
                            HelpDesk
                        </Link>
                        <div className="hidden items-center gap-5 md:flex">
                            <Link
                                href={route('dashboard')}
                                className={linkClass(route().current('dashboard'))}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route('tickets.index')}
                                className={linkClass(route().current('tickets.*'))}
                            >
                                Tickets
                            </Link>
                        </div>
                    </div>

                    <div className="hidden items-center gap-4 md:flex">
                        <Link
                            href={route('tickets.create')}
                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            New Ticket
                        </Link>
                        <span className="text-sm text-gray-700">{auth.user.name}</span>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Logout
                        </Link>
                    </div>

                    <button
                        onClick={() => setOpen(!open)}
                        className="rounded p-2 text-gray-600 hover:bg-gray-100 md:hidden"
                        aria-label="Toggle menu"
                    >
                        {open ? '✕' : '☰'}
                    </button>
                </div>

                {open && (
                    <div className="space-y-3 border-t px-4 py-3 md:hidden">
                        <p className="text-sm font-semibold text-gray-800">{auth.user.name}</p>
                        <Link href={route('dashboard')} className="block text-sm text-gray-700">
                            Dashboard
                        </Link>
                        <Link href={route('tickets.index')} className="block text-sm text-gray-700">
                            Tickets
                        </Link>
                        <Link
                            href={route('tickets.create')}
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white"
                        >
                            New Ticket
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="block text-sm text-gray-700"
                        >
                            Logout
                        </Link>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {message && (
                <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between rounded-md bg-green-50 p-3 text-sm text-green-700">
                        <span>{message}</span>
                        <button onClick={() => setMessage(null)} aria-label="Dismiss">
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <main>{children}</main>
        </div>
    );
}