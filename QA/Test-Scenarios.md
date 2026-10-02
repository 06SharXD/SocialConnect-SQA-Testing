# SocialConnect — Test Scenarios

## 1. Registration

| ID | Test Scenario |
|---|---|
| TS-REG-01 | Verify that a new user can register with valid name, email, and password. |
| TS-REG-02 | Verify registration fails when the name is empty. |
| TS-REG-03 | Verify registration fails when the email is empty. |
| TS-REG-04 | Verify registration fails when the password is empty. |
| TS-REG-05 | Verify registration fails when the password contains fewer than 8 characters. |
| TS-REG-06 | Verify registration fails when an already registered email is used. |
| TS-REG-07 | Verify a registered user can subsequently log in. |

---

## 2. Login

| ID | Test Scenario |
|---|---|
| TS-LOGIN-01 | Verify login succeeds with valid credentials. |
| TS-LOGIN-02 | Verify login fails with an incorrect password. |
| TS-LOGIN-03 | Verify login fails with an unregistered email. |
| TS-LOGIN-04 | Verify login fails when the email is empty. |
| TS-LOGIN-05 | Verify login fails when the password is empty. |
| TS-LOGIN-06 | Verify email comparison is case-insensitive. |
| TS-LOGIN-07 | Verify successful login redirects the user to the feed. |

---

## 3. Feed

| ID | Test Scenario |
|---|---|
| TS-FEED-01 | Verify a logged-in user can access the feed. |
| TS-FEED-02 | Verify existing posts are displayed. |
| TS-FEED-03 | Verify each post displays the author's name. |
| TS-FEED-04 | Verify each post displays its content. |
| TS-FEED-05 | Verify newest posts appear first. |
| TS-FEED-06 | Verify posts remain available after refreshing the page. |

---

## 4. Create Post

| ID | Test Scenario |
|---|---|
| TS-POST-01 | Verify a logged-in user can create a valid post. |
| TS-POST-02 | Verify an empty post cannot be created. |
| TS-POST-03 | Verify a post containing exactly 500 characters can be created. |
| TS-POST-04 | Verify a post containing more than 500 characters cannot be created. |
| TS-POST-05 | Verify a newly created post appears in the feed. |
| TS-POST-06 | Verify a created post remains after refreshing the page. |
| TS-POST-07 | Verify the created post is stored in the database. |

---

## 5. Like

| ID | Test Scenario |
|---|---|
| TS-LIKE-01 | Verify a logged-in user can like a post. |
| TS-LIKE-02 | Verify the like count increases after liking a post. |
| TS-LIKE-03 | Verify the same user cannot like the same post more than once. |
| TS-LIKE-04 | Verify likes remain after refreshing the page. |
| TS-LIKE-05 | Verify likes are stored in the database. |

---

## 6. Comments

| ID | Test Scenario |
|---|---|
| TS-COMMENT-01 | Verify a logged-in user can comment on a post. |
| TS-COMMENT-02 | Verify an empty comment cannot be submitted. |
| TS-COMMENT-03 | Verify the submitted comment appears below the correct post. |
| TS-COMMENT-04 | Verify comments remain after refreshing the page. |
| TS-COMMENT-05 | Verify comments are stored in the database. |

---

## 7. Delete Post

| ID | Test Scenario |
|---|---|
| TS-DELETE-01 | Verify a user can delete their own post. |
| TS-DELETE-02 | Verify a deleted post disappears from the feed. |
| TS-DELETE-03 | Verify a deleted post is removed from the database. |
| TS-DELETE-04 | Verify a user cannot delete another user's post. |

---

## 8. Logout

| ID | Test Scenario |
|---|---|
| TS-LOGOUT-01 | Verify a logged-in user can log out. |
| TS-LOGOUT-02 | Verify logout redirects the user to the login page. |
| TS-LOGOUT-03 | Verify stored user session information is removed after logout. |
| TS-LOGOUT-04 | Verify the user can log in again after logging out. |

---

## 9. Data Persistence

| ID | Test Scenario |
|---|---|
| TS-DATA-01 | Verify registered users remain available after application restart. |
| TS-DATA-02 | Verify posts remain available after application restart. |
| TS-DATA-03 | Verify comments remain available after application restart. |
| TS-DATA-04 | Verify likes remain available after application restart. |