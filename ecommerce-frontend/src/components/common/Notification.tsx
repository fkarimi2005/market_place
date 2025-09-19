import React, { useEffect, useState } from 'react';

interface NotificationProps {
    message: string;
    type?: 'success' | 'error';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type = 'success', onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleAnimationEnd = () => {
        if (!visible) onClose();
    };

    return (
        <div
            className={`fixed top-5 right-5 px-4 py-2 rounded-md shadow-md text-white transition-opacity duration-500 ${
                visible ? 'opacity-100' : 'opacity-0'
            } ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
            onTransitionEnd={handleAnimationEnd}
        >
            {message}
        </div>
    );
};

export default Notification;
