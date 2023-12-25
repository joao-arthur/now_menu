export type AccountGeneral = {
    readonly cnpj: string;
    readonly name: string;
    readonly telephone: string;
};

export type AccountAddress = {
    readonly state: string;
    readonly city: string;
    readonly district: string;
    readonly address: string;
    readonly cep: string;
};

export type AccountLogin = {
    readonly email: string;
    readonly password: string;
};

export type Account = {
    readonly id: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly general: AccountGeneral;
    readonly address: AccountAddress;
    readonly login: AccountLogin;
};

export type AccountCreate = {
    readonly general: Account["general"];
    readonly address: Account["address"];
    readonly login: Account["login"];
};

export type AccountUpdate = {
    readonly general: Account["general"];
    readonly address: Account["address"];
    readonly login: Account["login"];
};

export type AccountRead = {
    readonly id: Account["id"];
    readonly general: Account["general"];
    readonly address: Account["address"];
};
