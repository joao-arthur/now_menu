import styled from "styled-components";
import { SecondaryButton } from "../../../Components/Layout";

export const Content = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid var(--borderGray);
    font-size: 0.9rem;
`;

export const Client = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
`;

export const OrderItem = styled.div`
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
`;

export const Print = styled.div`
    padding-top: 15px;
    text-align: center;
    font-size: 0.9rem;
    cursor: pointer;
`;

export const StatusButton = styled(SecondaryButton)`
    cursor: default;
`;

export const ItemContainer = styled.div`
    margin: 12px 0;
`;

export const ItemName = styled.p`
    margin: 0;
    font-size: 1.1rem;
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
`;

export const ItemObservation = styled.p`
    margin: 0;
    font-size: 0.9rem;
`;

export const Total = styled.span`
    font-size: 1.2rem;
`;
