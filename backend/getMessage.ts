import { pool } from "./db";

export default async function getMessage(userId: number) {
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
