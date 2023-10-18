import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../helpers/supabase_setup";

const ContactContext = createContext();

const ContactProvider = ({ children }) => {

    const addContact = async (m, e) => {

        const contact_details = {
            message: m,
            email: e
        }
        const { data, error } = await supabase
            .from('contact_details')
            .insert(contact_details)
            
            if(error) console.log(error);
    }

    return (
        <ContactContext.Provider value={{ addContact }}>
            {children}
        </ContactContext.Provider>
    )
}

const useContactContext = () => {
    return useContext(ContactContext);
}

export { ContactProvider, useContactContext }