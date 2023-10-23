import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../helpers/supabase_setup";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {

    const initialState = {
        username: "",
        email: "",
        password: ""
    };

    const [state, setState] = useState(initialState);

    const getAdminDetailsByUsername = async (username) => {
        let { data } = await supabase.from('admin_details').select("*").eq("username", username);
        console.log(data);
        if (data) {
            setState({ ...state, username: data[0].username, email: data[0].email, password: data[0].password });
        }
        return data;
    }

    return (
        <AdminContext.Provider value={{ ...state, getAdminDetailsByUsername }}>
            {children}
        </AdminContext.Provider>
    )
}

const useAdminContext = () => {
    return useContext(AdminContext);
}

export { AdminProvider, useAdminContext }