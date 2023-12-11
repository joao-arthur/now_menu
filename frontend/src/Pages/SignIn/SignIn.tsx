import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { Field } from '../../Components/Field/Field';
import { Form } from '../../Components/Form/Form';
import { Image } from '../../Components/Image/Image';
import {
    Title,
    Subtitle,
    Button,
    Link,
    LogoContainer,
    InputLink,
    PrimaryText,
    SecondaryAction,
    FlexContainer,
    FlexContent
} from '../../Components/Layout';
import { userActions } from '../../Domains/user';
import { signUpActions } from '../../Domains/signUp';
import { useSignIn } from './useSignIn';

export function SignIn() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const validForm = email && password;

    const { isSuccess, isLoading, data, mutate } = useSignIn({
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
        dispatch(userActions.setLogged(true));
        dispatch(signUpActions.clearSignUpAfterLogin());
    }

    return (
        <FlexContainer>
            <FlexContent>
                <LogoContainer>
                    <Image name='logo' height={240} width={230} />
                </LogoContainer>
                <Title>Entrar</Title>
                <Subtitle>Por favor entre para continuar</Subtitle>
                <Form onSubmit={submit}>
                    <Field
                        title='E-mail'
                        name='login'
                        type='text'
                        required
                        value={email}
                        onChange={setEmail}
                        disabled={isLoading}
                    />
                    <Field
                        title='Senha'
                        name='password'
                        type='password'
                        required
                        observation={
                            <InputLink to='#'>Esqueceu a senha?</InputLink>
                        }
                        value={password}
                        onChange={setPassword}
                        disabled={isLoading}
                    />

                    <Button disabled={!validForm || isLoading}>Entrar</Button>
                </Form>
                <SecondaryAction>
                    <Link to='/signup'>
                        Novo por aqui? <PrimaryText>Cadastre-se!</PrimaryText>
                    </Link>
                </SecondaryAction>
            </FlexContent>
        </FlexContainer>
    );
}
