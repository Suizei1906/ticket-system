import { useForm, Link } from '@inertiajs/react';

export default function TicketForm({ ticket, priorities, statuses, categories }) {
    const isEdit = Boolean(ticket);

    const { data, setData, post, put, processing, errors } = useForm({
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        priority: ticket?.priority ?? priorities[0],
        status: ticket?.status ?? 'Open',
        category: ticket?.category ?? categories[0],
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('tickets.update', ticket.id));
        } else {
            post(route('tickets.store'));
        }
    };

    const inputClass =
        'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

    const Select = ({ label, name, options }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
                {label}
            </label>
            <select
                id={name}
                className={inputClass}
                value={data[name]}
                onChange={(e) => setData(name, e.target.value)}
            >
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
            {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
        </div>
    );

    return (
        <form onSubmit={submit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    className={inputClass}
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    rows={5}
                    className={inputClass}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <Select label="Priority" name="priority" options={priorities} />
                <Select label="Status" name="status" options={statuses} />
                <Select label="Category" name="category" options={categories} />
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? 'Saving...' : isEdit ? 'Update Ticket' : 'Create Ticket'}
                </button>
                <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:underline">
                    Cancel
                </Link>
            </div>
        </form>
    );
}