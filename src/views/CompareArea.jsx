import React  from 'react';
import { Trash2, Contrast, X} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {clearComparison, openModal, removeIndividualFromComparison} from "../store/comparison.slice";

const CompareArea = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook for navigation
    const selectedProductIds = useSelector(state => state.comparison.selectedProductIds);
    const products = useSelector(state => state.products);

    const selectedProducts = products.items.filter(p => selectedProductIds.includes(p.id));

    const handleClearAll = () => {
        dispatch(clearComparison());
        navigate('/'); // Navigate back to home/list page
    };

    const handleRemoveIndividual = (productId) => {
        dispatch(removeIndividualFromComparison(productId));
        if (selectedProducts.filter(p => p.id !== productId).length < 2 && window.location.pathname === '/compare') {
            navigate('/');
        }
    };

    const handleCompareClick = () => {
        if (selectedProductIds.length >= 2) {
            navigate('/compare');
        } else {
            dispatch(openModal('Please select at least 2 products to compare.'));
        }
    };

    if (selectedProducts.length < 2) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-700 dark:bg-blue-900 text-white p-4 shadow-lg z-50">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0 overflow-x-auto pb-2 sm:pb-0">
          <span className="text-lg font-semibold flex-shrink-0">
            Selected for Comparison ({selectedProducts.length}/3):
          </span>
                    <div className="flex space-x-2">
                        {selectedProducts.map(product => (
                            <div key={product.id} className="flex items-center bg-blue-800 dark:bg-blue-950 rounded-full pr-3 pl-2 py-1 text-sm">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-6 h-6 rounded-full mr-2 object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/24x24/cccccc/333333?text=X'; }}
                                />
                                <span className="truncate max-w-[100px]">{product.name}</span>
                                <button
                                    onClick={() => handleRemoveIndividual(product.id)}
                                    className="ml-2 text-white hover:text-red-300 transition-colors duration-200"
                                    aria-label={`Remove ${product.name}`}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex space-x-3 w-full sm:w-auto">
                    <button
                        onClick={handleClearAll}
                        className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition-colors duration-200"
                    >
                        <Trash2 className="inline-block w-4 h-4 mr-2" /> Clear All
                    </button>
                    <button
                        onClick={handleCompareClick}
                        className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold transition-colors duration-200"
                    >
                        <Contrast className="inline-block w-4 h-4 mr-2" /> Compare Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompareArea;