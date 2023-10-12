const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
            let priceArr = action.payload.map((curElem) => curElem.price);
            let maxPrice = Math.max(...priceArr);

            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice }
            }
        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view: true
            }
        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view: false
            }
        case "GET_SORT_VALUE":
            return {
                ...state,
                sorting_value: action.payload
            }
        case "SORTING_PRODUCTS":
            let newSortData;

            const { filter_products, sorting_value } = state;
            let tempSortProduct = [...filter_products];

            const sortingProducts = (a, b) => {
                if (sorting_value === "lowest") {
                    return a.price - b.price;
                }
                if (sorting_value === "highest") {
                    return b.price - a.price;
                }
                if (sorting_value === "a-z") {
                    return a.name.localeCompare(b.name);
                }
                if (sorting_value === "z-a") {
                    return b.name.localeCompare(a.name);
                }
            }

            newSortData = tempSortProduct.sort(sortingProducts);

            return {
                ...state,
                filter_products: newSortData,
            }

        case "UPDATE_FILTERS_VALUES":
            const { name, value } = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                }
            }

        case "FILTER_PRODUCTS":
            let { all_products } = state;
            let tempFilterProduct = [...all_products];

            const { text, category, company, color, price } = state.filters;

            let active_category = "All";

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.name.toLowerCase().includes(text);
                });
            }

            if (category !== "All") {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    if (category === currElem.category) {
                        active_category = currElem.category
                    }
                    return currElem.category === category;
                });
            }

            if (company !== "All") {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.company === company;
                });
            }
            if (color !== "All") {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.colors.includes(color)
                });
            }
            if (price === 0) {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.price === price;
                });
            }
            else {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.price <= price;
                });
            }

            return {
                ...state,
                filter_products: tempFilterProduct,
                active_category: active_category
            }

            case "CLEAR_FILTERS":
                let priceCompleteArr = action.payload.map((curElem) => curElem.price);
                let maximumPrice = Math.max(...priceCompleteArr);
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        text: "",
                        category: "All",
                        company: "All",
                        color: "All",
                        maxPrice: maximumPrice,
                        price: state.filters.maxPrice,
                        minPrice: 0
                    }
                }

        default:
            return state;
    }
}

export default filterReducer;