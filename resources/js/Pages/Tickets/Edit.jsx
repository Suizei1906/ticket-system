import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, ticket, priorities, statuses, categories }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-gray-800">Edit Ticket</h2>}
        >
            <Head title="Edit Ticket" />
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-6 shadow">
                    <TicketForm
                        ticket={ticket}
                        priorities={priorities}
                        statuses={statuses}
                        categories={categories}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}