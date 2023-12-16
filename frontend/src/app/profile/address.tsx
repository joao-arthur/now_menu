import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { useGetUser, usePatchUser } from "../../api/user.api";
import { Field } from "../../components/Field/Field";
import { Form } from "../../components/Form/Form";
import {
    Button,
    FlexContainer,
    FlexContent,
    Title,
} from "../../components/Layout";
import { PageHeader } from "../../components/PageHeader/PageHeader";

export function EditAddress() {
    const [cep, setCEP] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const { data, isPending: isPendingGet, mutate: mutateGet } =
        useGetUser();
    const {
        isPending: isPendingPatch,
        mutate: mutatePatch,
        isSuccess,
    } = usePatchUser({
        cep,
        address,
        district,
        city,
        state,
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

    if (isSuccess) {
        redirect("/orders");
    }
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink="/profile" />
                <Title>Endereço</Title>
                <Form onSubmit={() => mutatePatch()}>
                    <Field
                        title="CEP"
                        name="cep"
                        type="mask"
                        mask="99999-999"
                        required
                        value={cep}
                        onChange={setCEP}
                    />
                    <Field
                        title="Endereço"
                        name="address"
                        type="text"
                        required
                        value={address}
                        onChange={setAddress}
                    />
                    <Field
                        title="Bairro"
                        name="bairro"
                        type="text"
                        required
                        value={district}
                        onChange={setDistrict}
                    />
                    <Field
                        title="Cidade"
                        name="city"
                        type="text"
                        required
                        value={city}
                        onChange={setCity}
                    />
                    <Field
                        title="Estado"
                        name="state"
                        type="text"
                        required
                        value={state}
                        onChange={setState}
                    />
                    <Button
                        disabled={isPendingGet || isPendingPatch ||
                            !validForm}
                    >
                        Salvar informações
                    </Button>
                </Form>
            </FlexContent>
        </FlexContainer>
    );
}
