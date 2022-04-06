import React from 'react';

const ConfirmModal = ({
  memoId,
  confirmHeading,
  confirmText,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm
}) => (
  <div className="base-modal">
    <div className="base-modal__content">
      <h4 className="base-modal__heading">{confirmHeading}</h4>
      <p className="base-modal__description">{confirmText}</p>
      <div className="base-modal__controls">
        <button
          type="button"
          className="action-btn warn"
          onClick={() => onCancel()}
        >
          {cancelButtonText}
        </button>
        <button
          type="button"
          className="action-btn success"
          onClick={() => onConfirm(memoId)}
        >
          {confirmButtonText}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
