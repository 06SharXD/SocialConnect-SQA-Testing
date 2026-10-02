# SocialConnect — Bug Reports

## BUG-001 — GET Comments API Returns Server Error

**Severity:** High  
**Priority:** High  
**Status:** Closed

### Environment

- Windows
- Node.js
- Express
- SQLite
- Postman

### Endpoint

`GET /api/posts/:id/comments`

### Steps to Reproduce

1. Start the SocialConnect server.
2. Open Postman.
3. Create a GET request to:
   `http://localhost:3000/api/posts/10/comments`
4. Send the request without a request body.

### Expected Result

The API should return the comments associated with post ID 10 with HTTP 200.

### Actual Result

The API originally returned a server error:

`TypeError: Cannot destructure property 'userId' of 'req.body' as it is undefined.`

### Impact

The comments retrieval API could not reliably be consumed through a standard GET request.

### Fix / Retest

The API was updated to retrieve comments using only the post ID and no longer access `req.body` for a GET request.

Retested using Postman:

`GET /api/posts/10/comments`

Result: **Passed. API returned the comments successfully with HTTP 200.**

---

## BUG-002 — Create Post API Accepts Nonexistent User ID

**Severity:** High  
**Priority:** High  
**Status:** Closed

### Environment

- Windows
- Node.js
- Express
- SQLite
- Postman

### Endpoint

`POST /api/posts`

### Steps to Reproduce

1. Open Postman.
2. Send a POST request to:
   `http://localhost:3000/api/posts`
3. Use the following request body:

```json
{
    "userId": 9999,
    "content": "Invalid user test"
}
```

### Expected Result

The API should reject the request because user ID 9999 does not exist.

### Actual Result

The API originally created the post and returned a post ID.

### Impact

The database could contain posts associated with nonexistent users, resulting in invalid or orphaned data.

### Fix / Retest

The API was updated to verify that the user exists before creating a post.

Retested using Postman with `userId: 9999`.

Result:

```json
{
    "success": false,
    "message": "User does not exist."
}
```

**Passed — invalid user was rejected with HTTP 400.**

---

## BUG-003 — Add Comment API Accepts Nonexistent User ID

**Severity:** High  
**Priority:** High  
**Status:** Closed

### Environment

- Windows
- Node.js
- Express
- SQLite
- Postman

### Endpoint

`POST /api/posts/:id/comments`

### Steps to Reproduce

1. Open Postman.
2. Send a POST request to:
   `http://localhost:3000/api/posts/9/comments`
3. Use the following request body:

```json
{
    "userId": 9999,
    "content": "Invalid user comment test"
}
```

### Expected Result

The API should reject the request because user ID 9999 does not exist.

### Actual Result

The API originally created the comment and returned a comment ID.

### Impact

The database could contain comments associated with nonexistent users, resulting in invalid or orphaned data.

### Fix / Retest

The API was updated to verify that the user exists before creating a comment.

Retested using Postman with `userId: 9999`.

Result:

```json
{
    "success": false,
    "message": "User does not exist."
}
```

**Passed — invalid user was rejected.**

---

## BUG-004 — Like API Accepts Nonexistent User ID

**Severity:** High  
**Priority:** High  
**Status:** Closed

### Environment

- Windows
- Node.js
- Express
- SQLite
- Postman

### Endpoint

`POST /api/posts/:id/like`

### Steps to Reproduce

1. Open Postman.
2. Send a POST request to:
   `http://localhost:3000/api/posts/9/like`
3. Use the following request body:

```json
{
    "userId": 9999
}
```

### Expected Result

The API should reject the request because user ID 9999 does not exist.

### Actual Result

The API originally created a like and returned a success response.

### Impact

The database could contain likes associated with nonexistent users, resulting in invalid or orphaned data.

### Fix / Retest

The API was updated to verify that the user exists before creating a like.

Retested using Postman with `userId: 9999`.

Result:

```json
{
    "success": false,
    "message": "User does not exist."
}
```

**Passed — invalid user was rejected.**

---

## BUG-005 — Add Comment API Accepts Nonexistent Post ID

**Severity:** High  
**Priority:** High  
**Status:** Closed

### Environment

- Windows
- Node.js
- Express
- SQLite
- Postman

### Endpoint

`POST /api/posts/:id/comments`

### Steps to Reproduce

1. Open Postman.
2. Send a POST request to:
   `http://localhost:3000/api/posts/9999/comments`
3. Use the following request body:

```json
{
    "userId": 2,
    "content": "Invalid post test"
}
```

### Expected Result

The API should reject the request because post ID 9999 does not exist.

### Actual Result

The API originally created the comment and returned a comment ID.

### Impact

The database could contain comments associated with nonexistent posts, resulting in invalid or orphaned data.

### Fix / Retest

The API was updated to verify that the post exists before creating a comment.

Retested using Postman with post ID `9999`.

Result:

```json
{
    "success": false,
    "message": "Post does not exist."
}
```

**Passed — invalid post was rejected.**

---

## BUG-006 — Like API Accepts Nonexistent Post ID

**Severity:** High  
**Priority:** High  
**Status:** Closed

### Environment

- Windows
- Node.js
- Express
- SQLite
- Postman

### Endpoint

`POST /api/posts/:id/like`

### Steps to Reproduce

1. Open Postman.
2. Send a POST request to:
   `http://localhost:3000/api/posts/9999/like`
3. Use the following request body:

```json
{
    "userId": 2
}
```

### Expected Result

The API should reject the request because post ID 9999 does not exist.

### Actual Result

The API originally created a like and returned a success response.

### Impact

The database could contain likes associated with nonexistent posts, resulting in invalid or orphaned data.

### Fix / Retest

The API was updated to verify that the post exists before creating a like.

Retested using Postman with post ID `9999`.

Result:

```json
{
    "success": false,
    "message": "Post does not exist."
}
```

**Passed — invalid post was rejected.**

---

## BUG-007 — Registration API Accepts Invalid Email Format

**Severity:** Medium  
**Priority:** Medium  
**Status:** Closed

### Environment

- Windows
- Node.js
- Express
- SQLite
- Postman

### Endpoint

`POST /api/register`

### Steps to Reproduce

1. Open Postman.
2. Send a POST request to:
   `http://localhost:3000/api/register`
3. Use the following request body:

```json
{
    "name": "Invalid Email User",
    "email": "not-an-email",
    "password": "Test1234"
}
```

### Expected Result

The API should reject the registration because the email does not follow a valid email format.

### Actual Result

The API originally created the account and returned a user ID.

### Impact

Invalid email addresses could be stored in the user database.

### Fix / Retest

The API was updated to validate the email format before registration.

Retested using Postman with:

`not-an-email`

Result:

```json
{
    "success": false,
    "message": "Please enter a valid email address."
}
```

**Passed — invalid email was rejected.**

---

## Bug Summary

| Bug ID | Description | Severity | Priority | Status |
|---|---|---|---|---|
| BUG-001 | GET Comments API returns server error | High | High | Closed |
| BUG-002 | Create Post API accepts nonexistent user ID | High | High | Closed |
| BUG-003 | Add Comment API accepts nonexistent user ID | High | High | Closed |
| BUG-004 | Like API accepts nonexistent user ID | High | High | Closed |
| BUG-005 | Add Comment API accepts nonexistent post ID | High | High | Closed |
| BUG-006 | Like API accepts nonexistent post ID | High | High | Closed |
| BUG-007 | Registration API accepts invalid email format | Medium | Medium | Closed |
```
