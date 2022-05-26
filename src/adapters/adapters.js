export const adapterLogin = (user) => ({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    picture: user?.url_img
});

export const adapterTypeChat = (conversations) => {
    const conversationsFiltered = conversations.map(conversation => {
        if (conversation.type !== "NORMAL") {
            return {
                id_room: conversation.id_room,
                nameRoom: conversation.type,
                url_img: "",
                id_user: conversation.id_user,
                message: conversation.message,
                createdAt: conversation.createdAt,
                type: conversation.type
            }
        }

        const [otherParticipant] = conversation.participantsRoom;

        return {
            id_room: conversation.id_room,
            nameRoom: otherParticipant.user.name,
            url_img: otherParticipant.user.url_img,
            id_user: conversation.id_user,
            message: conversation.message,
            createdAt: conversation.createdAt,
            type: conversation.type
        }
    });
    return conversationsFiltered;
}