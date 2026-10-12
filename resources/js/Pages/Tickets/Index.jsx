import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketBadge from '@/Components/TicketBadge';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ auth, tickets }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">My Tickets</h2>
                    <Link
                        href={route('tickets.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

                {tickets.data.length === 0 ? (
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                        <p className="text-lg font-medium text-gray-700">No tickets yet</p>
                        <p className="mt-1 text-sm text-gray-500">
                            Create your first ticket to get started.
                        </p>
                        <Link
                            href={route('tickets.create')}
                            className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            Create Ticket
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="hidden overflow-hidden rounded-lg bg-white shadow md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {['Title', 'Category', 'Priority', 'Status', 'Created', ''].map(
                                            (h) => (
                                                <th
                                                    key={h}
                                                    className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500"
                                                >
                                                    {h}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {tickets.data.map((t) => (
                                        <tr key={t.id}>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                {t.title}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {t.category}
                                            </td>
                                            <td className="px-4 py-3">
                                                <TicketBadge value={t.priority} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <TicketBadge value={t.status} />
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                {new Date(t.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm">
                                                <Link
                                                    href={route('tickets.show', t.id)}
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="space-y-3 md:hidden">
                            {tickets.data.map((t) => (
                                <Link
                                    key={t.id}
                                    href={route('tickets.show', t.id)}
                                    className="block rounded-lg bg-white p-4 shadow"
                                >
                                    <p className="font-semibold text-gray-900">{t.title}</p>
                                    <p className="mt-1 text-xs text-gray-500">{t.category}</p>
                                    <div className="mt-2 flex gap-2">
                                        <TicketBadge value={t.priority} />
                                        <TicketBadge value={t.status} />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {tickets.links.length > 3 && (
                            <div className="mt-6 flex flex-wrap justify-center gap-1">
                                {tickets.links.map((link, i) =>
                                    link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`rounded border px-3 py-1 text-sm ${
                                                link.active
                                                    ? 'border-indigo-600 bg-indigo-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={i}
                                            className="rounded border px-3 py-1 text-sm text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}