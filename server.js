const express = require("express");
const path = require("path");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ======================================================
// REGISTER
// ======================================================

app.post("/api/register", (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address."
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must contain at least 8 characters."
        });
    }

    db.run(
        `INSERT INTO users (name, email, password)
         VALUES (?, ?, ?)`,
        [
            name.trim(),
            email.trim().toLowerCase(),
            password
        ],
        function (err) {

            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered."
                });
            }

            res.status(201).json({
                success: true,
                message: "Registration successful.",
                userId: this.lastID
            });
        }
    );
});

// ======================================================
// LOGIN
// ======================================================

app.post("/api/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required."
        });
    }

    db.get(
        `SELECT id, name, email
         FROM users
         WHERE email = ? AND password = ?`,
        [
            email.trim().toLowerCase(),
            password
        ],
        (err, user) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });
            }

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password."
                });
            }

            res.json({
                success: true,
                message: "Login successful.",
                user
            });
        }
    );
});

// ======================================================
// GET POSTS
// ======================================================

app.get("/api/posts", (req, res) => {

    const sql = `
        SELECT
            posts.id,
            posts.user_id,
            posts.content,
            posts.created_at,
            users.name,
            (
                SELECT COUNT(*)
                FROM likes
                WHERE likes.post_id = posts.id
            ) AS like_count
        FROM posts
        JOIN users
            ON users.id = posts.user_id
        ORDER BY posts.id DESC
    `;

    db.all(sql, [], (err, posts) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to load posts."
            });
        }

        res.json(posts);
    });
});

// ======================================================
// CREATE POST
// ======================================================

app.post("/api/posts", (req, res) => {

    const { userId, content } = req.body;

    if (!userId || !content || content.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Post cannot be empty."
        });
    }

    if (content.length > 500) {
        return res.status(400).json({
            success: false,
            message: "Post cannot exceed 500 characters."
        });
    }

    // Verify that the user exists
    db.get(
        `SELECT id FROM users WHERE id = ?`,
        [userId],
        (err, user) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });
            }

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User does not exist."
                });
            }

            db.run(
                `INSERT INTO posts (user_id, content)
                 VALUES (?, ?)`,
                [
                    userId,
                    content.trim()
                ],
                function (err) {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Unable to create post."
                        });
                    }

                    res.status(201).json({
                        success: true,
                        postId: this.lastID
                    });
                }
            );
        }
    );
});

// ======================================================
// DELETE POST
// ======================================================

app.delete("/api/posts/:id", (req, res) => {

    const postId = req.params.id;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required."
        });
    }

    db.run(
        `DELETE FROM posts
         WHERE id = ? AND user_id = ?`,
        [
            postId,
            userId
        ],
        function (err) {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Unable to delete post."
                });
            }

            if (this.changes === 0) {
                return res.status(403).json({
                    success: false,
                    message: "You cannot delete this post."
                });
            }

            res.json({
                success: true,
                message: "Post deleted."
            });
        }
    );
});

// ======================================================
// LIKE POST
// ======================================================

app.post("/api/posts/:id/like", (req, res) => {

    const postId = req.params.id;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required."
        });
    }

    // Verify user exists
    db.get(
        `SELECT id FROM users WHERE id = ?`,
        [userId],
        (err, user) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });
            }

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User does not exist."
                });
            }

            // Verify post exists
            db.get(
                `SELECT id FROM posts WHERE id = ?`,
                [postId],
                (err, post) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Database error."
                        });
                    }

                    if (!post) {
                        return res.status(404).json({
                            success: false,
                            message: "Post does not exist."
                        });
                    }

                    db.run(
                        `INSERT INTO likes (post_id, user_id)
                         VALUES (?, ?)`,
                        [
                            postId,
                            userId
                        ],
                        function (err) {

                            if (err) {
                                return res.status(400).json({
                                    success: false,
                                    message: "You already liked this post."
                                });
                            }

                            res.status(201).json({
                                success: true,
                                message: "Post liked."
                            });
                        }
                    );
                }
            );
        }
    );
});

// ======================================================
// ADD COMMENT
// ======================================================

app.post("/api/posts/:id/comments", (req, res) => {

    const postId = req.params.id;
    const { userId, content } = req.body;

    if (!userId || !content || content.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Comment cannot be empty."
        });
    }

    // Verify user exists
    db.get(
        `SELECT id FROM users WHERE id = ?`,
        [userId],
        (err, user) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });
            }

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User does not exist."
                });
            }

            // Verify post exists
            db.get(
                `SELECT id FROM posts WHERE id = ?`,
                [postId],
                (err, post) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Database error."
                        });
                    }

                    if (!post) {
                        return res.status(404).json({
                            success: false,
                            message: "Post does not exist."
                        });
                    }

                    db.run(
                        `INSERT INTO comments
                         (post_id, user_id, content)
                         VALUES (?, ?, ?)`,
                        [
                            postId,
                            userId,
                            content.trim()
                        ],
                        function (err) {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: "Unable to add comment."
                                });
                            }

                            res.status(201).json({
                                success: true,
                                commentId: this.lastID
                            });
                        }
                    );
                }
            );
        }
    );
});

// ======================================================
// GET COMMENTS
// ======================================================

app.get("/api/posts/:id/comments", (req, res) => {

    const sql = `
        SELECT
            comments.id,
            comments.content,
            users.name
        FROM comments
        JOIN users
            ON users.id = comments.user_id
        WHERE comments.post_id = ?
        ORDER BY comments.id ASC
    `;

    db.all(
        sql,
        [req.params.id],
        (err, comments) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Unable to load comments."
                });
            }

            res.json(comments);
        }
    );
});

// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, () => {

    console.log(
        `SocialConnect running at http://localhost:${PORT}`
    );

});