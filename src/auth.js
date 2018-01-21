export async function init() {
  window.username = window.localStorage.getItem("username");
  if (process.env.NODE_ENV !== "production" && !window.username) {
    let username;
    if (!username)
      username = prompt("Please enter username you want to imitate");
    window.username = username;
    window.localStorage.setItem("username", username);
  }
  await reloadUserinfo();
}

export function logout() {
  window.localStorage.removeItem("username");
  const redirectTo = process.env.NODE_ENV !== "production" ? "/" : "/logout";
  window.location.assign(redirectTo);
}

export async function reloadUserinfo() {
  try {
    let res = await window.fetchWithAuth("/users");
    if (res.status === 401) {
      window.location.assign(process.env.INFERNO_APP_TEAMS_URL);
      return;
    }
    res = await res.json();
    window.user = res;
    window.username = res.info.username;
    window.localStorage.setItem("username", window.username);
  } catch (e) {
    // Hopefully will fix error
    if (process.env.NODE_ENV === "production")
      window.location.assign(process.env.INFERNO_APP_TEAMS_URL);
  }
}
