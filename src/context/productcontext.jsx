import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/productReducer';

//https://api.pujakaitem.com/api/products
const AppContext = createContext();

// const API = "https://api.pujakaitem.com/api/products";
const API = "https://ngaxtqtjphtkyssalygr.supabase.co/rest/v1/products?select=*"

const AppProvider = ({ children }) => {

    const initialState = {
        isLoading: false,
        isError: false,
        products: [],
        featureProducts: [],
        isSingleLoading: false,
        singleProduct: {}
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    //Getting All Products
    const getProducts = async (url) => {
        dispatch({ type: "SET_LOADING", });
        try {
            const res = await axios.get(url, {
                headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nYXh0cXRqcGh0a3lzc2FseWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzODYyODMsImV4cCI6MjAwMzk2MjI4M30.lybay5FxL2drIz-HanSx-JLvxJZhBmiDHM_sKP3MME0",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nYXh0cXRqcGh0a3lzc2FseWdyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4ODM4NjI4MywiZXhwIjoyMDAzOTYyMjgzfQ.xeYb9sOv7xv0IsOjEoKj9vTyUxi3K29PHjsHj00HJRU"
                }
            });
            const products = await res.data;
            dispatch({ type: "SET_API_DATA", payload: products });
        } catch (error) {
            dispatch({ type: "API_ERROR", });
        }   
    }

    //Getting Single Products
    const getSingleProduct = async (url) => {
        dispatch({ type: "SET_SINGLE_LOADING", });
        try {
            const res = await axios.get(url, {
                headers: {
                    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nYXh0cXRqcGh0a3lzc2FseWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzODYyODMsImV4cCI6MjAwMzk2MjI4M30.lybay5FxL2drIz-HanSx-JLvxJZhBmiDHM_sKP3MME0",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nYXh0cXRqcGh0a3lzc2FseWdyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4ODM4NjI4MywiZXhwIjoyMDAzOTYyMjgzfQ.xeYb9sOv7xv0IsOjEoKj9vTyUxi3K29PHjsHj00HJRU"
                }
            });
            const singleProduct = await res.data[0];
            dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
        } catch (error) {
            dispatch({ type: "SET_SINGLE_ERROR", });
        }
    }

    useEffect(() => {
        getProducts(API);
    }, []);

    return (
        <>
            <AppContext.Provider value={{ ...state, getSingleProduct }}>{children}</AppContext.Provider>
        </>
    );
};

const useProductContext = () => {
    return useContext(AppContext);
}

export { AppProvider, AppContext, useProductContext };