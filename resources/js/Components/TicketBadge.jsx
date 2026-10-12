const COLORS = {
    // priority
    Low: 'bg-gray-100 text-gray-700',
    Medium: 'bg-blue-100 text-blue-700',
    High: 'bg-orange-100 text-orange-700',
    Urgent: 'bg-red-100 text-red-700',
    // status
    Open: 'bg-green-100 text-green-700',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Resolved: 'bg-purple-100 text-purple-700',
    Closed: 'bg-gray-200 text-gray-600',
};

export default function TicketBadge({ value }) {
    return (
        <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                COLORS[value] ?? 'bg-gray-100 text-gray-700'
            }`}
        >
            {value}
        </span>
    );
}