import ReactDOM from "react-dom";
import { ModalComponent, ModalProps } from "./ModalComponent";

type ManagerProps = ModalProps & {
    readonly visible: boolean;
};

export function Modal({ children, visible, ...props }: ManagerProps) {
    if (!visible) return null;
    const modalRoot = document.getElementById("modal");
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <ModalComponent {...props}>{children}</ModalComponent>,
        modalRoot,
    );
}
