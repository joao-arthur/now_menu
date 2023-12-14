import styled from "styled-components";
import {
    Button as ButtonBase,
    SecondaryButton as SecondaryButtonBase,
} from "../../Components/Layout";

export const Block = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
`;

export const Container = styled.div`
    position: absolute;
    width: 90%;
    height: 40%;
    background-color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    border-radius: 7px;
`;

export const Header = styled.div`
    padding: 10px;
`;

export const Title = styled.h3`
    font-size: 25px;
    font-weight: normal;
    margin: 0;
    user-select: none;
`;

export const Content = styled.div`
    padding: 10px;
    flex: 1;
    overflow: auto;
    display: flex;
    align-items: center;
`;

export const Footer = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const Button = styled(ButtonBase)`
    font-size: 1rem;
    font-weight: normal;
    margin-top: 0px;
    width: 47%;
`;

export const SecondaryButton = styled(SecondaryButtonBase)`
    font-size: 1rem;
    padding: 0.9rem;
    margin-top: 0px;
    width: 47%;
`;
