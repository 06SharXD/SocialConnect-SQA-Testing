const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const postsContainer = document.getElementById("posts");

function setMessage(element, message, type = "") {
  if (!element) return;
  element.textContent = message;
  element.className = `message${type ? ` ${type}` : ""}`;
}

async function readResponse(response) {
  try { return await response.json(); }
  catch { return { success: false, message: "Something went wrong. Please try again." }; }
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = loginForm.querySelector("button[type='submit']");
    const message = document.getElementById("message");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    button.disabled = true;
    button.innerHTML = "Signing you in…";
    setMessage(message, "");
    try {
      const response = await fetch("/api/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await readResponse(response);
      if (!data.success) {
        setMessage(message, data.message || "We couldn't sign you in. Check your details and try again.", "error");
        return;
      }
      localStorage.setItem("socialconnectUser", JSON.stringify(data.user));
      window.location.href = "/feed.html";
    } catch {
      setMessage(message, "Could not reach SocialConnect. Check your connection and try again.", "error");
    } finally {
      button.disabled = false;
      button.innerHTML = 'Sign in <span aria-hidden="true">→</span>';
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = registerForm.querySelector("button[type='submit']");
    const message = document.getElementById("message");
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    button.disabled = true;
    button.innerHTML = "Creating your account…";
    setMessage(message, "");
    try {
      const response = await fetch("/api/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await readResponse(response);
      setMessage(message, data.message || (data.success ? "Your account is ready!" : "We couldn't create your account."), data.success ? "success" : "error");
      if (data.success) setTimeout(() => { window.location.href = "/"; }, 1100);
    } catch {
      setMessage(message, "Could not reach SocialConnect. Check your connection and try again.", "error");
    } finally {
      button.disabled = false;
      button.innerHTML = 'Create my account <span aria-hidden="true">→</span>';
    }
  });
}

function getCurrentUser() {
  try {
    const stored = localStorage.getItem("socialconnectUser");
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

if (postsContainer) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "/";
  } else {
    const name = user.name || "Friend";
    const initial = name.trim().charAt(0).toUpperCase() || "S";
    document.getElementById("currentUser").textContent = name;
    document.getElementById("userAvatar").textContent = initial;
    document.getElementById("composerAvatar").textContent = initial;
    document.getElementById("composerName").textContent = `Hey, ${name.split(" ")[0]}`;
    loadPosts();
  }
}

const postContentInput = document.getElementById("postContent");
if (postContentInput) {
  postContentInput.addEventListener("input", () => {
    document.getElementById("charCount").textContent = `${postContentInput.value.length} / 500`;
  });
  postContentInput.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") createPost();
  });
}

