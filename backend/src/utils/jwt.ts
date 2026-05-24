import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

// Tipo do payload para gerar o JWT.
export type JwtPayload = {
    id: string;
    email: string;
}

// Recebe um payload e gera um JWT.
export const signJwt = (payload: JwtPayload, expiresIn?: string) => {

    // Recebe o segredo JWT.
    const secret: Secret = process.env.JWT_SECRET as unknown as Secret;
    // Opções de expiração.
    let options: SignOptions = {};
    // Gera a data de exiração.
    const expiration = expiresIn;

    // Se a expiração existir, adiciona as opções.
    if (expiration) {
        options = {
            expiresIn: expiration as unknown as NonNullable<SignOptions['expiresIn']>
        };
    }

    // Retorna o JWT.
    return jwt.sign(payload, secret, options);
}

// Recebe um token e verifica se é válido.
export const verifyJwt = (token: string) => {
    // Recebe o segredo JWT.
    const secret: Secret = process.env.JWT_SECRET as unknown as Secret;
    // Verifica e retorna o JWT.
    return jwt.verify(token, secret) as JwtPayload;
}