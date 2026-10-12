import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const inputClass =
        'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Head title="Log in" />

            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
                <h1 className="text-center text-2xl font-bold text-indigo-600">HelpDesk</h1>
                <p className="mt-1 text-center text-sm text-gray-500">
                    Log in to manage your support tickets
                </p>

                {status && (
                    <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="username"
                            autoFocus
                            className={inputClass}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            className={inputClass}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        Remember me
                    </label>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Logging in...' : 'Log in'}
                    </button>

                    <div className="flex items-center justify-between text-sm">
                        <Link href={route('register')} className="text-indigo-600 hover:underline">
                            Create an account
                        </Link>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-gray-600 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}