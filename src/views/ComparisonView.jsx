import React from 'react';
import { ArrowLeft} from 'lucide-react';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ComparisonView = () => {
    const navigate = useNavigate(); // Hook for navigation
    const selectedProductIds = useSelector(state => state.comparison.selectedProductIds);
    const products = useSelector(state => state.products);

    const selectedProducts = products.items.filter(p => selectedProductIds.includes(p.id));

    const handleBackToList = () => {
        navigate('/');
    };

    if (selectedProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-gray-700 dark:text-gray-300">
                <p className="text-xl mb-4">No products selected for comparison.</p>
                <button
                    onClick={handleBackToList}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition-colors duration-200"
                >
                    <ArrowLeft className="inline-block w-4 h-4 mr-2" /> Back to Product List
                </button>
            </div>
        );
    }

    const allFeatures = Array.from(new Set(
        selectedProducts.flatMap(p => p.features)
    ));


    const isFeatureDifferent = (feature, products) => {
        const values = products.map(p => p.features.includes(feature) ? feature : 'N/A');
        return new Set(values).size > 1;
    };

    return (
        <div className="p-6 md:p-8 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <button
                onClick={handleBackToList}
                className="mb-6 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md font-semibold transition-colors duration-200 flex items-center"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Product List
            </button>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Product Comparison</h2>

            <div className="overflow-x-auto rounded-lg shadow-xl">
                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                    <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">Attribute</th>
                        {selectedProducts.map(product => (
                            <th key={product.id} className="py-3 px-4 text-center text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-full mb-2 border-2 border-gray-300 dark:border-gray-600"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/64x64/cccccc/333333?text=X'; }}
                                    />
                                    <span className="font-semibold text-gray-900 dark:text-gray-100">{product.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{product.brand}</span>
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                        <td className="py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">Price</td>
                        {selectedProducts.map(product => (
                            <td
                                key={product.id}
                                className={`py-3 px-4 text-center text-lg font-bold
                    ${isFeatureDifferent('price', selectedProducts.map(p => ({ features: [`${p.price}`] })))
                                    ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                                    : 'text-gray-900 dark:text-gray-100'
                                }`}
                            >
                                ${product.price.toFixed(2)}
                            </td>
                        ))}
                    </tr>
                    {allFeatures.map(feature => (
                        <tr key={feature}>
                            <td className="py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">{feature.split(':')[0].trim()}</td> {/* Display feature category */}
                            {selectedProducts.map(product => (
                                <td
                                    key={product.id}
                                    className={`py-3 px-4 text-center
                      ${isFeatureDifferent(feature, selectedProducts)
                                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium'
                                        : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    {product.features.includes(feature) ? feature.split(':').slice(1).join(':').trim() || feature : 'N/A'}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default  ComparisonView;