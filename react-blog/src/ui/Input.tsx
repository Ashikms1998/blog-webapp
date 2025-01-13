import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
    return (
        <input
            className={`px-3 py-2 border rounded w-full focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
            {...props}
        />
    );
};

export default Input;
