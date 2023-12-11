import { ReactChild } from 'react';
import {
    Block,
    Container,
    Content,
    Footer,
    Header,
    Title,
    SecondaryButton,
    Button
} from './Modal.styles';

export type modalProps = {
    children: ReactChild;
    title: string;
    onCancel: () => void;
    onConfirm: () => void;
    validForm: boolean;
    cancel: string;
    confirm: string;
};

export function ModalComponent({
    children,
    title,
    onCancel,
    onConfirm,
    validForm,
    cancel,
    confirm
}: modalProps) {
    return (
        <Block>
            <Container>
                <Header>
                    <Title>{title}</Title>
                </Header>
                <Content>{children}</Content>
                <Footer>
                    <SecondaryButton onClick={onCancel}>
                        {cancel}
                    </SecondaryButton>
                    <Button
                        onClick={() => {
                            if (validForm) onConfirm();
                        }}
                        disabled={!validForm}
                    >
                        {confirm}
                    </Button>
                </Footer>
            </Container>
        </Block>
    );
}
