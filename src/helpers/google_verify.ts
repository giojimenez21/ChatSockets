import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

export const googleVerify = async (idToken: string) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT,
    });

    const { name, picture:url_img, email } = ticket.getPayload()!;

    return { name, url_img, email };
};
