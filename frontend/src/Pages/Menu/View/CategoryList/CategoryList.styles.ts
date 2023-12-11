import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    overflow-x: auto;
    padding: 15px 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
    :-webkit-scrollbar {
        display: none;
    }
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
`;

export const Item = styled.span`
    cursor: pointer;
    padding: 0 10px;
    white-space: nowrap;
`;

export const SelectedItem = styled.span`
    padding: 0 10px;
    white-space: nowrap;
`;
