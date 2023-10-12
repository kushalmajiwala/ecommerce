import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import supabase from "../helpers/supabase_setup";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {

    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    const initialState = {
        order: [],
        total_order: 0,
    };

    const [state, setState] = useState(initialState);

    const getAllOrderData = async () => {
        if (isAuthenticated) {
            let { data } = await supabase.from('orders').select("*").eq("email", user.email);
            console.log(data);
            if (data) {
                setState({ ...state, order: data, total_order: data.length });
            }
        }
    }

    const addOrderData = async (id, email, placed_date, placed_address, item_image, item_price, quantity, name, description) => {
        let actual_id = id.slice(0, -7);
        if (isAuthenticated) {
            const insert_data = {
                id: actual_id,
                email: email,
                placed_date: placed_date,
                placed_address: placed_address,
                item_image: item_image,
                item_price: item_price,
                quantity: quantity,
                name: name,
                description: description
            }
            const { error } = await supabase
                .from('orders')
                .insert(insert_data)
                .select()
            if (error) console.log(error);
            getAllOrderData();
        }
    }

    const cancelOrder = async (uniqueid) => {
        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('uniqueid', uniqueid)
        if(error) console.log(error);
        getAllOrderData();
    }

    useEffect(() => {
        getAllOrderData();
    }, [isAuthenticated]);

    return (
        <OrderContext.Provider value={{ ...state, addOrderData, cancelOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

const useOrderContext = () => {
    return useContext(OrderContext);
}

export { OrderProvider, useOrderContext }; 
