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
        if(isAuthenticated){
            let { data } = await supabase.from('wishlist').select("*").eq("email", user.email);
            console.log(data);
            if (data) {
                setState({ ...wishlistDetails, wishlist: data, wishlist_total_item: data.length });
            }
        }
    }

    useEffect(() => {
        getWishlistData();
    }, [isAuthenticated]);

    return (
        <WishlistContext.Provider value={{ ...wishlistDetails }}>
            {children}
        </WishlistContext.Provider>
    )
}

const useWishlistContext = () => {
    return useContext(WishlistContext);
}

export { WishlistProvider, useWishlistContext }; 