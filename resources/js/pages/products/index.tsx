import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CirclePlusIcon, Eye, Pencil, Trash, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    featured_image: string;
    created_at: string;
}

export default function Index({ ...props }: { products: Product[] }) {
    const { products } = props;
    // Extract flash messages from the page props
    // and set up state to manage alert visibility

    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;

    const [showAlert, setShowAlert] = useState(flashMessage ? true : false);

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => setShowAlert(false), 5000);

            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showAlert && flashMessage && (
                    <Alert
                        variant={'default'}
                        className={`${flash?.success ? 'bg-green-800' : flash?.error ? 'bg-red-800' : ''} ml-auto max-w-md text-white`}
                    >
                        {/* <AlertTitle className="font-bold"> {flash?.success ? 'Success' : 'Error'} </AlertTitle> */}
                        <AlertDescription className="text-white">
                            {flash?.success ? 'Success!' : 'Error!'} {flashMessage}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Add product button - start */}
                <div className="ml-auto">
                    <Link
                        className="flex items-center text-md cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                        as="button"
                        href={route('products.create')}
                    >
                        <CirclePlusIcon className='me-2' />Add Product
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
                                <th className="border p-4">Price (TRY)</th>
                                <th className="border p-4">Featured Image</th>
                                <th className="border p-4">Created Date</th>
                                <th className="border p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2 text-center">{product.name}</td>
                                    <td className="border px-4 py-2 text-center">{product.description}</td>
                                    <td className="border px-4 py-2 text-center">₺{product.price}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <img
                                            src={'http://127.0.0.1:8000/storage/' + product.featured_image}
                                            alt={product.name}
                                            className="h-16 w-16 object-cover"
                                        />
                                    </td>
                                    <td className="border px-4 py-2 text-center">{product.created_at}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <Link
                                            as="button"
                                            className="cursor-pointer rounded-lg bg-sky-600 p-2 text-white  hover:opacity-90"
                                            href={route('products.show', product.id)}
                                        >
                                            <Eye size={18} />
                                        </Link>

                                        <Link
                                            as="button"
                                            className="ms-2 cursor-pointer rounded-lg bg-green-600 p-2 text-white hover:opacity-90"
                                            href={route('products.show', product.id)}
                                        >
                                            <Pencil size={18} />
                                        </Link>
                                        
                                        <Link
                                            as="button"
                                            className="ms-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white hover:opacity-90"
                                            href={route('products.show', product.id)}
                                        >
                                            <Trash2 size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
