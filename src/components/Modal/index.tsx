import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode | string;
}

const Modal: React.FC<Props> = ({ isOpen = false, onClose, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
