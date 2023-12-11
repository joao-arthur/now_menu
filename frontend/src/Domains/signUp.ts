import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    cnpj: '',
    name: '',
    telephone: '',
    cep: '',
    address: '',
    district: '',
    city: '',
    state: '',
    email: '',
    password: '',
    passwordMatch: '',
    success: false
};

export const { reducer: signUp, actions: signUpActions } = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setCNPJ: (state, action: PayloadAction<string>) => {
            state.cnpj = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setTelephone: (state, action: PayloadAction<string>) => {
            state.telephone = action.payload;
        },
        setCEP: (state, action: PayloadAction<string>) => {
            state.cep = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setDistrict: (state, action: PayloadAction<string>) => {
            state.district = action.payload;
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
        setState: (state, action: PayloadAction<string>) => {
            state.state = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setPasswordMatch: (state, action: PayloadAction<string>) => {
            state.passwordMatch = action.payload;
        },
        setSuccess: (state, action: PayloadAction<boolean>) => {
            state.success = action.payload;
        },
        clearSignUpAfterLogin: state => {
            state.cnpj = initialState.cnpj;
            state.name = initialState.name;
            state.telephone = initialState.telephone;
            state.cep = initialState.cep;
            state.address = initialState.address;
            state.district = initialState.district;
            state.city = initialState.city;
            state.state = initialState.state;
            state.email = initialState.email;
            state.password = initialState.password;
            state.passwordMatch = initialState.passwordMatch;
        }
    }
});
