import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Field, FieldTitle } from '../../Components/Field/Field';
import { PageHeader } from '../../Components/PageHeader/PageHeader';
import {
    Title,
    Subtitle,
    Button,
    FlexContainer,
    FlexContent,
    Padding
} from '../../Components/Layout';
import { Form } from '../../Components/Form/Form';
import { menuRegisterActions } from '../../Domains/menuRegister';
import { FieldsContainer, CustomField } from './ItemRegister.styles';

export function MenuItemRegister() {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [prepareHours, setPrepareHours] = useState(0);
    const [prepareMinutes, setPrepareMinutes] = useState(0);
    const [prepareSeconds, setPrepareSeconds] = useState(0);
    const [price, setPrice] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const editingItem = useAppSelector(
        ({ menuRegister }) => menuRegister.currentItemId
    );
    const items = useAppSelector(({ menuRegister }) =>
        menuRegister.categories.flatMap(({ items }) => items)
    );
    const validForm =
        name &&
        description &&
        (prepareHours || prepareMinutes || prepareSeconds) &&
        price;

    useEffect(() => {
        if (!editingItem) return;
        const currentItem = items.find(({ id }) => id === editingItem);
        if (!currentItem) return;

        const hours = Math.floor(currentItem.prepareTime / 3600);
        const minutes = Math.floor(
            (currentItem.prepareTime - hours * 3600) / 60
        );
        const seconds = Math.floor(
            currentItem.prepareTime - hours * 3600 - minutes * 60
        );

        setName(currentItem.name);
        setDescription(currentItem.description);
        setPrepareHours(hours);
        setPrepareMinutes(minutes);
        setPrepareSeconds(seconds);
        setPrice((currentItem.price / 100).toString().replace('.', ','));
    }, []);

    function submit() {
        if (!validForm) return;
        if (editingItem) {
            dispatch(
                menuRegisterActions.editCategoryItem({
                    name,
                    description,
                    prepareTime:
                        prepareHours * 3600 +
                        prepareMinutes * 60 +
                        prepareSeconds,
                    price: Number(price.replace(',', '.')) * 100
                })
            );
        } else
            dispatch(
                menuRegisterActions.addCategoryItem({
                    name,
                    description,
                    prepareTime:
                        prepareHours * 3600 +
                        prepareMinutes * 60 +
                        prepareSeconds,
                    price: Number(price.replace(',', '.')) * 100
                })
            );
        setSubmitted(true);
    }

    if (submitted) return <Redirect to='/menu/register' />;
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink='/menu/register' />
                <Title>Adicionar produto</Title>
                <Subtitle>Por favor preencha para continuar</Subtitle>
                <Form onSubmit={submit}>
                    <Field
                        title='Nome'
                        name='name'
                        type='text'
                        required
                        value={name}
                        onChange={setName}
                    />
                    <Field
                        title='Descrição'
                        name='description'
                        type='textarea'
                        required
                        value={description}
                        onChange={setDescription}
                    />
                    <FieldTitle>Tempo estimado de preparo</FieldTitle>
                    <FieldsContainer>
                        <CustomField
                            title='Hora(s)'
                            name='prepareHours'
                            type='number'
                            required
                            value={prepareHours}
                            onChange={newValue => {
                                if (
                                    Number(newValue) > -1 &&
                                    Number(newValue) < 24
                                )
                                    setPrepareHours(Number(newValue));
                            }}
                            min={0}
                            max={23}
                        />
                        <CustomField
                            title='Minuto(s)'
                            name='prepareMinutes'
                            type='number'
                            required
                            value={prepareMinutes}
                            onChange={newValue => {
                                if (
                                    Number(newValue) > -1 &&
                                    Number(newValue) < 60
                                )
                                    setPrepareMinutes(Number(newValue));
                            }}
                            min={0}
                            max={59}
                        />
                        <CustomField
                            title='Segundo(s)'
                            name='prepareSeconds'
                            type='number'
                            required
                            value={prepareSeconds}
                            onChange={newValue => {
                                if (
                                    Number(newValue) > -1 &&
                                    Number(newValue) < 60
                                )
                                    setPrepareSeconds(Number(newValue));
                            }}
                            min={0}
                            max={59}
                        />
                    </FieldsContainer>
                    <Field
                        title='Preço'
                        name='price'
                        type='money'
                        required
                        value={price}
                        onChange={setPrice}
                    />
                    <Field title='Foto' name='picture' type='file' />
                    <Button disabled={!validForm}>
                        {editingItem ? 'Salvar edição' : 'Adicionar produto'}
                    </Button>
                </Form>
                <Padding />
            </FlexContent>
        </FlexContainer>
    );
}
