struct User {
    cnpj: String,
    name: String,
    telephone: String,
    cep: String,
    address: String,
    district: String,
    city: String,
    state: String,
    email: String,
    hash: String,
    salt: String,
    created_at: String,
    updated_at: String,
}

struct CreateUserDTO {
    cnpj: String,
    name: String,
    telephone: String,
    cep: String,
    address: String,
    district: String,
    city: String,
    state: String,
    email: String,
    password: String,
}

struct LoginUserDTO {
    email: String,
    password: String,
}

struct UpdateUserDTO {
    cnpj: String,
    name: String,
    telephone: String,
    cep: String,
    address: String,
    district: String,
    city: String,
    state: String,
    email: String,
    password: String,
}
