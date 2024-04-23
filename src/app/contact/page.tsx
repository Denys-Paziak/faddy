import React from 'react';
import ContactForm from "@/app/components/ContactForm/ContactForm";
import { Header } from "@/app/components/Header/Header";


const Contact = () => {
    return (
        <>
            <Header />
            <div className={"container mx-auto"}>
                <iframe className='w-full py-4' src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2621.8125508658213!2d24.712599711845808!3d48.91896349632266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDjCsDU1JzA4LjMiTiAyNMKwNDInNTQuNyJF!5e0!3m2!1sen!2sua!4v1702123053873!5m2!1sen!2sua" width="600" height="450" loading="lazy" ></iframe>
                <h2 className='py-4 text-2xl font-bold'>ЗВ'ЯЖІТЬСЯ З НАМИ З БУДЬ-ЯКИХ ПИТАНЬ</h2>
                <ContactForm />
            </div>
        </>

    );
};

export default Contact;
