import styled from 'styled-components';

type containerProps = {
    heightProp: number;
};

export const AppContainer = styled.div<containerProps>`
    ${({ heightProp }) => `height: ${heightProp}px;`};
    display: flex;
`;
