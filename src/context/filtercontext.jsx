import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productcontext";
import reducer from '../reducers/filterReducer';

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: "",
    filters: {
        text: "",
        category: "All",
        company: "All",
        color: "All",
        maxPrice: 0,
        price: 0,
        minPrice: 0
    },
    active_category: "All",
}

export const FilterContextProvider = ({ children }) => {
    const { products } = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    const setGridView = () => {
        return dispatch({ type: "SET_GRID_VIEW" });
    }

    const setListView = () => {
        return dispatch({ type: "SET_LIST_VIEW" });
    }

    const sorting = (e) => {
        let userValue = e.target.value;
        dispatch({ type: "GET_SORT_VALUE", payload: userValue });
    }

    const updateFilterValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        return dispatch({ type: "UPDATE_FILTERS_VALUES", payload: { name, value } })
    }
    const clearFilters = () => {
        document.getElementById('company').selectedIndex = 0;
        dispatch({ type: "CLEAR_FILTERS", payload: products })
    }

    useEffect(() => {  
        dispatch({ type: "FILTER_PRODUCTS" }); 
        dispatch({ type: "SORTING_PRODUCTS" });
    }, [products, state.sorting_value, state.filters]);

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
    }, [products]);

    return (
        <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting, updateFilterValue, clearFilters }}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}

