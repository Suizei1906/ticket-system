import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head } from '@inertiajs/react';

export default function Create({ auth, priorities, statuses, categories }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-gray-800">New Ticket</h2>}
        >
            <Head title="New Ticket" />
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-6 shadow">
                    <TicketForm
                        priorities={priorities}
                        statuses={statuses}
                        categories={categories}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}