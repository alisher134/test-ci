// components

import Button from "../Button";
import Modal from "../Modal";

type Props<T> = {
  className?: string;
  title?: string;
  description?: string;
  payload: T;
  onClose: () => void;
  onSuccess: (payload: T) => void;
};

const ConfirmModal = <T extends unknown>({
  className, title = 'Вы уверены?',
  description = 'Вы уверены, что хотите удалить это? Это действие нельзя отменить.',
  payload, onClose, onSuccess,
}: Props<T>) => (
  <Modal className={className} onClose={onClose}>
    <div className="confirm-modal">
      <h1 className="confirm-modal-title">{title}</h1>

      <p className="confirm-modal-description">{description}</p>

      <div className="confirm-modal-buttons">
        <Button onClick={() => onSuccess(payload)}>Удалить</Button>
        <Button onClick={onClose} variant="outline">Отменить</Button>
      </div>
    </div>
  </Modal>
  );

export default ConfirmModal;
