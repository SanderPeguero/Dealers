import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const Toast = ({ type = 'success', message, isOpen, duration = 2000, onClose }) => {
    const [visible, setVisible] = useState(isOpen);

    useEffect(() => {
        let timer;
        if (isOpen) {
            setVisible(true);
            timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, duration);
        } else {
            setVisible(false);
        }

        return () => clearTimeout(timer);
    }, [isOpen, duration, onClose]);

    if (!visible) return null;

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const Icon = type === 'success' ? FaCheck : MdClose;

    return (
        <div className={`fixed right-4 top-4 z-50 rounded-md ${bgColor} px-4 py-2 text-white transition`}>
            <div className="flex items-center space-x-2">
                <Icon className="text-3xl" />
                <p className="font-bold">{message}</p>
            </div>
        </div>
    );
};

export default Toast;
