const Login = (e) => {
  e.preventDefault();
  let scopes = "streaming user-read-birthdate user-read-email user-read-private user-modify-playback-state";
  window.location = [
    "https://accounts.spotify.com/authorize",
    `?client_id=e15891791aaf4f7b8f36d28d9c75996d`,
    `&redirect_uri=http://localhost:3000`,
    `&scope=${scopes.replace(" ", "%20")}`,
    "&response_type=token",
    "&show_dialog=true"
  ].join('');
}

const checkAuth = (callbacks) => {
  let { location: { hash } } = window;
  let hashExists = hash.length > 0;
  let hashObj = hash.substring(1).split('&').reduce((initial, item) => {
    if (item) {
      const parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

  if (hashExists) {
    window.location.hash = '';

    if (typeof callbacks.onSuccessfulAuthorization !== "undefined") {
      callbacks.onSuccessfulAuthorization(hashObj.access_token);
    }

    setTimeout(() => {
      if (typeof callbacks.onAccessTokenExpiration !== "undefined") {
        callbacks.onAccessTokenExpiration();
      }
    }, hashObj.expires_in * 1000);

    return hashObj.access_token;
  }
  else {
    return null;
  }
};

export { checkAuth, Login };