import styled from 'styled-components';
import { Icon } from '../Icon/Icon';

export const Container = styled.div`
    background-color: var(--backgroundGray);
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    margin: 5px 0;
`;

export const TitleContainer = styled.div`
    border-bottom: 1px solid var(--borderGray);
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.span`
    font-weight: bold;
    font-size: 0.9rem;
`;

export const ItemsContainer = styled.div``;

export const Line = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--borderGray);
    padding: 10px 15px 10px 20px;
`;

export const ItemContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    min-height: 0%;
    overflow: auto;
`;

export const IconContainer = styled.div`
    display: flex;
    padding-left: 10px;
    font-size: 0.9rem;
    flex: 0;
`;

export const ButtonIcon = styled(Icon)`
    padding: 7px;
    cursor: pointer;
    border-radius: 6px;

    :active {
        background-color: lightgray;
    }
`;

export const DeleteCategory = styled(Icon)`
    padding: 5px;
    cursor: pointer;
    border-radius: 6px;
    height: 17px;
    width: 17px;

    :active {
        background-color: lightgray;
    }
`;

export const ItemName = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const ItemValue = styled.div`
    margin-left: 1px;
`;

export const AddItemMessage = styled.div`
    padding: 10px 0;
    font-size: 0.8rem;
    text-align: center;
    cursor: pointer;
`;
