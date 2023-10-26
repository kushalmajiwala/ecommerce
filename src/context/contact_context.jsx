import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../helpers/supabase_setup";

const ContactContext = createContext();

const ContactProvider = ({ children }) => {

    const addContact = async (m, e, u) => {

        const contact_details = {
            message: m,
            email: e,
            username: u
        }
        const { data, error } = await supabase
            .from('contact_details')
            .insert(contact_details)
            
            if(error) console.log(error);
    }

    const addFeedback = async (id, m, r, e) => {
        const feedback_details = {
            id: id, 
            message: m,
            rating: r,
            email: e
        }
        const { data, error } = await supabase
            .from('product_feedback')
            .insert(feedback_details)

            if(error) console.log(error);
    }

    return (
        <ContactContext.Provider value={{ addContact, addFeedback }}>
            {children}
        </ContactContext.Provider>
    )
}

const useContactContext = () => {
    return useContext(ContactContext);
}

export { ContactProvider, useContactContext }