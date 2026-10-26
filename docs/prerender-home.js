(function () {
  var base = "";
  var chunk = "/_expo/static/js/web/HomePageView-a17567e2e9a631957eeb79dac4928418.js";
  var root = document.documentElement;
  function homePath(pathname) {
    var p = pathname.indexOf(base) === 0 ? pathname.slice(base.length) : pathname;
    p = p.replace(/\/+$/, '') || '/';
    return p === '/' || p === '/index.html' || p === '/welcome' || p === '/welcome.html';
  }
  function giveWay() {
    root.classList.add('cl-app');
    var copy = document.getElementById('cl-prerender');
    if (copy && copy.parentNode) copy.parentNode.removeChild(copy);
  }
  var signedIn = false;
  var mode = null;
  try {
    for (var i = 0; i < localStorage.length; i++) {
      if (/^sb-.+-auth-token/.test(localStorage.key(i) || '')) signedIn = true;
    }
    mode = (localStorage.getItem('cluster.themeMode') || '').replace(/"/g, '');
  } catch (e) {}
  var redirect = /[?&#](code|error|access_token|token_hash|type)=/.test(location.search + location.hash);
  if (signedIn || redirect || !homePath(location.pathname)) {
    root.classList.add('cl-app');
    return;
  }
  if (chunk) {
    var preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'script';
    preload.href = chunk;
    document.head.appendChild(preload);
  }
  var dark = mode === 'dark' || (mode !== 'light' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
  if (dark) root.classList.add('cl-home-dark');
  // The app moving off the homepage before its own copy mounts (it redirects / to /welcome, which stays).
  ['pushState', 'replaceState'].forEach(function (name) {
    var original = history[name];
    history[name] = function () {
      var result = original.apply(this, arguments);
      if (!homePath(location.pathname)) giveWay();
      return result;
    };
  });
  window.addEventListener('popstate', function () {
    if (!homePath(location.pathname)) giveWay();
  });
})();
