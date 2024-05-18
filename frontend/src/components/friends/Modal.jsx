

const Modal = ({open, onClose, children}) => {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center ${open ? "visible bg-black/20" : "invisible"}`}>

            <div onClick={(e) => e.stopPropagation()} 
            className={`bg-white p-5 rounded-lg shadow p-6 transition-all ${open ? "scale-100 opacity-100": "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50">

                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;