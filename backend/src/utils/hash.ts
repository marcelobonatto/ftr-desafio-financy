import bcrypt from "bcryptjs";

// Gera um hash de uma senha.
export const hashPassword = async (plainPassowrd: string): Promise<string> => {
    // Gera um salt.
    const salt = await bcrypt.genSalt(10);
    // Gera um hash.
    const hash = await bcrypt.hash(plainPassowrd, salt);

    // Retorna o hash.
    return hash;
}

// Compara uma senha com um hash.
export const comparePassword = async (plainPassowrd: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassowrd, hashPassword);
}