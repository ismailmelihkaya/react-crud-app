import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/products',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Add product button - start */}
                <div className="ml-auto">
                    <Link
                        className="text-md cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                        as="button"
                        href={route('products.create')}
                    >
                        Add Product
                    </Link>
                </div>
                {/* Add product button - finish */}

                <div className="overflow-hidden rounded-lg border bg-gray-500 shadow-sm">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="border p-4">#</th>
                                <th className="border p-4">Name</th>
                                <th className="border p-4">Description</th>
                                <th className="border p-4">Price</th>
                                <th className="border p-4">Featured Image</th>
                                <th className="border p-4">Created Date</th>
                                <th className="border p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 text-center">1</td>
                                <td className="border px-4 py-2 text-center">Mobile Phone</td>
                                <td className="border px-4 py-2 text-center">Mobile Phone Desc</td>
                                <td className="border px-4 py-2 text-center">₺100000</td>
                                <td className="border px-4 py-2 text-center"></td>
                                <td className="border px-4 py-2 text-center">05.04.2025</td>
                                <td className="border px-4 py-2 text-center">Action</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
