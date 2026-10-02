const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./socialconnect.db");

const query = `
SELECT
    posts.id AS post_id,
    users.name AS author,
    posts.content,
    COUNT(likes.id) AS like_count
FROM posts
JOIN users
    ON users.id = posts.user_id
LEFT JOIN likes
    ON likes.post_id = posts.id
GROUP BY posts.id
ORDER BY posts.id;
`;

db.all(query, [], (err, rows) => {

    if (err) {
        console.error(err);
        return;
    }

    console.table(rows);

    db.close();
});