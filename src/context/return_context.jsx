import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import supabase from "../helpers/supabase_setup";

const ReturnContext = createContext();

const ReturnProvider = ({ children }) => {

    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    const initialReturnData = {
        return_products: [],
        return_products_total_item: 0
    }

    const [returnDetails, setReturnDetails] = useState(initialReturnData);

    const getReturnProductsData = async () => {
        let { data, error } = await supabase.from('return_product').select("*");
        if(error) console.log(error);
        if (data) {
            setReturnDetails({ ...returnDetails, return_products: data, return_products_total_item: data.length });
        }
    }

    const deleteReturnData = async (returnid) => {
        const { error } = await supabase
            .from('return_product')
            .delete()
            .eq('returnid', returnid);
        if(error) console.log(error);
        getReturnProductsData();
    }

    useEffect(() => {
        getReturnProductsData();
    }, []);

    return (
        <ReturnContext.Provider value={{ ...returnDetails, deleteReturnData }}>
            {children}
        </ReturnContext.Provider>
    )
}

const useReturnContext = () => {
    return useContext(ReturnContext);
}

export { ReturnProvider, useReturnContext }; 