import React from 'react';
import { X, Check } from 'lucide-react';
import {useSelector, useDispatch } from 'react-redux';
import {toggleProductForComparison} from "../store/comparison.slice";

export const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const selectedProductIds = useSelector(state => state.comparison.selectedProductIds);
    const isSelected = selectedProductIds.includes(product.id);

    const handleAddRemoveCompare = () => {
        dispatch(toggleProductForComparison(product.id));
    };

    return (
        <div className={`
      relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden
      transform transition-transform duration-200 hover:scale-105
      flex flex-col
      ${isSelected ? 'border-4 border-blue-500 dark:border-blue-400' : 'border border-gray-200 dark:border-gray-700'}
    `}>
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x200/cccccc/333333?text=No+Image'; }}
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.brand}</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">${product.price.toFixed(2)}</p>

                <div className="flex-grow">
                    <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside mb-4">
                        {product.features.slice(0, 3).map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={handleAddRemoveCompare}
                    className={`
            w-full py-2 px-4 rounded-md font-semibold transition-colors duration-200
            ${isSelected
                        ? 'bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700'
                        : 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800'
                    }
          `}
                >
                    {isSelected? (
                        <span className="flex items-center justify-center">
              <X className="w-4 h-4 mr-2" /> Remove from Compare
            </span>
                    ) : (
                        <span className="flex items-center justify-center">
              <Check className="w-4 h-4 mr-2" /> Add to Compare
            </span>
                    )}
                </button>
            </div>
        </div>
    );
};