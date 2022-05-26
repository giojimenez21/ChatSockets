import { Request, Response } from "express";
import { generateJWT } from "../helpers/generate_jwt";
import { googleVerify } from "../helpers/google_verify";
import { User } from "../models/User";

export const createUserOrLogin = async (req: Request, res: Response) => {
    let token;
    const { google_token } = req.body;

    const { name, email, url_img } = await googleVerify(google_token);
    const user: any = await User.findOne({ where: { email } });

    if (user !== null) {
        token = await generateJWT(user.id);
        return res.status(200).json({
            user,
            token
        });
    } else{
        const userNew:any = await User.create({name, email, url_img});
        token = await generateJWT(userNew.id);
        return res.status(200).json({
            user: userNew,
            token
        });
    }
};

export const renewToken = async(req: Request, res: Response) => {
    const { id, user }: any = req;
    const token = await generateJWT(id);

    return res.status(200).json({
        user,
        token
    });
}


