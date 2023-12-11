import styled from 'styled-components';

export const Container = styled.div`
    background-color: var(--backgroundGray);
    border-radius: 7px;
    margin-top: 8px;
`;

export const Body = styled.div`
    font-size: 0.9rem;
    padding: 10px 20px;
    border-bottom: 1px solid var(--borderGray);
    display: flex;
    justify-content: space-between;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-around;
    font-size: 0.9rem;
    padding: 18px 0;
`;

export const ItemContainer = styled.div`
    margin: 12px 0;
`;

export const ItemName = styled.p`
    margin: 0;
    font-size: 1.1rem;
`;

export const ItemObservation = styled.p`
    margin: 0;
    font-size: 0.9rem;
`;
