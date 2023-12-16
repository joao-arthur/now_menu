export type User = {
    readonly cnpj: string;
    readonly name: string;
    readonly telephone: string;
    readonly cep: string;
    readonly address: string;
    readonly district: string;
    readonly city: string;
    readonly state: string;
    readonly email: string;
    readonly password: string;
};

export type UserFromAPI = Omit<User, "password">;
