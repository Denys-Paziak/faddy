import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface EditProductModalProps {
    product: any;
    onSave: (updatedProduct: any) => void;
    onClose: () => void;
}

const sizes = ['s', 'm', 'l'];

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onSave, onClose }) => {
    const [editedProduct, setEditedProduct] = useState<any>(product);
    const [sizeActive, setSizeActive] = useState(sizes.indexOf(product.size));
    const [count, setCount] = useState(product.quantity);

    const handleSizeClick = (index: number) => {
        setSizeActive(index);
        setEditedProduct((prevProduct: any) => ({ ...prevProduct, size: sizes[index] }));
    };

    const handleSave = () => {
        onSave({ ...editedProduct, quantity: count });
        onClose();
    };

    return (
        <div className="modal flex flex-col items-center text-center border-2 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white p-6">
            <div className="modal-content">
                <div className="flex gap-10">
                    <div>
                        <p className="py-4 font-bold">Розмір</p>
                        <div className="flex gap-2">
                            {sizes.map((el, index) => (
                                <button
                                    key={uuidv4()}
                                    className={`py-2 px-4 border ${index === sizeActive
                                        ? 'bg-black text-white'
                                        : 'hover:bg-black hover:text-white'
                                        } duration-150 ease-in-out`}
                                    onClick={() => handleSizeClick(index)}
                                >
                                    {el}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="py-4 font-bold">Кількість</p>
                        <div className="counter flex gap-2 items-center">
                            <button
                                className="py-2 px-4 border bg-black text-white duration-150 ease-in-out"
                                onClick={() => setCount((prevCount: any) => Math.max(prevCount - 1, 1))}
                            >
                                -
                            </button>
                            <p>{count}</p>
                            <button
                                className="py-2 px-4 border bg-black text-white duration-150 ease-in-out"
                                onClick={() => setCount((prevCount: any) => prevCount + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 justify-center">
                    <button
                        onClick={handleSave}
                        className="mt-6 py-2 px-4 border hover:bg-black hover:text-white duration-150 ease-in-out"
                    >
                        Зберегти
                    </button>

                    <button
                        onClick={onClose}
                        className="mt-6 py-2 px-4 border hover:bg-black hover:text-white duration-150 ease-in-out"
                    >
                        Відмінити
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EditProductModal;