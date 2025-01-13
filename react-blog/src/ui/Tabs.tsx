import React from 'react';

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    value: string;
    onValueChange: (value: string) => void;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    value: string;
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    value: string;
    activeValue: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, className = '', value, onValueChange, ...props }) => {
    return (
        <div
            className={`tabs-container ${className}`}
            {...props}
            onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.dataset.value) {
                    onValueChange(target.dataset.value);
                }
            }}
        >
            {children}
        </div>
    );
};

export const TabsList: React.FC<TabsListProps> = ({ children, className = '', ...props }) => {
    return <div className={`flex space-x-4 ${className}`} {...props}>{children}</div>;
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, className = '', value, ...props }) => {
    return (
        <button
            className={`px-4 py-2 border-b-2 border-transparent hover:border-blue-500 ${className}`}
            data-value={value}
            {...props}
        >
            {children}
        </button>
    );
};

export const TabsContent: React.FC<TabsContentProps> = ({ children, activeValue, className = '', value, ...props }) => {
    return (
        <div
            className={`p-4 ${className}`}
            style={{ display: value === activeValue ? 'block' : 'none' }}
            {...props}
        >
            {children}
        </div>
    );
};
