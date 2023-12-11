import styled from 'styled-components';
import { Link as BaseLink } from '../Layout';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 3rem;
`;

export const Link = styled(BaseLink)`
    font-size: 0.8rem;
`;
