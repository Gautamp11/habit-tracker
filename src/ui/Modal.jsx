import React, { useEffect } from "react";

function Modal({ children, onShowForm }) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onShowForm(false); // Close modal on ESC key press
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeModal = (e) => {
    if (e.target.id === "modal-overlay") {
      onShowForm(false); // Close modal when clicking outside the content
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div className="bg-white p-6 rounded-lg relative shadow-lg max-w-md w-full">
        <button
          className="absolute top-2 right-2 text-black font-bold"
          onClick={() => onShowForm(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
