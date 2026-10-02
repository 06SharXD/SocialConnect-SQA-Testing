# SocialConnect — Product Requirements Document

## 1. Product Overview

SocialConnect is a basic social networking application that allows users to create accounts, log in, create posts, like posts, comment on posts, and delete their own posts.

The application is intended to provide a simple platform for users to share and interact with content.

---

## 2. User Registration

### FR-REG-01
Users must be able to create an account using:
- Name
- Email
- Password

### FR-REG-02
All registration fields are mandatory.

### FR-REG-03
The password must contain at least 8 characters.

### FR-REG-04
An email address can only be registered once.

### FR-REG-05
Successful registration should display a success message and allow the user to proceed to login.

---

## 3. User Login

### FR-LOGIN-01
Registered users must be able to log in using their email and password.

### FR-LOGIN-02
The email comparison should be case-insensitive.

### FR-LOGIN-03
Login should fail when the credentials are incorrect.

### FR-LOGIN-04
Email and password are mandatory.

### FR-LOGIN-05
Successful login should redirect the user to the SocialConnect feed.

---

## 4. Feed

### FR-FEED-01
A logged-in user should be able to access the SocialConnect feed.

### FR-FEED-02
The feed should display existing posts.

### FR-FEED-03
Posts should display the author's name and content.

### FR-FEED-04
Posts should be displayed with the newest posts first.

---

## 5. Create Post

### FR-POST-01
A logged-in user must be able to create a post.

### FR-POST-02
A post cannot be empty.

### FR-POST-03
A post cannot exceed 500 characters.

### FR-POST-04
After successfully creating a post, it should appear in the feed.

### FR-POST-05
Posts must be stored in the database.

---

## 6. Like Post

### FR-LIKE-01
A logged-in user must be able to like a post.

### FR-LIKE-02
A user cannot like the same post more than once.

### FR-LIKE-03
The number of likes should be displayed with the post.

### FR-LIKE-04
Likes must be stored in the database.

---

## 7. Comment

### FR-COMMENT-01
A logged-in user must be able to comment on a post.

### FR-COMMENT-02
A comment cannot be empty.

### FR-COMMENT-03
Comments should be displayed below the corresponding post.

### FR-COMMENT-04
Comments must be stored in the database.

---

## 8. Delete Post

### FR-DELETE-01
A user must be able to delete their own post.

### FR-DELETE-02
A user must not be able to delete another user's post.

### FR-DELETE-03
A successfully deleted post should no longer appear in the feed.

### FR-DELETE-04
Deleted posts should be removed from the database.

---

## 9. Logout

### FR-LOGOUT-01
A logged-in user must be able to log out.

### FR-LOGOUT-02
After logout, the user should be returned to the login page.

### FR-LOGOUT-03
The stored user session information should be removed during logout.

---

## 10. Data Requirements

The application uses a SQLite database.

The main entities are:

### Users
- id
- name
- email
- password

### Posts
- id
- user_id
- content
- created_at

### Comments
- id
- post_id
- user_id
- content
- created_at

### Likes
- id
- post_id
- user_id

---

## 11. Basic Quality Expectations

The application should:

- Display appropriate error messages for invalid input.
- Prevent invalid data from being stored.
- Maintain data after page refresh.
- Maintain data after logout and subsequent login.
- Prevent users from performing actions they are not authorized to perform.
- Return appropriate responses when API requests fail.