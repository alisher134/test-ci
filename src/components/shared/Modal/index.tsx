import type { ReactNode } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';

type Props = {
  className?: string;
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({
  className, children, onClose,
}: Props) => {
  const modalElement = document.getElementById('modal');

  return createPortal(
    <>
      <div className={clsx('overlay', className)} />
      <div className="modal">
        <div className="modal-header">
          <button className="modal-button" onClick={onClose}>
            close
          </button>
        </div>
        {children}
      </div>
    </>,
    modalElement,
  );
};

export default Modal;
