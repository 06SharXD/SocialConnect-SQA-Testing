# SocialConnect — Software QA & Testing Project

A full-stack social-media-style web application built to demonstrate an end-to-end Software Quality Assurance workflow covering requirements analysis, test case design, manual functional testing, API testing, SQL validation, defect management, bug fixing, retesting, and regression testing.

---

## Project Overview

SocialConnect is a lightweight social media application that allows users to:

- Register and log in
- Create posts
- Like posts
- Comment on posts
- Delete their own posts
- Log out
- Persist application data using SQLite

The application was developed together with a structured QA process to simulate a real-world software testing lifecycle.

The project focuses not only on finding defects, but also on documenting, reproducing, fixing, retesting, and tracking them through Jira.

---

## Application Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- SQLite

## QA & Testing Tools

- Manual Functional Testing
- Postman
- SQL
- Jira
- Test Case Design
- Defect Reporting
- Bug Retesting
- Regression Testing
- Data Validation

---

# QA Workflow

The project followed an end-to-end Software Testing Life Cycle (STLC):

```text
Requirements Analysis
        ↓
Test Scenario Design
        ↓
Test Case Design
        ↓
Functional Testing
        ↓
API Testing
        ↓
SQL Validation
        ↓
Defect Identification
        ↓
Defect Reporting in Jira
        ↓
Bug Fixes
        ↓
Retesting
        ↓
Regression Testing
        ↓
Final Validation
```

---

# Requirements & Test Planning

The product requirements were documented in a Product Requirements Document (PRD) and used as the baseline for test design.

Testing documentation includes:

| Document | Purpose |
|---|---|
| `QA/PRD.md` | Product requirements and expected application behavior |
| `QA/Test-Scenarios.md` | High-level test scenarios |
| `QA/Test-Cases.md` | Detailed test cases and expected results |
| `QA/Test-Execution.md` | Test execution results, API testing, SQL validation and regression testing |
| `QA/Bug-Reports.md` | Defects identified during testing and their resolution |

---

# Functional Testing

Manual functional testing covered the major application workflows.

### Authentication

- Valid registration
- Duplicate email registration
- Valid login
- Invalid password
- Logout
- Login after logout

### Posts

- Create valid post
- Empty post validation
- 500-character boundary validation
- Posts exceeding the character limit
- Post persistence
- Post deletion
- Unauthorized post deletion

### Likes

- Like a post
- Prevent duplicate likes
- Like persistence

### Comments

- Add valid comment
- Empty comment validation
- Comment persistence
- Retrieve comments

### Data Persistence

- User data after server restart
- Post data after server restart
- Comment data after server restart
- Like data after server restart

### Functional Test Result

**25/25 functional test cases passed.**

---

# API Testing with Postman

The application's REST APIs were tested using Postman.

### APIs Tested

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Authenticate a user |
| GET | `/api/posts` | Retrieve posts |
| POST | `/api/posts` | Create a post |
| DELETE | `/api/posts/:id` | Delete an owned post |
| POST | `/api/posts/:id/like` | Like a post |
| POST | `/api/posts/:id/comments` | Add a comment |
| GET | `/api/posts/:id/comments` | Retrieve comments |

### API Validation Covered

- Valid requests
- Missing fields
- Invalid credentials
- Duplicate likes
- Invalid user IDs
- Invalid post IDs
- Invalid email formats
- Authorization checks
- HTTP response validation
- Error message validation

The Postman collection is included in:

```text
Postman/
└── SocialConnect API Tests.postman_collection.json
```

---

# SQL Data Validation

SQL was used to validate the application's stored data and relationships between database tables.

The validation covered relationships between:

```text
users
   ↓
posts
   ↓
likes
```

A SQL join was used to verify:

- Post IDs
- Post authors
- Post content
- Like counts

Example validation:

```sql
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
```

The query returned the expected authors and like counts for the test data.

---

# Defect Identification

API testing identified **7 defects** involving input validation, data integrity, and API behavior.

| Bug ID | Defect | Severity | Status |
|---|---|---|---|
| BUG-001 | GET Comments API returned a server error | High | Closed |
| BUG-002 | Create Post API accepted nonexistent User IDs | High | Closed |
| BUG-003 | Add Comment API accepted nonexistent User IDs | High | Closed |
| BUG-004 | Like API accepted nonexistent User IDs | High | Closed |
| BUG-005 | Add Comment API accepted nonexistent Post IDs | High | Closed |
| BUG-006 | Like API accepted nonexistent Post IDs | High | Closed |
| BUG-007 | Registration API accepted invalid email formats | Medium | Closed |

