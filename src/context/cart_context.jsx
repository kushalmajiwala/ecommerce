import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import supabase from "../helpers/supabase_setup";

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    const initialState = {
        cart: [],
        total_item: 0,
        total_price: 0,
        shipping_fees: 50000,
        addr: "",
        pay_method: ""
    };

    const initialUserData = {
        addr: "",
        pay_method: ""
    }

    const [state, setState] = useState(initialState);
    const [userDetails, setUserDetails] = useState(initialUserData);

    const getAllCartData = async () => {
        if (isAuthenticated) {
            let { data } = await supabase.from('cart').select("*").eq("email", user.email);
            console.log(data);
            if (data) {
                let ptotal = 0;
                let titem = 0;
                data.map((curElem) => {
                    ptotal = ptotal + curElem.price * curElem.amount
                    titem = titem + curElem.amount
                })
                setState({ ...state, cart: data, total_item: titem, total_price: ptotal });
            }
        }
    }

    const addToCart = async (id, color, amount, product) => {
        if (isAuthenticated) {
            const insert_data = {
                id: id + color,
                email: user.email,
                amount: amount,
                color: color,
                image: product.image[0].url,
                max: product.stock,
                name: product.name,
                price: product.price,
                description: product.description
            }
            const { error } = await supabase
                .from('cart')
                .insert(insert_data)
                .select()
            if (error) console.log(error);
            getAllCartData();
        }
    }
    const removeItem = async (id) => {
        const { error } = await supabase
            .from('cart')
            .delete()
            .eq('uniqueid', id);
        if (error) console.log(error);
        getAllCartData();
    }
    const clearCart = async () => {
        const { error } = await supabase
            .from('cart')
            .delete()
            .eq("email", user.email);
        if (error) console.log(error);
        getAllCartData();
    }

    const setIncrease = async (id, amount, max) => {
        if (amount < max) {
            const { error } = await supabase
                .from('cart')
                .update({ amount: amount + 1 })
                .eq('uniqueid', id);
            if (error) console.log(error);
            getAllCartData();
        }
    }
    const setDecrease = async (id, amount) => {
        if (amount > 1) {
            const { error } = await supabase
                .from('cart')
                .update({ amount: amount - 1 })
                .eq('uniqueid', id);
            if (error) console.log(error);
            getAllCartData();
        }
    }
    const addUserDetails = async (e, a, p) => {

        const insert_data = {
            email: e,
            address: a,
            payment_method: p
        }

        let { data, err } = await supabase
            .from('user_details')
            .select('*')
            .eq("email", e)

        if (data.length > 0) {
            console.log(data);
            const { err } = await supabase
                .from('user_details')
                .update({
                    address: a,
                    payment_method: p
                })
                .eq("email", e)
            if (err) console.log(err);
        }
        else {
            console.log(e);
            const { error } = await supabase
                .from('user_details')
                .insert(insert_data)
            if (error) console.log(error);
        }
    }

    const getUserDetails = async () => {
        if (isAuthenticated) {
            let { data, error } = await supabase
                .from('user_details')
                .select('*')
                .eq("email", user.email)

            if (data.length > 0) {
                setUserDetails({addr: data[0].address, pay_method: data[0].payment_method})
            }
        }
    }

    useEffect(() => {
        getUserDetails();
        getAllCartData();
    }, [isAuthenticated]);

    return (
        <CartContext.Provider value={{ ...state, ...userDetails, addToCart, removeItem, clearCart, setDecrease, setIncrease, addUserDetails, getUserDetails }}>
            {children}
        </CartContext.Provider>
    )
}

const useCartContext = () => {
    return useContext(CartContext);
}

export { CartProvider, useCartContext }; 