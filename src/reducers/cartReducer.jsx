
const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            let { id, color, amount, product } = action.payload;

            let existingProduct = state.cart.find((curItem) => {
                return curItem.id === id + color
            });

            if (existingProduct) {
                let updatedProduct = state.cart.map((curItem) => {
                    if (curItem.id === id + color) {
                        let newAmount = curItem.amount + amount;

                        if (newAmount >= curItem.max) {
                            newAmount = curItem.max;
                        }

                        return {
                            ...curItem,
                            amount: newAmount
                        }
                    }
                    else {
                        return {
                            ...curItem,
                        }
                    }
                })
                return {
                    ...state,
                    cart: updatedProduct
                }
            }
            else {
                let cartProduct;
                cartProduct = {
                    id: id + color,
                    name: product.name,
                    color,
                    amount,
                    image: product.image[0].url,
                    price: product.price,
                    max: product.stock
                };
                return {
                    ...state,
                    cart: [...state.cart, cartProduct],
                }
            }
        case "SET_DECREMENT":
            let updatedProductDec = state.cart.map((currItem) => {
                if (currItem.id === action.payload) {
                    let decAmount;
                    if (currItem.amount === 1) {
                        decAmount = 1;
                    }
                    else {
                        decAmount = currItem.amount - 1;
                    }
                    return {
                        ...currItem,
                        amount: decAmount
                    }
                }
                else {
                    return currItem;
                }
            })
            return {
                ...state,
                cart: updatedProductDec
            }
        case "SET_INCREMENT":
            let updatedProductInc = state.cart.map((currItem) => {
                if (currItem.id === action.payload) {
                    let decAmount;
                    if (currItem.amount === currItem.max) {
                        decAmount = currItem.max;
                    }
                    else {
                        decAmount = currItem.amount + 1;
                    }
                    return {
                        ...currItem,
                        amount: decAmount
                    }
                }
                else {
                    return currItem;
                }
            })
            return {
                ...state,
                cart: updatedProductInc
            }
        case "REMOVE_ITEM":
            let updatedCart = state.cart.filter((currItem) => {
                return currItem.id !== action.payload;
            })
            return {
                ...state,
                cart: updatedCart,
            }
        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
                total_item: 0
            }
        case "CART_TOTAL_ITEM":
            let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
                let { amount } = curElem;
                initialVal = initialVal + amount;
                return initialVal;
            }, 0)
            return {
                ...state,
                total_item: updatedItemVal
            }
        case "CART_TOTAL_PRICE":
            let total_price = state.cart.reduce((initialVal, curElem) => {
                let { price, amount } = curElem;
                initialVal = initialVal + (price * amount);
                return initialVal
            }, 0);
            return {
                ...state,
                total_price: total_price
            }
        default:
            return state;
    }
}

export default cartReducer