import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    margin: 5px 0;
    gap: 0 10px;
    width: 100%;
`;

export const Image = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 7px;
    flex: 0 0 auto;
    object-fit: cover;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 auto;
    min-width: 30px;
`;

export const Title = styled.span`
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const Price = styled.span`
    font-size: 0.7rem;

    display: block;
`;
