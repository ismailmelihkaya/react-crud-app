import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function ProductForm({ ...props }) {
    const { product, isView, isEdit } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isView ? 'Show' : isEdit ? 'Update' : 'Create'} Product`,
            href: route('products.create'),
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        featured_image: null as File | null,
    });

    // Form Submit Handler
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('products.store'), {
            onSuccess: () => console.log('Form Submitted'),
        });

        console.log('data', data);
    };

    // File Upload Handler
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('featured_image', e.target.files[0]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{isView ? 'Show' : isEdit ? 'Update' : 'Create'} Product</CardTitle>

                        {/* Back to Products Butotn */}
                        <div className="ml-auto">
                            <Link
                                as="button"
                                className="text-md flex cursor-pointer items-center rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                                href={route('products.index')}
                            >
                                <ArrowLeft className="me-2" /> Back to Products
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4" autoComplete="off">
                            <div className="grid gap-6">
                                {/* Product Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Product Name"
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Product Description */}
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Product Description</Label>

                                    <CustomTextarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        id="description"
                                        name="description"
                                        placeholder="Product Description"
                                        tabIndex={2}
                                        rows={3}
                                        disabled={isView || processing}
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                {/* Product Price */}
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Product Price</Label>
                                    <Input
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        id="price"
                                        name="price"
                                        type="text"
                                        placeholder="Product Price"
                                        tabIndex={3}
                                        disabled={isView || processing}
                                    />
                                    <InputError message={errors.price} />
                                </div>

                                {/* Product Featured Image */}

                                {!isView ? (
                                    <div className="grid gap-2">
                                        <Label htmlFor="featured_image">Featured Image</Label>

                                        <Input
                                            onChange={handleFileUpload}
                                            id="featured_image"
                                            name="featured_image"
                                            type="file"
                                            tabIndex={4}
                                            // disabled={isView || processing}
                                        />

                                        <InputError message={errors.featured_image} />
                                    </div>
                                ) : (
                                    <div className="grid gap-2">
                                        <Label htmlFor="featured_image">Featured Image</Label>
                                        <img
                                            src={`/${'storage/' + product.featured_image}`}
                                            alt="Featured Image"
                                            className="h-40 rounded-lg border"
                                        />
                                    </div>
                                )}

                                {/* Submit Button */}
                                {!isView && (
                                    <Button type="submit" className="mt-4 w-fit cursor-pointer" tabIndex={4}>
                                        {/* {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} */}
                                        Save Product
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
