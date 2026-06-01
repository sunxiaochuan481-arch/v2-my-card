// Modal 状态管理 hook
import { useState, useCallback } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = useCallback((data) => {
    setModalData(data);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalData(null);
    document.body.style.overflow = '';
  }, []);

  const toggleModal = useCallback((data) => {
    if (isOpen) {
      closeModal();
    } else {
      openModal(data);
    }
  }, [isOpen, openModal, closeModal]);

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
    toggleModal,
  };
}

export default useModal;
