import { pool } from "./db";

export async function sendMessage(senderId: number, receiverId: number, message: string) {
    const query = {
        text: "INSERT INTO messages(sender_id, receiver_id, content) VALUES ($1, $2, $3)",
        values: [senderId, receiverId, message]
    };

    try {
        const result = await pool.query(query);
        return result.rowCount === 1;
    } catch (err) {
        console.error("Error sending message:", err);
        throw err;
    }
}

export async function getMessage(userId: number) {
    const query = {
        text: "SELECT * FROM messages WHERE sender_id = $1 OR receiver_id = $1",
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
        text: "SELECT * FROM messages WHERE sender_id = $1 OR receiver_id = $2 OR sender_id = $2 OR receiver_id = $1",
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