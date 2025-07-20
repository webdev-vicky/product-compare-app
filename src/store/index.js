import { configureStore } from '@reduxjs/toolkit';
import productsSlice from "./products.slice";
import comparisonSlice from "./comparison.slice";

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        comparison: comparisonSlice.reducer,
    },
});

export default  store;