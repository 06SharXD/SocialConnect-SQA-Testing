# SocialConnect — Test Cases

| Test Case ID | Scenario | Steps | Expected Result |
|---|---|---|---|
| TC-REG-001 | Valid registration | Enter valid name, email and 8+ character password → Click Register | Account is created successfully |
| TC-REG-002 | Empty name | Leave name empty → Enter valid email/password → Register | Registration fails with an appropriate error |
| TC-REG-003 | Empty email | Enter name → Leave email empty → Enter password → Register | Registration fails |
| TC-REG-004 | Empty password | Enter name/email → Leave password empty → Register | Registration fails |
| TC-REG-005 | Short password | Enter valid name/email → Enter password with fewer than 8 characters → Register | Registration fails |
| TC-REG-006 | Duplicate email | Register using an already registered email | Registration fails with duplicate-email message |
| TC-LOGIN-001 | Valid login | Enter registered email/password → Login | User is redirected to feed |
| TC-LOGIN-002 | Incorrect password | Enter registered email + incorrect password → Login | Login fails |
| TC-LOGIN-003 | Unregistered email | Enter unregistered email + password → Login | Login fails |
| TC-LOGIN-004 | Empty email | Leave email empty → Enter password → Login | Login fails with validation message |
| TC-LOGIN-005 | Empty password | Enter email → Leave password empty → Login | Login fails with validation message |
| TC-LOGIN-006 | Uppercase email | Enter registered email using uppercase letters → Enter correct password → Login | Login succeeds |
| TC-FEED-001 | View feed | Login with valid credentials | Feed is displayed |
| TC-FEED-002 | Display post | Login when posts exist | Posts display author and content |
| TC-FEED-003 | Newest post first | Create multiple posts | Newest post appears first |
| TC-FEED-004 | Refresh persistence | Create a post → Refresh page | Post remains visible |
| TC-POST-001 | Valid post | Enter valid text → Click Post | Post is created and displayed |
| TC-POST-002 | Empty post | Leave post field empty → Click Post | Post is rejected |
| TC-POST-003 | 500-character post | Enter exactly 500 characters → Click Post | Post is created |
| TC-POST-004 | More than 500 characters | Attempt to submit more than 500 characters | Post is rejected |
| TC-POST-005 | Database persistence | Create post → Refresh → Login again | Post remains available |
| TC-LIKE-001 | Like post | Click Like on a post | Like count increases |
| TC-LIKE-002 | Duplicate like | Click Like twice on the same post | Second like is rejected |
| TC-LIKE-003 | Like persistence | Like a post → Refresh page | Like remains |
| TC-COMMENT-001 | Valid comment | Click Comment → Enter text → Submit | Comment appears below post |
| TC-COMMENT-002 | Empty comment | Click Comment → Submit empty comment | Comment is rejected |
| TC-COMMENT-003 | Comment persistence | Add comment → Refresh page | Comment remains |
| TC-DELETE-001 | Delete own post | Create post → Click Delete | Post disappears |
| TC-DELETE-002 | Delete persistence | Delete own post → Refresh page | Deleted post remains absent |
| TC-DELETE-003 | Delete another user's post | Login as User B and inspect User A's post | Delete option is not available |
| TC-LOGOUT-001 | Logout | Click Logout | User is returned to login page |
| TC-LOGOUT-002 | Login after logout | Logout → Login again with valid credentials | User successfully accesses feed |
| TC-DATA-001 | Data after restart | Create data → Stop server → Restart server → Login | Previously stored data remains |