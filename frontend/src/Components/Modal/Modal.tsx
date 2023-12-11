import ReactDOM from 'react-dom';
import { ModalComponent, modalProps } from './ModalComponent';

export type managerProps = modalProps & {
    visible: boolean;
};

export function Modal({ children, visible, ...props }: managerProps) {
    if (!visible) return null;
    const modalRoot = document.getElementById('modal');
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <ModalComponent {...props}>{children}</ModalComponent>,
        modalRoot
    );
}
