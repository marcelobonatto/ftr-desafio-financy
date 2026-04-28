import bcrypt from "bcryptjs";

export const hashPassword = async (plainPassowrd: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassowrd, salt);

    return hash;
}

export const comparePassword = async (plainPassowrd: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassowrd, hashPassword);
}