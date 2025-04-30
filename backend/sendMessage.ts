import { pool } from "./db";

export default async function sendMessage(senderId: number, receiverId: number, message: string) {
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
