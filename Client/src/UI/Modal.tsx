interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    rounded?: string;
    bgColor?: string;
    closeBtn?: boolean;
    padding?: string;
    opacity?: number;
}

export default function Modal({
    isOpen,
    onClose,
    children,
    rounded = 'rounded-lg',
    closeBtn = true,
    padding = 'p-4',
    bgColor = 'bg-white',
    opacity = 50,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className={`fixed inset-0 bg-black opacity-${opacity}`} onClick={onClose}></div>
            <div className={` z-10 ${bgColor} ${padding} shadow-lg ${rounded} overflow-hidden`}>
                {children}
                {closeBtn && (
                    <button
                        onClick={onClose}
                        className='absolute right-0 top-0 m-2 text-gray-600 hover:text-gray-800'
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}
