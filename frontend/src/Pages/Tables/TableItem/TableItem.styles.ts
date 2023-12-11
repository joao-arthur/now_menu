import styled from "styled-components";
import { Icon } from "../../../Components/Icon/Icon";

export const Container = styled.div`
    display: flex;
    height: 30px;
    align-items: center;
`;

export const TableName = styled.span`
    flex: 1;
`;

export const ButtonIcon = styled(Icon)`
    padding: 12px;
    cursor: pointer;
    border-radius: 6px;

    :active {
        background-color: lightgray;
    }
`;
