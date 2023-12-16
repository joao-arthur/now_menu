import styled from "styled-components";
import BaseLink from "next/link";

export const Link = styled(BaseLink)`
    text-decoration: none;
    color: inherit;
`;

export const ButtonLink = styled(BaseLink)`
    text-decoration: none;
    color: white;
    font-weight: bold;
    background-color: var(--primary);
    font-size: 1.1rem;
    padding: 0.9rem;
    border-radius: 7px;
    border: 0;
    margin-top: 20px;
    cursor: pointer;
    text-align: center;
`;

export const InputLink = styled(Link)`
    font-size: 0.8rem;
`;

export const Button = styled.button`
    color: white;
    font-weight: bold;
    background-color: var(--primary);
    font-size: 1.2rem;
    padding: 0.9rem;
    border-radius: 7px;
    border: 0;
    margin-top: 20px;
    cursor: pointer;

    :disabled {
        background-color: var(--primaryDisabled);
        cursor: default;
    }
`;

export const SecondaryButton = styled.button`
    color: var(--textColor);
    background-color: var(--backgroundGray);
    font-size: 0.8rem;
    padding: 0.5rem;
    border-radius: 7px;
    border: 0;
    margin-top: 5px;
    cursor: pointer;
`;

export const Text = styled.span`
    font-size: 0.8rem;
    color: #777;
    margin-top: 5px;
`;

export const AloneTitle = styled.h3`
    margin: 40px 0 10px;
`;

export const Title = styled.h3`
    margin: 0;
`;

export const Subtitle = styled.h5`
    margin: 0;
    font-weight: normal;
    font-size: 0.8rem;
    margin-bottom: 10px;
`;

export const PrimaryText = styled.span`
    color: var(--primary);
    font-weight: bold;
`;

export const LogoContainer = styled.div`
    align-self: center;
`;

export const SecondaryAction = styled.div`
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    padding-bottom: 2rem;
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

export const FlexContent = styled.div`
    padding-left: 10%;
    padding-right: 10%;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    overflow: auto;
    height: 100%;
`;

export const Padding = styled.div`
    padding-bottom: 2rem;
`;

export const FlexContentMax = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    overflow: auto;
    height: 100%;
`;
