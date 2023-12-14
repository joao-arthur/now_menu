import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Image } from "../../Components/Image/Image";
import { PageHeader } from "../../Components/PageHeader/PageHeader";
import {
    ButtonLink,
    FlexContainer,
    FlexContent,
    Subtitle,
    Title,
} from "../../Components/Layout";
import { userActions } from "../../Domains/user";
import { signUpActions } from "../../Domains/signUp";

export function SignUpSuccess() {
    const dispatch = useAppDispatch();
    const signUpSuccess = useAppSelector(({ signUp }) =>
        signUp.success
    );

    useEffect(() => {
        if (!signUpSuccess) return;
        dispatch(userActions.setLogged(true));
        dispatch(signUpActions.clearSignUpAfterLogin());
    }, []);

    if (!signUpSuccess) redirect("/signin");

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader showSkipLink />
                <Title>Cadastro completo!</Title>
                <Subtitle>
                    Parabéns! seu cadastro está finalizado, agora você
                    precisa cadastrar o seu cardápio
                </Subtitle>
                <Image
                    name="signupSuccess"
                    width={300}
                    height={300}
                />
                <ButtonLink to="/menu/register">
                    Cadastrar cardápio
                </ButtonLink>
            </FlexContent>
        </FlexContainer>
    );
}
