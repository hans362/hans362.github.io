(async () => {
  const pvCounterElements = {};

  document
    .querySelectorAll("main > .post-list > .post-entry > a")
    .forEach((e) => {
      const uri = /https?:\/\/[^\/]+\/(.*)\//.exec(e.href)[1] + "/";
      // Prepend with leading slash
      pvCounterElements[`/${uri}`] = {
        ele: e.parentElement.querySelector(".post-entry__meta .post-meta__pv"),
      };
    });

  pvCounterElements[document.location.pathname] = {
    ele: document.querySelector("main > .post-content > .post-title > .post-title__meta .post-meta__pv"),
  };

  const query = Object.keys(pvCounterElements).join(",");
  const json = await fetch(
    `https://analytics.0vv0.top/api/pageviews?pages=${query}`
  ).then((res) => res.json());

  for (const uri in json.data) {
    const ele = pvCounterElements[uri] && pvCounterElements[uri].ele;

    if (ele !== undefined && ele !== null) {
      ele.innerHTML = json.data[uri] + " 次浏览";
      ele.style.visibility = 'visible'
      ele.style.opacity = 1;
    }
  }
})();
