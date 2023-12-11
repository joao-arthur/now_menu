import styled from 'styled-components';

export const Container = styled.div`
    background-color: var(--backgroundGray);
    border-radius: 7px;
    display: flex;
`;

type buttonProps = {
    selectable: boolean;
};

export const Button = styled.div<buttonProps>`
    padding: 10px 8px;
    ${({ selectable }) => (selectable ? 'cursor: pointer;' : '')}
`;

export const Content = styled.div`
    margin: 10px 8px;
`;
