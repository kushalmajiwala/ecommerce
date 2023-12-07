import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import supabase from "../helpers/supabase_setup";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {

    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    const initialWishlistData = {
        wishlist: [],
        wishlist_total_item: 0
    }

    const [wishlistDetails, setWishlistDetails] = useState(initialWishlistData);

    const getWishlistData = async () => {
        if (isAuthenticated) {
            let { data } = await supabase.from('wishlist').select("*").eq("email", user.email);
            console.log(data);
            if (data) {
                setWishlistDetails({ ...wishlistDetails, wishlist: data, wishlist_total_item: data.length });
            }
        }
    }

    const addToWishlist = async (id, color, quantity, product) => {
        if (isAuthenticated) {
            const insert_data = {
                id: id,
                email: user.email,
                quantity: quantity,
                color: color,
                image: product.image[0].url,
                max: product.stock,
                name: product.name,
                price: product.price,
                description: product.description
            }
            const { error } = await supabase
                .from('wishlist')
                .insert(insert_data)
                .select()
            if (error) console.log(error);
            getWishlistData();
        }
    }

    const deleteWishlistItem = async (wishlistid) => {
        const { error } = await supabase
            .from('wishlist')
            .delete()
            .eq('wishid', wishlistid)
        
        if(error) console.log(error);
        getWishlistData();
    }

    useEffect(() => {
        getWishlistData();
    }, [isAuthenticated]);

    return (
        <WishlistContext.Provider value={{ ...wishlistDetails, addToWishlist, deleteWishlistItem }}>
            {children}
        </WishlistContext.Provider>
    )
}

const useWishlistContext = () => {
    return useContext(WishlistContext);
}

export { WishlistProvider, useWishlistContext }; 