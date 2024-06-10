"use client";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DataFetcher from "../../../../../server/server";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const EditProduct: React.FC<{ productId: string, params: { id: string } }> = ({ params, productId }) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [price, setPrice] = useState("");
    const [sale, setSale] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const dataFeatcher = new DataFetcher();

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await dataFeatcher.fetchProductById(params.id);
            setName(product.name);
            setPrice(product.price);
            setSale(product.sale);
            setDescription(product.description);
            setCategory(product.category);
            setImagePreviews(JSON.parse(product.images));
        };

        fetchProduct();
    }, [params.id]);

    const handleDrop = (acceptedFiles: File[]) => {
        setImages(acceptedFiles);
        const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const validateFields = () => {
        if (!name || !price || !category) {
            toast.error("Please fill in all required fields.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return false;
        }
        if (isNaN(parseFloat(price))) {
            toast.error("Price must be a valid number.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return false;
        }
        if (sale && isNaN(parseFloat(sale))) {
            toast.error("Sale must be a valid number.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        const storedToken = localStorage.getItem("token");

        let descArr = description.split(",");

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('sale', sale);
        formData.append('description', JSON.stringify(descArr));
        formData.append('category', category);
        images.forEach((image, index) => {
            formData.append('images', image);
        });

        try {
            await dataFeatcher.updateProduct(storedToken, params.id, formData);
            toast.success("Product updated successfully", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                router.push('/admin/products');
            }, 2000);
        } catch (error) {
            console.error("Failed to update product", error);
            toast.error("Failed to update product", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: handleDrop
    });

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Редагувати товар</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Назва</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Зображення</label>
                        <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 cursor-pointer text-center">
                            <input {...getInputProps()} />
                            <p>Перетягніть файли сюди або натисніть, щоб вибрати файли</p>
                        </div>
                        <div className="flex flex-wrap mt-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="w-24 h-24 m-2">
                                    <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Ціна</label>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Знижка</label>
                        <input
                            type="text"
                            value={sale}
                            onChange={(e) => setSale(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Опис</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Категорія</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Оновити товар
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
