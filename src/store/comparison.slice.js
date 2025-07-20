import { createSlice } from '@reduxjs/toolkit';

const comparisonSlice = createSlice({
    name: 'comparison',
    initialState: {
        selectedProductIds: (() => {
            try {
                const storedIds = localStorage.getItem('selectedCompareProducts');
                return storedIds ? JSON.parse(storedIds) : [];
            } catch (error) {
                console.error("Failed to parse selected products from localStorage", error);
                return [];
            }
        })(),
        // currentPage is removed, react-router-dom will handle routing
        modal: {
            isOpen: false,
            message: ''
        }
    },
    reducers: {
        toggleProductForComparison: (state, action) => {
            const productId = action.payload;
            const isCurrentlySelected = state.selectedProductIds.includes(productId);

            if (isCurrentlySelected) {
                state.selectedProductIds = state.selectedProductIds.filter(id => id !== productId);
            } else {
                if (state.selectedProductIds.length < 3) {
                    state.selectedProductIds.push(productId);
                } else {
                    state.modal.message = 'You can only compare up to 3 products at a time.';
                    state.modal.isOpen = true;
                }
            }
        },
        clearComparison: (state) => {
            state.selectedProductIds = [];
            // Routing handled by navigate in component
        },
        removeIndividualFromComparison: (state, action) => {
            const productId = action.payload;
            state.selectedProductIds = state.selectedProductIds.filter(id => id !== productId);
            // Routing handled by navigate in component if needed
        },
        // setCurrentPage is removed, react-router-dom will handle routing
        openModal: (state, action) => {
            state.modal.message = action.payload;
            state.modal.isOpen = true;
        },
        closeModal: (state) => {
            state.modal.isOpen = false;
            state.modal.message = '';
        }
    },
});

export const {
    toggleProductForComparison,
    clearComparison,
    removeIndividualFromComparison,
    openModal,
    closeModal
} = comparisonSlice.actions;

export default  comparisonSlice;
