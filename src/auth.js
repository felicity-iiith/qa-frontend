export function init() {
  window.username = window.localStorage.getItem("username");
  if (!window.username) {
    const username = prompt("Please enter username you want to imitate");
    window.username = username;
    window.localStorage.setItem("username", username);
  }
}

export function logout() {
  window.localStorage.removeItem("username");
  window.location.assign("/");
}
