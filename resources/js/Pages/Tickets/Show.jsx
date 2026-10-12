import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketBadge from '@/Components/TicketBadge';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, ticket }) {
    const handleDelete = () => {
        if (confirm('Delete this ticket? This cannot be undone.')) {
            router.delete(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-gray-800">Ticket #{ticket.id}</h2>}
        >
            <Head title={ticket.title} />
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-4 rounded-lg bg-white p-6 shadow">
                    <h3 className="text-2xl font-bold text-gray-900">{ticket.title}</h3>

                    <div className="flex flex-wrap items-center gap-2">
                        <TicketBadge value={ticket.priority} />
                        <TicketBadge value={ticket.status} />
                        <span className="text-sm text-gray-500">{ticket.category}</span>
                    </div>

                    <p className="whitespace-pre-line text-gray-700">{ticket.description}</p>

                    <p className="text-xs text-gray-400">
                        Created {new Date(ticket.created_at).toLocaleString()} · Updated{' '}
                        {new Date(ticket.updated_at).toLocaleString()}
                    </p>

                    <div className="flex items-center gap-3 border-t pt-4">
                        <Link
                            href={route('tickets.edit', ticket.id)}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                        >
                            Delete
                        </button>
                        <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:underline">
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}