import { pool } from "./db";

export async function sendMessage(userId: number, receiverId: number, message: string) {
    const query = {
        text: "INSERT INTO messages(senderId, receiverId, content) VALUES ($1, $2, $3);",
        values: [userId, receiverId, message]
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
        text: "SELECT * FROM messages WHERE senderId = $1 OR receiverId = $2 OR senderId = $2 OR receiverId = $1;",
        values: [userId,receiverId]
    };

    try {
        const result = await pool.query(query);
        return result;
    } catch (err) {
        console.error("Error retrieving messages:", err);
        throw err;
    }
}

export async function getContacts(userId: number) {
    const query = {
        text: `SELECT DISTINCT ON (contact.id)
    contact.id,
    contact.username,
    m.content,
    m.createdAt
FROM (
    SELECT 
        CASE 
            WHEN senderId = $1 THEN receiverId 
            ELSE senderId 
        END AS contactId
    FROM messages
    WHERE senderId = $1 OR receiverId = $1
) AS contact_rel
JOIN users AS contact ON contact.id = contact_rel.contactId
JOIN LATERAL (
    SELECT content, createdAt
    FROM messages
    WHERE (senderId = $1 AND receiverId = contact.id)
       OR (senderId = contact.id AND receiverId = $1)
    ORDER BY createdAt DESC
    LIMIT 1
) AS m ON true
ORDER BY contact.id, m.createdAt DESC;
`,
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