# SocialConnect — Test Execution

## Execution 1

| Test Case ID | Status | Actual Result | Notes |
|---|---|---|---|
| TC-REG-001 | PASS | Account was created successfully and user was redirected to login. | |
| TC-REG-006 | PASS | Duplicate email was rejected with the expected error message. | |
| TC-LOGIN-001 | PASS | User logged in successfully and was redirected to the feed. | |
| TC-LOGIN-002 | PASS | Login with an incorrect password failed. | |
| TC-POST-001 | PASS | Valid post was created and displayed in the feed. | |
| TC-POST-002 | PASS | Empty post submission was rejected. | |
| TC-POST-003 | PASS | A post containing exactly 500 characters was created successfully. | |
| TC-POST-004 | PASS | A post longer than 500 characters was rejected. | |
| TC-POST-005 | PASS | Created post remained available after refresh and login again. | |
| TC-LIKE-001 | PASS | Like count increased after liking a post. | |
| TC-LIKE-002 | PASS | A second like on the same post was rejected. | |
| TC-LIKE-003 | PASS | Like remained after refreshing the page. | |
| TC-COMMENT-001 | PASS | Submitted comment appeared below the post. | |
| TC-COMMENT-002 | PASS | Empty comment submission was rejected. | |
| TC-COMMENT-003 | PASS | Comment remained after refreshing the page. | |
| TC-DELETE-001 | PASS | Own post was deleted and disappeared from the feed. | |
| TC-DELETE-002 | PASS | Deleted post remained absent after refreshing the page. | |
| TC-DELETE-003 | PASS | Delete option was unavailable for another user's post. | |
| TC-LOGOUT-001 | PASS | Logout returned the user to the login page. | |
| TC-LOGOUT-002 | PASS | User successfully logged in again after logout. | |
| TC-DATA-001 | PASS | Previously stored user data remained available after restarting the application. | |
| TC-DATA-002 | PASS | Previously stored posts remained available after restarting the application. | |
| TC-DATA-003 | PASS | Previously stored comments remained available after restarting the application. | |
| TC-DATA-004 | PASS | Like count remained unchanged after restarting the server. | |
| TC-DATA-005 | PASS | SQL join query returned the expected authors and like counts: post 8 had 1 like and post 9 had 0 likes. | |
---

## Execution 2 — API Testing and Bug Retesting

| Test Case / Bug ID | Status | Actual Result | Notes |
|---|---|---|---|
| BUG-001 | PASS | GET comments API returned the expected comments successfully with HTTP 200. | Fixed and retested in Postman |
| BUG-002 | PASS | Post creation with nonexistent user ID 9999 was rejected with "User does not exist." | Fixed and retested in Postman |
| BUG-003 | PASS | Comment creation with nonexistent user ID 9999 was rejected with "User does not exist." | Fixed and retested in Postman |
| BUG-004 | PASS | Like creation with nonexistent user ID 9999 was rejected with "User does not exist." | Fixed and retested in Postman |
| BUG-005 | PASS | Comment creation for nonexistent post ID 9999 was rejected with "Post does not exist." | Fixed and retested in Postman |
| BUG-006 | PASS | Like creation for nonexistent post ID 9999 was rejected with "Post does not exist." | Fixed and retested in Postman |
| BUG-007 | PASS | Registration with invalid email format was rejected with "Please enter a valid email address." | Fixed and retested in Postman |

---

## Execution 3 — API Functional Testing

| Test | Status | Actual Result |
|---|---|---|
| Valid login API | PASS | Valid credentials returned successful login response. |
| Invalid password API | PASS | Incorrect password returned HTTP 401. |
| Unregistered email API | PASS | Invalid credentials were rejected. |
| Empty email API | PASS | Request was rejected with HTTP 400. |
| Empty password API | PASS | Request was rejected with HTTP 400. |
| Get posts API | PASS | Posts were returned successfully. |
| Create post API | PASS | Valid post was created successfully. |
| Empty post API | PASS | Empty post was rejected. |
| Like API | PASS | Valid like was created successfully. |
| Duplicate like API | PASS | Duplicate like was rejected. |
| Add comment API | PASS | Valid comment was created successfully. |
| Get comments API | PASS | Comments were returned successfully. |
| Delete post API | PASS | Authorized user successfully deleted their own post. |
| Unauthorized delete API | PASS | User was prevented from deleting another user's post. |

---

## Execution Summary

### Initial Functional Testing

- Total functional test cases executed: **25**
- Passed: **25**
- Failed: **0**

### API and Bug Retesting

- Bugs identified: **7**
- Bugs fixed: **7**
- Bugs retested: **7**
- Bugs passed after retesting: **7**
- Bugs remaining open: **0**

### SQL Validation

SQL validation was performed using a join query across the posts, users, and likes tables.

The query successfully returned the expected post authors and like counts:

- Post 8 — Test User — 1 like
- Post 9 — QA User 2 — 0 likes

### Final Status

All documented functional test cases passed during execution, and all seven identified API defects passed their respective retests after fixes were implemented.

---

## Execution 4 — Regression Testing

| Test | Status | Actual Result |
|---|---|---|
| Valid login | PASS | Valid credentials successfully returned a successful login response. |
| Create valid post | PASS | Post ID 17 was created successfully. |
| Like valid post | PASS | Post 17 was successfully liked and like count increased to 1. |
| Add valid comment | PASS | Comment ID 9 was successfully created for post 17. |
| Get comments | PASS | Comment ID 9 was returned correctly for post 17. |
| Get posts | PASS | Post 17 was returned correctly with the expected post content and like count. |
| Duplicate like | PASS | A second like from the same user was rejected as expected. |

### Regression Result

**7/7 regression tests passed.**

The API fixes did not break the previously working login, post creation, liking, commenting, comment retrieval, post retrieval, or duplicate-like handling functionality.