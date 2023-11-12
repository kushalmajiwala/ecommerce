import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../helpers/supabase_setup";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {

    const initialState = {
        username: "",
        email: "",
        password: ""
    };

    const initialContactData = {
       contact: [],
       total_contact: 0
    }

    const [state, setState] = useState(initialState);
    const [contactData, setContactData] = useState(initialContactData);

    const getAdminDetailsByUsername = async (username) => {
        let { data } = await supabase.from('admin_details').select("*").eq("username", username);
        console.log(data);
        if (data) {
            setState({ ...state, username: data[0].username, email: data[0].email, password: data[0].password });
        }
        return data;
    }

    const getTotalUsers = async () => {

        let { data, error } = await supabase
            .from('user_details')
            .select('*')

        if (error) console.log(error);
        return data.length;
    }

    const getTotalProducts = async () => {
        let { data, error } = await supabase
            .from('products')
            .select('*')

        if (error) console.log(error);
        return data.length;
    }

    const getTotalCarts = async () => {
        let { data, error } = await supabase
            .from('cart')
            .select('*')

        if (error) console.log(error);
        return data.length;
    }

    const getTotalOrders = async () => {
        let { data, error } = await supabase
            .from('orders')
            .select('*')

        if (error) console.log(error);
        return data.length;
    }

    const updatePassword = async (username, newPassword) => {
        const { data, error } = await supabase
            .from('admin_details')
            .update({ password: newPassword })
            .eq('username', username)
            .select()
        if (error) console.log(error);
    }

    const getContactDetails = async () => {

        let { data, error } = await supabase
            .from('contact_details')
            .select('*')
        if(error) console.log(error);
        if(data)
        {
            setContactData({...contactData, contact: data, total_contact: data.length});
        }
    }

    useEffect(() => {
        getContactDetails();
    }, [])

    return (
        <AdminContext.Provider value={{ ...state, ...contactData, getAdminDetailsByUsername, getTotalUsers, getTotalProducts, getTotalCarts, getTotalOrders, updatePassword, getContactDetails }}>
            {children}
        </AdminContext.Provider>
    )
}

const useAdminContext = () => {
    return useContext(AdminContext);
}

export { AdminProvider, useAdminContext }