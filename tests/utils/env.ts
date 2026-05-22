export const getRequiredEnv = ({ name }: { name: string }) => {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
};
