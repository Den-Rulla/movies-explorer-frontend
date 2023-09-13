import { useEffect } from 'react';

export default function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlayClick = (e) => {
      if (
        e.target.classList.contains('mobile-nav_active') || // мобильное меню
        e.target.classList.contains('mobile-nav__close-btn') // мобильное меню
      ) {
        closePopup();
      }
    };

    const handleEscapeClick = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleOverlayClick);
    document.addEventListener('keydown', handleEscapeClick);

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
      document.removeEventListener('keydown', handleEscapeClick);
    };
  }, [isOpen, closePopup]);
}
