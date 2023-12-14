import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-self: center;
    flex: 0 auto;
`;

type buttonProps = {
    selectable: boolean;
};

export const Button = styled.div<buttonProps>`
    background-color: var(--backgroundGray);
    border-radius: 7px;
    padding: 10px 8px;
    ${({ selectable }) => (selectable ? "cursor: pointer;" : "")}
`;

export const Content = styled.div`
    margin: 10px 8px;
`;
