import { useMutation } from 'react-query';
import { Fetch } from '../Core/Fetch';
import { Toast } from '../Components/Toast';

type userType = {
    cnpj: string;
    name: string;
    telephone: string;
    cep: string;
    address: string;
    district: string;
    city: string;
    state: string;
    email: string;
    password: string;
};

type userFromAPI = {
    cnpj: string;
    name: string;
    telephone: string;
    cep: string;
    address: string;
    district: string;
    city: string;
    state: string;
    email: string;
};

export function useSignUp(user: userType) {
    return useMutation('signUp', () =>
        Toast(Fetch.post('user', user), {
            loading: 'Cadastrando...',
            error: 'Não foi possível cadastrar sua conta!',
            success: `Bem-vindo "${user.name}"!`
        })
    );
}

export function useGetUser() {
    return useMutation('getUser', () => Fetch.get<userFromAPI>('user'));
}

export function usePatchUser(user: Partial<userFromAPI>) {
    return useMutation('patchUser', () =>
        Toast(Fetch.patch('user', user), {
            loading: 'Atualizando suas informações...',
            error: 'Não foi possível atualizar seus dados!',
            success: 'Dados atualizados com sucesso!'
        })
    );
}
