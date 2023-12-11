import styled from 'styled-components';
import { Icon as IconBase } from '../Icon/Icon';

export const Container = styled.div`
    display: flex;
    justify-content: space-around;
    bottom: 0;
    width: 100%;
    background: white;
    height: 51px;
    flex: 1 0 auto;
`;

type iconProps = {
    current: boolean;
};

export const Icon = styled(IconBase)<iconProps>`
    padding: 10px;
    cursor: pointer;
    ${({ current }) => (!current ? 'fill: gray;' : '')}
    height: 25px;
    width: 25px;
`;
