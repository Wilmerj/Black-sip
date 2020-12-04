import React from 'react';

import ContactForm from "../../components/contactForm";
import ShoppingCar from "../../components/shoppingCar";

import indexStyles from "./index.module.scss";

export default function Home() {
    return (
        <div className={indexStyles.generalContainer}>
            <ContactForm />
            <ShoppingCar />
        </div>
    )
}
