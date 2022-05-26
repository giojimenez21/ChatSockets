import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const generateJWT = (id: number) =>
    new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(
            payload,
            process.env.SECRET_JWT!,
            {
                expiresIn: "365d",
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });

export const validateJWT = async (token: string) => {
    try {
        if (token.length < 10) {
            return null;
        }

        const { id }: any = jwt.verify(token, process.env.SECRET_JWT!);

        const user = await User.findOne({ where: { id } });
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};
