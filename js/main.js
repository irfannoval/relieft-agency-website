(function () {
  // Ganti nomor WhatsApp dengan format 62...
  var NUM = "6280000000000";

  function wa(message) {
    return "https://wa.me/" + NUM + "?text=" + encodeURIComponent(message);
  }

  document.querySelectorAll("[data-wa]").forEach(function (link) {
    link.href = wa(link.getAttribute("data-wa"));
    link.target = "_blank";
    link.rel = "noopener";
  });

  var views = [].slice.call(document.querySelectorAll("[data-view]"));
  var links = document.querySelectorAll(".menu a");
  var menu = document.getElementById("menu");
  var bg = document.getElementById("bg");

  function go() {
    var hash = (location.hash || "#beranda").slice(1);
    var currentView = views.filter(function (view) {
      return view.dataset.view === hash;
    })[0] || views[0];

    currentView.querySelectorAll(".rv.in").forEach(function (element) {
      element.classList.remove("in");
    });

    views.forEach(function (view) {
      view.hidden = view !== currentView;
    });

    links.forEach(function (link) {
      if (link.getAttribute("href") === "#" + currentView.dataset.view) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    document.title = currentView.dataset.t;
    menu.classList.remove("open");
    bg.setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", go);
  go();

  bg.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("open");
    bg.setAttribute("aria-expanded", isOpen);
  });

  var buttons = document.querySelectorAll(".filters button");
  var tiles = document.querySelectorAll("[data-view=portofolio] .tile");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(function (item) {
        item.setAttribute("aria-pressed", item === button);
      });

      tiles.forEach(function (tile) {
        var categories = " " + tile.dataset.c + " ";
        var matches = button.dataset.f === "visual"
          ? categories.indexOf(" video ") >= 0 || categories.indexOf(" drone ") >= 0
          : categories.indexOf(" " + button.dataset.f + " ") >= 0;

        tile.hidden = button.dataset.f !== "all" && !matches;
      });
    });
  });

  document.getElementById("f").addEventListener("submit", function (event) {
    event.preventDefault();

    var form = event.target;
    var message = "Halo Relieft Agency, saya " + form.n.value +
      ". Kebutuhan: " + form.k.value + ". " + form.m.value;

    window.open(wa(message), "_blank", "noopener");
  });

  document.getElementById("y").textContent = new Date().getFullYear();
  document.documentElement.classList.add("js");

  var posters = {
    wd: "assets/img/pernikahan.jpg",
    vl: "assets/img/villa.jpg",
    um: "assets/img/umkm.jpg"
  };
  var videos = {
    wd: "assets/video/pernikahan.mp4",
    vl: "assets/video/villa.mp4",
    um: "assets/video/umkm.mp4"
  };

  var lightbox = document.getElementById("lb");
  var video = lightbox.querySelector("video");
  var caption = lightbox.querySelector("p");

  function play(key, title) {
    caption.textContent = title;
    video.src = videos[key];
    video.poster = posters[key];
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";

    var playback = video.play();
    if (playback) {
      playback.catch(function () {});
    }
  }

  function shut() {
    video.pause();
    video.removeAttribute("src");
    video.load();
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-v]").forEach(function (tile) {
    var key = tile.dataset.v;
    var title = tile.querySelector("b").textContent;

    tile.style.backgroundImage = "url(" + posters[key] + ")";
    tile.setAttribute("role", "button");
    tile.tabIndex = 0;
    tile.setAttribute("aria-label", "Putar video: " + title);
    tile.insertAdjacentHTML("beforeend", '<i class="pl"></i>');

    tile.addEventListener("click", function () {
      play(key, title);
    });

    tile.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        play(key, title);
      }
    });
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox || event.target.className === "x") {
      shut();
    }
  });

  addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !lightbox.hidden) {
      shut();
    }
  });

  document.querySelectorAll("h1").forEach(function (heading) {
    heading.innerHTML = heading.textContent.split(" ").map(function (word, index) {
      return '<span class="w"><span style="--i:' + index + '">' + word + "</span></span>";
    }).join(" ");
  });

  var marquee = document.querySelector(".mq>div");
  marquee.innerHTML += marquee.innerHTML;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    "main h2,main .lead,.hero .actions,.three>*,.points>*,.steps li," +
    ".tier,.tile,.unit,blockquote,details,.stats>*,.split>*,.info p,form"
  ).forEach(function (element) {
    element.classList.add("rv");
    element.style.setProperty(
      "--d",
      ([].indexOf.call(element.parentNode.children, element) % 5) * 0.09 + "s"
    );
    observer.observe(element);
  });

  var header = document.querySelector("header");
  var progressBar = document.createElement("i");
  progressBar.className = "pb";
  header.appendChild(progressBar);

  addEventListener("scroll", function () {
    var maxScroll = document.documentElement.scrollHeight - innerHeight;
    header.style.setProperty("--p", maxScroll > 0 ? scrollY / maxScroll : 0);
  }, { passive: true });

  var stage = document.querySelector(".stage");

  if (stage && matchMedia("(hover:hover)").matches) {
    document.querySelector(".hero").addEventListener("mousemove", function (event) {
      var bounds = stage.getBoundingClientRect();
      stage.style.setProperty("--mx", ((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
      stage.style.setProperty("--my", ((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
    });
  }
})();
