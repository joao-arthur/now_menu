import styled from 'styled-components';
import { Field } from '../../Components/Field/Field';

export const FieldsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
`;

export const CustomField = styled(Field)`
    min-width: 0;
`;
