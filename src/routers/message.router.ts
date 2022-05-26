import { Router } from "express";
import {
    getMessagesOfRoom,
    lastMessageOfRoom,
    lastMessageOfRoomUser,
    newMessage,
    newRoom,
    searchUser,
} from "../controllers/message.controller";
import { existInRoom } from "../middlewares/exist_in_room";
import { validateJWT } from "../middlewares/validate_jwt";

const router: Router = Router();

router.use(validateJWT);

router.get("/searchUser/:search", searchUser);

router.post("/newRoom", newRoom);

router.post("/newMessage", existInRoom, newMessage);

router.get("/lastMessageOfRoom/:id_room", lastMessageOfRoom);

router.get("/lastMessageOfRoomUser", lastMessageOfRoomUser);

router.get("/messagesOfRoom/:id_room", getMessagesOfRoom);

export default router;
