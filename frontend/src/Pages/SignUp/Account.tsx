import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Checkbox } from '../../Components/Checkbox/Checkbox';
import { Field } from '../../Components/Field/Field';
import { PageHeader } from '../../Components/PageHeader/PageHeader';
import {
    Title,
    Subtitle,
    Button,
    Link,
    PrimaryText,
    SecondaryAction,
    FlexContainer,
    FlexContent
} from '../../Components/Layout';
import { signUpActions } from '../../Domains/signUp';
import { Form } from '../../Components/Form/Form';
import { useSignUp } from '../../Api/user.api';

export function SignUpAccount() {
    const dispatch = useAppDispatch();
    const [acceptedTerms, setAcceptedTerm] = useState(false);
    const {
        cnpj,
        name,
        telephone,
        cep,
        address,
        district,
        city,
        state,
        email,
        password,
        passwordMatch,
        success
    } = useAppSelector(({ signUp }) => signUp);

    const validForm =
        email &&
        password &&
        passwordMatch &&
        password === passwordMatch &&
        acceptedTerms;

    const { isSuccess, isLoading, data, mutate } = useSignUp({
        cnpj,
        name,
        telephone,
        cep,
        address,
        district,
        city,
        state,
        email,
        password
    });

    function submit() {
        if (!validForm) return;
        mutate();
    }

    if (isSuccess) {
        window.localStorage.setItem(
            '@NOW_MENU/user/token',
            JSON.stringify(data)
        );
        dispatch(signUpActions.setSuccess(true));
    }

    if (success) return <Redirect to='/signup/success' />;
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink='/signup/address' />
                <Title>Informações de login</Title>
                <Subtitle>Por favor preencha para continuar</Subtitle>
                <Form onSubmit={submit}>
                    <Field
                        title='E-mail'
                        name='email'
                        type='email'
                        required
                        value={email}
                        onChange={newValue =>
                            dispatch(signUpActions.setEmail(newValue))
                        }
                        disabled={isLoading}
                    />
                    <Field
                        title='Senha'
                        name='password'
                        type='password'
                        required
                        value={password}
                        onChange={newValue =>
                            dispatch(signUpActions.setPassword(newValue))
                        }
                        disabled={isLoading}
                    />
                    <Field
                        title='Digite a senha novamente'
                        name='passwordMatch'
                        type='password'
                        required
                        value={passwordMatch}
                        onChange={newValue =>
                            dispatch(signUpActions.setPasswordMatch(newValue))
                        }
                        disabled={isLoading}
                    />
                    <Checkbox
                        value={acceptedTerms}
                        onChange={setAcceptedTerm}
                        disabled={isLoading}
                    >
                        Li e aceito os{' '}
                        <PrimaryText>termos de privacidade</PrimaryText> e{' '}
                        <PrimaryText>termos de uso</PrimaryText>
                    </Checkbox>
                    <Button disabled={!validForm || isLoading}>
                        Cadastrar
                    </Button>
                </Form>
                <SecondaryAction>
                    <Link to='/signin'>
                        Já possui uma conta? <PrimaryText>Entrar!</PrimaryText>
                    </Link>
                </SecondaryAction>
            </FlexContent>
        </FlexContainer>
    );
}
