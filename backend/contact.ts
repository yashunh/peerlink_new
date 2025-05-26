import { pool } from "./db";

export async function getContacts(userId: number) {
    const query = {
        text: `SELECT DISTINCT ON (contact.id)
    contact.id,
    contact.username,
    m.content as lastMessage,
    m.createdAt as lastMessageTime
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
        return result.rows;
    } catch (err) {
        console.error("Error getting contact:", err);
        throw err;
    }
}

export async function searchContact(username: string) {
    const query = {
        text: "SELECT id,username FROM users WHERE username ILIKE $1;",
        values: [`%${username}%`]
    };

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error("Error searching contact:", err);
        throw err;
    }
}

export async function getUser(userId: number) {
    const query = {
        text: "SELECT id,username FROM users WHERE id = $1;",
        values: [userId]
    };

    try {
        const result = await pool.query(query);
        return result.rows[0];
    } catch (err) {
        console.error("Error searching contact:", err);
        throw err;
    }
}