All seven defects were fixed and successfully retested.

---

# Jira Defect Management

The identified defects were tracked in Jira using the **SocialConnect QA** Kanban project.

### Jira Issues

| Jira Issue | Defect |
|---|---|
| KAN-1 | GET Comments API Returns Server Error |
| KAN-2 | Create Post API Accepts Nonexistent User ID |
| KAN-3 | Add Comment API Accepts Nonexistent User ID |
| KAN-4 | Like API Accepts Nonexistent User ID |
| KAN-5 | Add Comment API Accepts Nonexistent Post ID |
| KAN-6 | Like API Accepts Nonexistent Post ID |
| KAN-7 | Registration API Accepts Invalid Email Format |

All seven issues were moved to **Done** after fixes and retesting.

The Jira workflow provided defect tracking across:

```text
Defect Identification
        ↓
Bug Documentation
        ↓
Priority Assignment
        ↓
Fix Implementation
        ↓
Retesting
        ↓
Resolution
```

---

# Bug Fixing & Retesting

The identified defects were reproduced through Postman and then fixed in the application backend.

Examples of validations added during bug fixing include:

### User Validation

APIs now verify that referenced user IDs exist before creating:

- Posts
- Comments
- Likes

### Post Validation

Comment and like APIs now verify that the referenced post exists.

### Registration Validation

The registration API validates email format before creating an account.

### Comments API

The GET comments endpoint was corrected so that it does not incorrectly depend on a request body.

---

# Regression Testing

After the defects were fixed, regression testing was performed to verify that the changes did not break existing functionality.

### Regression Coverage

- Valid login
- Valid post creation
- Valid post liking
- Valid comment creation
- Comment retrieval
- Post retrieval
- Duplicate like prevention

### Regression Result

**7/7 regression tests passed.**

The bug fixes did not break the previously working application functionality covered by the regression suite.

---

# Test Results Summary

| Testing Activity | Result |
|---|---:|
| Functional Test Cases | 25/25 Passed |
| Defects Identified | 7 |
| Defects Fixed | 7 |
| Defects Retested | 7/7 Passed |
| Regression Tests | 7/7 Passed |
| SQL Validation | Passed |
| API Testing | Passed |

---

# Test Evidence

The `Evidence/` directory contains screenshots demonstrating the testing process and results.

```text
Evidence/
├── 01-Final-UI.png
├── 02-Authentication.png
├── 03-Postman-API-Success.png
├── 04-Bug-Retest.png
├── 05-SQL-Validation.png
├── 06-Bug-Reports.png
└── 07-Jira-Bug-Tracking.png
```

Evidence includes:

- Final application UI
- Authentication interface
- Successful API testing
- Bug retesting
- SQL validation
- Bug report documentation
- Jira defect tracking

---

# Project Structure

```text
SocialConnect-QA/
│
├── Evidence/
│   ├── 01-Final-UI.png
│   ├── 02-Authentication.png
│   ├── 03-Postman-API-Success.png
│   ├── 04-Bug-Retest.png
│   ├── 05-SQL-Validation.png
│   ├── 06-Bug-Reports.png
│   └── 07-Jira-Bug-Tracking.png
│
├── Postman/
│   └── SocialConnect API Tests.postman_collection.json
│
├── public/
│   ├── app.js
│   ├── feed.html
│   ├── index.html
│   ├── register.html
│   └── style.css
│
├── QA/
│   ├── Bug-Reports.md
│   ├── PRD.md
│   ├── Test-Cases.md
│   ├── Test-Execution.md
│   └── Test-Scenarios.md
│
├── database.js
├── server.js
├── check-db.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

---

# Key QA Skills Demonstrated

- Software Testing Life Cycle (STLC)
- Requirements Analysis
- Test Scenario Design
- Test Case Design
- Manual Functional Testing
- Positive Testing
- Negative Testing
- Boundary Value Testing
- API Testing
- REST API Validation
- HTTP Response Validation
- SQL Data Validation
- Data Persistence Testing
- Authorization Testing
- Defect Identification
- Severity & Priority Classification
- Bug Reporting
- Bug Retesting
- Regression Testing
- Jira Defect Tracking
- Postman
- SQL

---

# Key Testing Approach

The project focused on testing both expected and unexpected user behavior.

Examples include:

```text
Valid Input
    ↓
Expected Successful Response
```

and:

```text
Invalid Input
    ↓
Validation
    ↓
Appropriate Error Response
    ↓
No Invalid Data Stored
```

This approach was used to identify API validation and data integrity defects that were not immediately visible through normal UI usage.
