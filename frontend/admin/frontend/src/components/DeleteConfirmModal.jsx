import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this item?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
};

export default DeleteConfirmModal;
