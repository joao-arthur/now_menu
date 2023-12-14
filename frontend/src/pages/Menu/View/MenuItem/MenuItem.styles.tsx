import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    margin: 5px 0;
    gap: 0 10px;
    width: 100%;
`;

type imageProps = {
    disabled: boolean;
};

export const Image = styled.img<imageProps>`
    width: 70px;
    height: 70px;
    border-radius: 7px;
    ${({ disabled }) => (disabled ? "opacity: 0.4;" : "")}
    object-fit: cover;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const Description = styled.span`
    font-size: 0.7rem;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
`;

export const Time = styled.span`
    font-size: 0.7rem;
`;

export const Price = styled.span`
    font-size: 0.7rem;

    display: block;
`;
