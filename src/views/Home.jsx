import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { Routes, Route} from 'react-router-dom';
import ProductList from "./ProductList";
import ComparisonView from "./ComparisonView";
import CompareArea from "./CompareArea";
import {Modal} from "../components/Model";
import {fetchProducts} from "../store/products.slice";

const  Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    const selectedProductIds = useSelector(state => state.comparison.selectedProductIds);
    useEffect(() => {
        try {
            localStorage.setItem('selectedCompareProducts', JSON.stringify(selectedProductIds));
        } catch (error) {
            console.error("Failed to save selected products to localStorage", error);
        }
    }, [selectedProductIds]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-md sticky top-0 z-40">
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                    <h1 className="text-2xl font-bold mb-2 sm:mb-0">TechSpec Compare</h1>
                </div>
            </header>

            <main className="container mx-auto p-4 pb-20">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/compare" element={<ComparisonView />} />
                    <Route path="*" element={<h2 className="text-center text-xl text-gray-600 dark:text-gray-400 mt-10">Page Not Found</h2>} />
                </Routes>
            </main>

            <CompareArea />

            <Modal />
        </div>
    );
}

export default Home;