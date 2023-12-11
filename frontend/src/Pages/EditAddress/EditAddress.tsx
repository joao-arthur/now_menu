import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useGetUser, usePatchUser } from '../../Api/user.api';
import { Field } from '../../Components/Field/Field';
import { Form } from '../../Components/Form/Form';
import {
    Button,
    FlexContent,
    FlexContainer,
    Title
} from '../../Components/Layout';
import { PageHeader } from '../../Components/PageHeader/PageHeader';

export function EditAddress() {
    const [cep, setCEP] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const { data, isLoading: isLoadingGet, mutate: mutateGet } = useGetUser();
    const {
        isLoading: isLoadingPatch,
        mutate: mutatePatch,
        isSuccess
    } = usePatchUser({
        cep,
        address,
        district,
        city,
        state
    });
    const validForm = cep && address && district && city && state;

    useEffect(() => {
        mutateGet();
    }, []);

    useEffect(() => {
        if (data) {
            setCEP(data.cep);
            setAddress(data.address);
            setDistrict(data.district);
            setCity(data.city);
            setState(data.state);
        }
    }, [data]);

    if (isSuccess) return <Redirect to='/orders' />;
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink='/profile' />
                <Title>Endereço</Title>
                <Form onSubmit={() => mutatePatch()}>
                    <Field
                        title='CEP'
                        name='cep'
                        type='mask'
                        mask='99999-999'
                        required
                        value={cep}
                        onChange={setCEP}
                    />
                    <Field
                        title='Endereço'
                        name='address'
                        type='text'
                        required
                        value={address}
                        onChange={setAddress}
                    />
                    <Field
                        title='Bairro'
                        name='bairro'
                        type='text'
                        required
                        value={district}
                        onChange={setDistrict}
                    />
                    <Field
                        title='Cidade'
                        name='city'
                        type='text'
                        required
                        value={city}
                        onChange={setCity}
                    />
                    <Field
                        title='Estado'
                        name='state'
                        type='text'
                        required
                        value={state}
                        onChange={setState}
                    />
                    <Button
                        disabled={isLoadingGet || isLoadingPatch || !validForm}
                    >
                        Salvar informações
                    </Button>
                </Form>
            </FlexContent>
        </FlexContainer>
    );
}
