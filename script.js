window.addEventListener("load", async () => {
  const arr = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      return json;
    });

  const cards = document.querySelector(".cards");

  await arr.map((e) => {
    const card = document.createElement("div");
    card.classList.add("card");
    cards.appendChild(card);

    const title = document.createElement("h3");
    title.classList.add("title");
    card.appendChild(title);
    title.innerHTML = e.title;

    const para = document.createElement("p");
    para.classList.add("desc");
    card.appendChild(para);
    para.innerHTML = `desc ${e.body}`;

    const write = document.createElement("strong");
    write.classList.add("written");
    card.appendChild(write);
    write.innerHTML = "Written by: ";

    const aut = document.createElement("span");
    aut.classList.add("author");
    card.appendChild(aut);
    aut.innerHTML = `userId ${e.userId}`;
    // ....................................................Delete element.........................
    const del = document.createElement("button");
    del.classList.add("del");
    del.innerHTML = "delete";
    card.appendChild(del);
    del.addEventListener("click", () => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${e.id}`, {
        method: "DELETE",
      }).then(cards.removeChild(card));
    });
  });

  document.querySelector(".new").addEventListener("click", async (e) => {
    e.preventDefault();
    const ct = document.querySelector(".ct");
    const cb = document.querySelector(".cb");
    const ca = document.querySelector(".ca");
    if (!ct.value || !cb.value || !ca.value) {
      window.alert("please enter all feilds");
    } else {
      console.log(ct.value, cb.value, ca.value);
      const n = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: ct.value,
          body: cb.value,
          userId: ca.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          return json;
        });

      const card = document.createElement("div");
      card.classList.add("card");
      cards.appendChild(card);

      const title = document.createElement("h3");
      title.classList.add("title");
      card.appendChild(title);
      title.innerHTML = n.title;

      const para = document.createElement("p");
      para.classList.add("desc");
      card.appendChild(para);
      para.innerHTML = `desc ${n.body}`;

      const write = document.createElement("strong");
      write.classList.add("written");
      card.appendChild(write);
      write.innerHTML = "Written by: ";

      const aut = document.createElement("span");
      aut.classList.add("author");
      card.appendChild(aut);
      aut.innerHTML = `userId ${n.userId}`;
      cards.insertBefore(card, cards.firstChild);

      const del = document.createElement("button");
      del.classList.add("del");
      del.innerHTML = "delete";
      card.appendChild(del);
      del.addEventListener("click", () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${n.id}`, {
          method: "DELETE",
        }).then(cards.removeChild(card));
      });
    }
  });
});
