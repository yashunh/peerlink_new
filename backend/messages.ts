import { pool } from "./db";

export async function sendMessage(senderId: number, receiverId: number, message: string) {
    const query = {
        text: "INSERT INTO messages(senderId, receiverId, content) VALUES ($1, $2, $3)",
        values: [senderId, receiverId, message]
    };

    try {
        const result = await pool.query(query);
        return result;
    } catch (err) {
        console.error("Error sending message:", err);
        throw err;
    }
}

export async function getMessage(userId: number) {
    const query = {
        text: "SELECT * FROM messages WHERE senderId = $1 OR receiverId = $1",
        values: [userId]
    };

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error("Error retrieving messages:", err);
        throw err;
    }
}

export async function getMessageWithUser(userId1: number,userId2: number) {
    const query = {
        text: "SELECT * FROM messages WHERE senderId = $1 OR receiverId = $2 OR senderId = $2 OR receiverId = $1",
        values: [userId1,userId2]
    };

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error("Error retrieving messages:", err);
        throw err;
    }
}