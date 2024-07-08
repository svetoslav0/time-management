interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='fixed inset-0 bg-black opacity-50' onClick={onClose}></div>
            <div className='z-10 rounded-lg bg-white p-4 shadow-lg'>
                {children}
                <button
                    onClick={onClose}
                    className='absolute right-0 top-0 m-2 text-gray-600 hover:text-gray-800'
                >
                    ×
                </button>
            </div>
        </div>
    );
}
