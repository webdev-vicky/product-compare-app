import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import {ProductCard} from "../components/ProductCard";

const ProductList = () => {
    const products = useSelector(state => state.products);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.items.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-blue-700 dark:bg-blue-900 text-white placeholder-blue-200 dark:placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 dark:text-blue-300 w-5 h-5" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-8 text-center">Available Products</h2>
            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-600 dark:text-gray-400 text-lg">No products found matching your search.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </>
    );
};

export default  ProductList;
