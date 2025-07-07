document.getElementById("getTokenButton").addEventListener("click", getToken);

function getToken() {
  const token = Math.random().toString(36).substring(2, 12);
  const data = {
    username: "guest_" + Math.floor(Math.random() * 999),
    password: "none",
    token: token,
    role: "user"
  };

  fetch("https://api.github.com/repos/limit9172/dbxein/contents/db.json", {
    method: "GET",
    headers: {
      Authorization: "Bearer github_pat_xxx" // REPLACE TOKEN
    }
  })
  .then(res => res.json())
  .then(json => {
    const db = JSON.parse(atob(json.content));
    db.users.push(data);

    return fetch("https://api.github.com/repos/limit9172/dbxein/contents/db.json", {
      method: "PUT",
      headers: {
        "Authorization": "Bearer github_pat_xxx", // REPLACE TOKEN
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Add token via web",
        content: btoa(JSON.stringify(db, null, 4)),
        sha: json.sha
      })
    });
  })
  .then(() => {
    document.getElementById("result").innerHTML = `
      <b>✅ Your token has been successfully created!</b><br><br>
      🧾 Token: <code>${token}</code><br>
      Use this token in XeinTools CLI.
    `;
  })
  .catch(error => {
    document.getElementById("result").innerHTML = `
      <b>❌ An error occurred: ${error.message}</b>
    `;
  });
}
