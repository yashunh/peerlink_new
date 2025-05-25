import { pool } from "./db";

export async function sendMessage(userId: number, receiverId: number, message: string) {
    const query = {
        text: "INSERT INTO messages(senderId, receiverId, content) VALUES ($1, $2, $3);",
        values: [userId, receiverId, message]
    };

    try {
        await pool.query(query);
        const msg = {
            senderId: userId,
            receiverId: receiverId,
            content: message,
            createdAt: new Date() 
        }
        return msg;
    } catch (err) {
        console.error("Error sending message:", err);
        throw err;
    }
}

export async function getMessage(userId: number) {
    const query = {
        text: "SELECT * FROM messages WHERE senderId = $1 OR receiverId = $1;",
        values: [userId]
    };

    try {
        const result = await pool.query(query);
        return result;
    } catch (err) {
        console.error("Error retrieving messages:", err);
        throw err;
    }
}

export async function getMessageWithUser(userId: number,receiverId: number) {
    const query = {
        text: "SELECT * FROM messages WHERE senderId = $1 AND receiverId = $2 OR senderId = $2 AND receiverId = $1;",
        values: [userId,receiverId]
    };

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error("Error getting contacts:", err);
        throw err;
    }
}