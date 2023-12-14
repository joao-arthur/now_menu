import styled from "styled-components";

export const Image = styled.img`
    width: 100%;
    height: 150px;
    border-radius: 7px;
    object-fit: cover;
`;

export const Title = styled.h3`
    font-size: 1rem;
    margin-bottom: 10px;
`;

export const Observation = styled.span`
    font-size: 0.9rem;
    color: gray;
`;

export const PrepareTime = styled.div`
    margin-top: 5px;
    font-size: 0.7rem;
    color: gray;
`;

export const AddDiv = styled.div`
    display: flex;
`;

export const AddContainer = styled.div<{ enabled: boolean }>`
    margin-left: 10px;
    border-radius: 7px;
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;

    ${({ enabled }) =>
    enabled
        ? `background-color: var(--primary); cursor: pointer;`
        : `background-color: var(--primaryDisabled);`}
`;

export const Add = styled.span`
    color: white;
    font-size: 0.9rem;
`;

export const Price = styled.span`
    color: white;
    font-size: 0.9rem;
    font-weight: bold;
`;
