import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return (
        <div className={`border rounded-lg shadow-md p-4 ${className}`} {...props}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return <div className={`mb-4 font-bold text-lg ${className}`} {...props}>{children}</div>;
};

export const CardContent: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return <div className={`text-gray-700 ${className}`} {...props}>{children}</div>;
};

export const CardDescription: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return <p className={`text-sm text-gray-500 ${className}`} {...props}>{children}</p>;
};

export const CardTitle: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return <h3 className={`font-bold text-xl ${className}`} {...props}>{children}</h3>;
};
