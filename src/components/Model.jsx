import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {closeModal} from "../store/comparison.slice";

export const Modal = () => {
    const dispatch = useDispatch();
    const { isOpen, message } = useSelector(state => state.comparison.modal);

    const handleClose = () => {
        dispatch(closeModal());
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{message}</p>
                <button
                    onClick={handleClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition-colors duration-200"
                >
                    Got It
                </button>
            </div>
        </div>
    );
};