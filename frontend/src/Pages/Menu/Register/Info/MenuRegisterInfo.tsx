import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { Fetch } from '../../../../Core/Fetch';
import { CollapsableList } from '../../../../Components/CollapsableList/CollapsableList';
import { PageHeader } from '../../../../Components/PageHeader/PageHeader';
import {
    Title,
    Subtitle,
    Button,
    Text,
    SecondaryButton,
    FlexContent,
    FlexContainer,
    Padding
} from '../../../../Components/Layout';
import { menuRegisterActions } from '../../../../Domains/menuRegister';
import { Toast } from '../../../../Components/Toast';
import { Modal } from '../../../../Components/Modal/Modal';
import { Category, Input } from './MenuRegisterInfo.styles';

export function MenuRegisterInfo() {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(
        ({ menuRegister }) => menuRegister.categories
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [redirectToItem, setRedirectToItem] = useState(false);
    const validForm =
        !!categories.length &&
        !!categories.flatMap(category => category.items).length;

    function addItem(category: string) {
        dispatch(menuRegisterActions.setCurrentCategory(category));
        setRedirectToItem(true);
    }

    const { isSuccess, isLoading, mutate } = useMutation('menuRegister', () => {
        const items = categories.flatMap(category =>
            category.items.map(({ name, description, prepareTime, price }) => ({
                name,
                description,
                prepareTime,
                price,
                category: category.name
            }))
        );

        const request = Fetch.post('item/menu', items);

        return Toast(request, {
            loading: 'Cadastrando...',
            error: 'Não foi possível cadastrar o cardápio!',
            success: 'Cardápio cadastrado com sucesso!'
        });
    });

    useEffect(() => {
        dispatch(menuRegisterActions.setCurrentItem(undefined));
    }, []);

    function submit() {
        if (!validForm) return;
        mutate();
    }
    FlexContainer;

    if (redirectToItem) return <Redirect to='/menu/register/item' />;
    if (isSuccess) return <Redirect to='/menu/register/success' />;
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader showSkipLink />
                <Title>Cadastrar seu cardápio</Title>
                <Subtitle>Por favor preencha para continuar</Subtitle>
                <Category>Categorias</Category>
                {categories.map(category => (
                    <CollapsableList
                        key={category.name}
                        name={category.name}
                        items={category.items.map(item => ({
                            name: item.name,
                            value: (item.price / 100).toLocaleString(
                                undefined,
                                {
                                    style: 'currency',
                                    currency: 'BRL'
                                }
                            ),
                            id: item.id
                        }))}
                        addMessage='Adicionar produto'
                        onAddClick={addItem}
                        onDeleteCategory={() =>
                            dispatch(
                                menuRegisterActions.deleteCategory(
                                    category.name
                                )
                            )
                        }
                        onDeleteItem={id => {
                            dispatch(menuRegisterActions.deleteItem(id));
                        }}
                        onEditItem={id => {
                            dispatch(menuRegisterActions.setCurrentItem(id));
                            setRedirectToItem(true);
                        }}
                    />
                ))}
                <SecondaryButton onClick={() => setModalVisible(true)}>
                    Adicionar categoria
                </SecondaryButton>
                <Text>
                    Todas as informações poderão ser editadas posteriormente
                </Text>
                <Button disabled={!validForm || isLoading} onClick={submit}>
                    Finalizar cardápio
                </Button>
                <Padding />
            </FlexContent>
            <Modal
                title='Título da nova categoria'
                onCancel={() => setModalVisible(false)}
                onConfirm={() => {
                    dispatch(menuRegisterActions.addCategory(newCategoryName));
                    setNewCategoryName('');
                    setModalVisible(false);
                }}
                visible={modalVisible}
                validForm={!!newCategoryName}
                cancel='Cancelar'
                confirm='Adicionar'
            >
                <Input
                    name='newCategoryName'
                    type='text'
                    value={newCategoryName}
                    onChange={setNewCategoryName}
                />
            </Modal>
        </FlexContainer>
    );
}
