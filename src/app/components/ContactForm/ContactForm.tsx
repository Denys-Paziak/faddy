"use client"
import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Валідація
        const errors = {};


        if (Object.keys(errors).length > 0) {
            setErrorMessage('Будь ласка, заповніть всі обов\'язкові поля.');
            setSuccessMessage('');
            return;
        }

        try {
            const response = await fetch('http://2823362.ni514080.web.hosting-test.net/mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData),
            });

            const result = await response.text();

            if (response.ok) {
                setSuccessMessage(result);
                setErrorMessage('');
            } else {
                setErrorMessage(result);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Помилка відправлення форми:', error);
            setErrorMessage('Виникла помилка під час відправлення форми.');
            setSuccessMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex gap-10 w-full">
                <div className="col w-full">
                    <h2>Ваше ім'я</h2>
                    <input
                        type="text"
                        className={`border-2 border-gray-200 rounded py-4 px-8 my-2 w-full ${validationErrors.name && 'border-red-500'}`}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {validationErrors.name && <p className="text-red-500">{validationErrors.name}</p>}
                </div>
                <div className="col w-full">
                    <h2>Ваш Email</h2>
                    <input
                        type="text"
                        className={`border-2 border-gray-200 rounded py-4 px-8 my-2 w-full ${validationErrors.email && 'border-red-500'}`}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
                </div>
            </div>

            <h2>Номер телефону</h2>
            <input
                type="text"
                className={`border-2 border-gray-200 rounded py-4 px-8 my-2 w-full ${validationErrors.phoneNumber && 'border-red-500'}`}
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
            />
            {validationErrors.phoneNumber && <p className="text-red-500">{validationErrors.phoneNumber}</p>}

            <h2>Ваше повідомлення</h2>
            <textarea
                className={`border-2 border-gray-200 rounded py-4 px-8 my-2 w-full ${validationErrors.message && 'border-red-500'}`}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
            />
            {validationErrors.message && <p className="text-red-500">{validationErrors.message}</p>}

            {successMessage && <div className="text-green-500">{successMessage}</div>}
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}

            <button
                className='ease-in duration-300 border rounded-sm py-4 px-8 hover:bg-gray-800 hover:text-white cursor-pointer'
                type="submit"
            >
                Надіслати
            </button>
        </form>
    );
};

export default ContactForm;