async function loadPosts() {
  try {
    const response = await fetch("/api/posts");
    if (!response.ok) throw new Error("Unable to load posts");
    const posts = await response.json();
    postsContainer.replaceChildren();
    if (!posts.length) {
      postsContainer.innerHTML = '<div class="empty-state"><span>✳</span><strong>Your feed is a fresh canvas.</strong>Be the first to share a thought with your community.</div>';
      return;
    }
    for (const post of posts) {
      let comments = [];
      try {
        const commentsResponse = await fetch(`/api/posts/${post.id}/comments`);
        if (commentsResponse.ok) comments = await commentsResponse.json();
      } catch { /* The post can still be shown if comments are temporarily unavailable. */ }
      const user = getCurrentUser();
      const postElement = document.createElement("article");
      postElement.className = "post";
      const avatar = document.createElement("div");
      avatar.className = "avatar post-avatar";
      avatar.textContent = (post.name || "S").trim().charAt(0).toUpperCase();
      const head = document.createElement("div");
      head.className = "post-head";
      const meta = document.createElement("div");
      meta.className = "post-meta";
      const author = document.createElement("div");
      author.className = "post-author";
      author.textContent = post.name || "Community member";
      const timestamp = document.createElement("span");
      timestamp.className = "post-time";
      timestamp.textContent = "Shared with the community";
      meta.append(author, timestamp);
      head.append(avatar, meta);
      const content = document.createElement("div");
      content.className = "post-content";
      content.textContent = post.content;
      const divider = document.createElement("div");
      divider.className = "post-divider";
      const actions = document.createElement("div");
      actions.className = "actions";
      const like = document.createElement("button");
      like.className = "action-button like-button";
      like.type = "button";
      like.textContent = `♡  Like${post.like_count ? ` · ${post.like_count}` : ""}`;
      like.addEventListener("click", () => likePost(post.id));
      const commentToggle = document.createElement("button");
      commentToggle.className = "action-button";
      commentToggle.type = "button";
      commentToggle.textContent = `◌  Comment${comments.length ? ` · ${comments.length}` : ""}`;
      commentToggle.addEventListener("click", () => {
        const input = postElement.querySelector(".comment-form input");
        input.focus();
        input.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
      actions.append(like, commentToggle);
      if (user && post.user_id === user.id) {
        const remove = document.createElement("button");
        remove.className = "action-button delete-button";
        remove.type = "button";
        remove.textContent = "Delete post";
        remove.addEventListener("click", () => deletePost(post.id));
        actions.append(remove);
      }
      const commentsArea = document.createElement("div");
      commentsArea.className = "comments";
      for (const comment of comments) {
        const item = document.createElement("div");
        item.className = "comment";
        const commentAuthor = document.createElement("strong");
        commentAuthor.textContent = `${comment.name}:`;
        item.append(commentAuthor, document.createTextNode(` ${comment.content}`));
        commentsArea.append(item);
      }
      const commentForm = document.createElement("form");
      commentForm.className = "comment-form";
      const commentInput = document.createElement("input");
      commentInput.type = "text";
      commentInput.maxLength = 500;
      commentInput.placeholder = "Add a kind thought…";
      commentInput.setAttribute("aria-label", "Write a comment");
      const send = document.createElement("button");
      send.type = "submit";
      send.textContent = "Send ↗";
      commentForm.append(commentInput, send);
      commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        submitComment(post.id, commentInput.value);
      });
      commentsArea.append(commentForm);
      postElement.append(head, content, divider, actions, commentsArea);
      postsContainer.append(postElement);
    }
  } catch {
    postsContainer.innerHTML = '<div class="empty-state"><span>↻</span><strong>We lost the connection.</strong>Give it another try in a moment.<br><button class="action-button" type="button" onclick="loadPosts()">Try again</button></div>';
  }
}

async function createPost() {
  const user = getCurrentUser();
  const content = postContentInput.value.trim();
  const message = document.getElementById("postMessage");
  if (!content) {
    setMessage(message, "Add a little something before sharing.", "error");
    postContentInput.focus();
    return;
  }
  const button = document.querySelector(".post-button");
  button.disabled = true;
  try {
    const response = await fetch("/api/posts", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, content })
    });
    const data = await readResponse(response);
    if (!data.success) {
      setMessage(message, data.message || "Your post couldn't be shared.", "error");
      return;
    }
    postContentInput.value = "";
    document.getElementById("charCount").textContent = "0 / 500";
    setMessage(message, "Shared with your community ✨", "success");
    await loadPosts();
    setTimeout(() => setMessage(message, ""), 2200);
  } catch { setMessage(message, "Could not reach SocialConnect. Try again.", "error"); }
  finally { button.disabled = false; }
}

async function likePost(postId) {
  const user = getCurrentUser();
  try {
    const response = await fetch(`/api/posts/${postId}/like`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id })
    });
    const data = await readResponse(response);
    if (!data.success) window.alert(data.message);
    await loadPosts();
  } catch { window.alert("Could not reach SocialConnect. Try again."); }
}

async function submitComment(postId, content) {
  const user = getCurrentUser();
  if (!content.trim()) return;
  try {
    const response = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, content: content.trim() })
    });
    const data = await readResponse(response);
    if (!data.success) window.alert(data.message);
    await loadPosts();
  } catch { window.alert("Could not reach SocialConnect. Try again."); }
}

async function deletePost(postId) {
  const user = getCurrentUser();
  if (!window.confirm("Delete this post? This can't be undone.")) return;
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id })
    });
    const data = await readResponse(response);
    if (!data.success) window.alert(data.message);
    await loadPosts();
  } catch { window.alert("Could not reach SocialConnect. Try again."); }
}

function logout() {
  localStorage.removeItem("socialconnectUser");
  window.location.href = "/";
}
