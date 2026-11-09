/* HDDL — shared render helpers: icons, cards, formatting, favorites */
(function () {
  "use strict";

  var W = window;

  W.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };

  /* ---- icons ---- */
  var SVG = function (path, fill) {
    return '<svg viewBox="0 0 24 24" ' + (fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2"') +
      ' aria-hidden="true">' + path + "</svg>";
  };
  W.ICONS = {
    bed: SVG('<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2m18-2v2M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/>'),
    bath: SVG('<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Zm0 0V5a2 2 0 0 1 2-2h1.5M7 19l-1 2m11-2 1 2"/>'),
    size: SVG('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 16v-5m4 5H8m8-8v5m-4-5h4"/>'),
    pin: SVG('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
    car: SVG('<path d="M5 17h14M6 17a2 2 0 1 0 4 0m4 0a2 2 0 1 0 4 0M5 17v-4l2-5h10l2 5v4M7 12h10"/>'),
    floor: SVG('<path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M4 21h16M9 8h6m-6 4h6m-6 4h6"/>'),
    arrow: SVG('<path d="M5 12h14m-6-6 6 6-6 6"/>'),
    check: SVG('<path d="m4 12 5 5L20 6"/>'),
    heart: SVG('<path d="M12 21s-8-5.3-8-11a4.6 4.6 0 0 1 8-3.1A4.6 4.6 0 0 1 20 10c0 5.7-8 11-8 11Z"/>'),
    photo: SVG('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5-5 3 3 4-4 4 4"/>'),
    calendar: SVG('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4m8-4v4M3 10h18"/>'),
    sofa: SVG('<path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3Z"/>'),
  };

  /* ---- price ---- */
  W.fmtPrice = function (p) {
    if (!p) return "Call for price";
    if (p.price_display) return W.esc(p.price_display);
    var a = p.price_amount;
    if (a == null) return "Call for price";
    if (a >= 1e7) return "Tk " + (a / 1e7).toFixed(2).replace(/\.00$/, "") + " Cr";
    if (a >= 1e5) return "Tk " + (a / 1e5).toFixed(1).replace(/\.0$/, "") + " Lakh";
    return "Tk " + Number(a).toLocaleString("en-US");
  };

  /* ---- asset paths: prefix page-relative paths with the page root ---- */
  W.assetSrc = function (src, root) {
    if (!src) return "";
    if (!root || /^(https?:|data:|\/|\.\.\/)/.test(src)) return src;
    return root + src;
  };

  /* ---- cover image / placeholder ---- */
  W.coverFor = function (p, root) {
    var imgs = (p && (p.images || p.image)) ? (p.images || [p.image]) : [];
    var src = imgs[0];
    if (!src) {
      return '<div class="ph-img" role="img" aria-label="Photo not available">' + ICONS.photo + "<span>Photo coming soon</span></div>";
    }
    return '<img src="' + esc(W.assetSrc(src, root)) + '" alt="' + esc(p.title || "Property photo") + '" loading="lazy">';
  };

  /* ---- spec chips under a card ---- */
  W.specsRow = function (p) {
    var out = "";
    if (p.size_sqft) out += "<span>" + ICONS.size + esc(p.size_sqft) + " sqft</span>";
    if (p.bedrooms) out += "<span>" + ICONS.bed + esc(p.bedrooms) + " Beds</span>";
    if (p.bathrooms) out += "<span>" + ICONS.bath + esc(p.bathrooms) + " Baths</span>";
    if (p.parking) out += "<span>" + ICONS.car + "Parking " + esc(p.parking) + "</span>";
    return out;
  };

  W.badgesFor = function (p) {
    var b = [];
    if (p.purpose) b.push('<span class="badge gold">' + esc(p.purpose === "sale" ? "For Sale" : "For Rent") + "</span>");
    if (p.status) b.push('<span class="badge">' + esc(p.status) + "</span>");
    return b.join("");
  };

  /* ---- property card ---- */
  W.propCard = function (p, root) {
    root = root || "";
    var href = root + "properties/property-" + p.id + ".html";
    var favs = W.getFavs();
    var isFav = favs.indexOf(String(p.id)) !== -1;
    var loc = [p.area, p.city].filter(Boolean).join(", ") || "Dhaka";
    return (
      '<article class="prop-card reveal" data-id="' + esc(p.id) + '">' +
      '<div class="prop-media">' +
      '<div class="prop-badges">' + W.badgesFor(p) + "</div>" +
      '<button class="fav-btn' + (isFav ? " active" : "") + '" data-fav="' + esc(p.id) + '" aria-label="Save to favorites" aria-pressed="' + isFav + '">' + ICONS.heart + "</button>" +
      W.coverFor(p, root) +
      "</div>" +
      '<div class="prop-body">' +
      '<div class="prop-price">' + W.fmtPrice(p) + (p.price_qualifier ? " <small>" + esc(p.price_qualifier) + "</small>" : "") + "</div>" +
      '<h3 class="prop-title"><a href="' + href + '">' + esc(p.title) + "</a></h3>" +
      '<span class="prop-loc">' + ICONS.pin + esc(loc) + "</span>" +
      (p.project_name ? '<span class="prop-loc">' + ICONS.sofa + esc(p.project_name) + "</span>" : "") +
      '<div class="prop-meta">' + W.specsRow(p) + "</div>" +
      '<div class="prop-foot">' +
      '<span class="prop-id">ID ' + esc(p.id) + "</span>" +
      '<a class="btn btn-outline btn-sm" href="' + href + '">View Details ' + ICONS.arrow + "</a>" +
      "</div>" +
      "</div></article>"
    );
  };

  W.renderCards = function ($el, items, root, emptyMsg) {
    if (!$el || !$el.length) return;
    if (!items.length) {
      $el.html('<div class="no-results">' + (emptyMsg || "No properties match your filters.") + "</div>");
      return;
    }
    $el.html(items.map(function (p) { return W.propCard(p, root); }).join(""));
    $el.find(".reveal").addClass("in"); /* cards render after load; skip stagger */
  };

  /* ---- favorites + recently viewed (localStorage) ---- */
  var FKEY = "hddl_favs", RKEY = "hddl_recent";
  function readKey(k) {
    try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch (e) { return []; }
  }
  function writeKey(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  W.getFavs = function () { return readKey(FKEY).map(String); };
  W.toggleFav = function (id) {
    id = String(id);
    var f = W.getFavs();
    var i = f.indexOf(id);
    if (i === -1) f.push(id); else f.splice(i, 1);
    writeKey(FKEY, f);
    return i === -1;
  };
  W.pushRecent = function (id) {
    id = String(id);
    var r = readKey(RKEY).filter(function (x) { return x !== id; });
    r.unshift(id);
    writeKey(RKEY, r.slice(0, 6));
  };
  W.getRecent = function () { return readKey(RKEY).map(String); };

  /* ---- favorites click handling (delegated, all pages) ---- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-fav]");
    if (!btn) return;
    e.preventDefault();
    var added = W.toggleFav(btn.getAttribute("data-fav"));
    btn.classList.toggle("active", added);
    btn.setAttribute("aria-pressed", String(added));
  });

  /* ---- section renderer: fills [data-props="key"] containers ---- */
  W.renderSections = function () {
    var props = window.HDDL_PROPERTIES || [];
    var map = {
      featured: function () {
        return props.filter(function (p) { return p.featured; }).slice(0, 3);
      },
      latest: function () { return props.slice(0, 3); },
      recent: function () {
        var ids = W.getRecent();
        return ids.map(function (id) {
          return props.filter(function (p) { return String(p.id) === id; })[0];
        }).filter(Boolean);
      },
    };
    document.querySelectorAll("[data-props]").forEach(function (el) {
      var kind = el.getAttribute("data-props");
      var fn = map[kind];
      if (!fn) return;
      var root = el.getAttribute("data-root") || "";
      var items = fn();
      if (kind === "recent" && !items.length) {
        el.closest("[data-recent-wrap]")?.classList.add("hidden-section");
        return;
      }
      W.renderCards(window.jQuery ? window.jQuery(el) : null, items, root,
        kind === "recent" ? "No recently viewed properties yet." : "No properties available yet. Check back soon.");
    });
  };

  /* ---- project teasers: [data-projects] ---- */
  W.projectCard = function (pr, root) {
    var href = root + "projects/project-" + esc(pr.slug) + ".html";
    var media = pr.cover_image
      ? '<img class="cover" src="' + esc(W.assetSrc(pr.cover_image, root)) + '" alt="' + esc(pr.name) + ' — project cover photo" loading="lazy">'
      : '<div class="ph-img" role="img" aria-label="Project photo coming soon">' + ICONS.photo + "<span>Photo coming soon</span></div>";
    var chips = "";
    if (pr.status) chips += '<span class="proj-stat">' + esc(pr.status) + "</span>";
    if (pr.handover) chips += '<span class="proj-stat">Handover: ' + esc(pr.handover) + "</span>";
    return (
      '<article class="project-card reveal">' + media +
      '<div class="project-card-body">' +
      '<h3><a href="' + href + '">' + esc(pr.name) + "</a></h3>" +
      '<span class="prop-loc">' + ICONS.pin + esc(pr.area ? pr.area + ", Dhaka" : "Dhaka") + "</span>" +
      (chips ? '<div class="proj-stats">' + chips + "</div>" : "") +
      '<div class="row"><a class="btn btn-accent btn-sm" href="' + href + '">View project ' + ICONS.arrow + "</a></div>" +
      "</div></article>"
    );
  };

  W.renderProjects = function () {
    document.querySelectorAll("[data-projects]").forEach(function (el) {
      if (el.children.length) return; /* a page-specific renderer already filled it */
      var root = el.getAttribute("data-root") || "";
      var limit = parseInt(el.getAttribute("data-limit") || "0", 10);
      var list = (window.HDDL_PROJECTS || []).slice();
      if (limit > 0) list = list.slice(0, limit);
      if (!list.length) return;
      el.innerHTML = list.map(function (pr) { return W.projectCard(pr, root); }).join("");
      el.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("in"); });
    });
  };

  /* ---- video teasers: [data-videos] (properties with verified listing videos) ---- */
  W.renderVideos = function () {
    document.querySelectorAll("[data-videos]").forEach(function (el) {
      var root = el.getAttribute("data-root") || "";
      var limit = parseInt(el.getAttribute("data-limit") || "0", 10);
      var props = (window.HDDL_PROPERTIES || []).filter(function (p) { return (p.videos || []).length; });
      if (limit > 0) props = props.slice(0, limit);
      if (!props.length) return;
      el.innerHTML = props.map(function (p) {
        return (
          '<article class="video-card reveal">' +
          '<a href="' + root + 'videos.html" aria-label="Watch videos for ' + esc(p.project_name || p.title) + '">' +
          W.coverFor(p, root) +
          "</a>" +
          '<div class="video-card-body"><h3>' + esc(p.project_name || p.title) + "</h3>" +
          '<p class="video-note">' + esc(p.area ? p.area + ", Dhaka" : "Dhaka") + " — walk-through video from the listing</p>" +
          '<p style="margin:10px 0 0;"><a class="btn btn-outline btn-sm" href="' + root + 'videos.html">Watch videos ' + ICONS.arrow + "</a></p>" +
          "</div></article>"
        );
      }).join("");
      el.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("in"); });
    });
  };

  /* ---- gallery teasers: [data-gallery-grid] (listing photos + floor plans) ---- */
  W.renderGalleryGrid = function () {
    document.querySelectorAll("[data-gallery-grid]").forEach(function (el) {
      if (el.children.length) return; /* static content already placed */
      var root = el.getAttribute("data-root") || "";
      var limit = parseInt(el.getAttribute("data-limit") || "0", 10);
      var items = [];
      (window.HDDL_PROPERTIES || []).forEach(function (p) {
        var who = p.project_name || p.title;
        (p.images || []).forEach(function (src, i) {
          items.push({ src: W.assetSrc(src, root), caption: who + " — photo " + (i + 1), alt: "Building photo: " + who });
        });
        (p.floor_plans || []).forEach(function (src, i) {
          items.push({ src: W.assetSrc(src, root), caption: who + " — floor plan " + (i + 1), alt: "Floor plan: " + who });
        });
      });
      if (limit > 0) items = items.slice(0, limit);
      if (!items.length) return;
      el.innerHTML = items.map(function (it) {
        return (
          '<figure class="gallery-item" tabindex="0" role="button" data-full="' + esc(it.src) + '" data-caption="' + esc(it.caption) + '" aria-label="Open image: ' + esc(it.caption) + '">' +
          '<img src="' + esc(it.src) + '" alt="' + esc(it.alt) + '" loading="lazy">' +
          "<figcaption>" + esc(it.caption) + "</figcaption></figure>"
        );
      }).join("");
    });
  };

  /* keyboard access for lightbox triggers written as figures */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var t = e.target && e.target.closest ? e.target.closest('figure[data-full]') : null;
    if (!t) return;
    e.preventDefault();
    t.click();
  });

  /* missing project cover images → standard placeholder (any page) */
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (!img || !img.classList || !img.classList.contains("cover")) return;
    var ph = document.createElement("div");
    ph.className = "ph-img";
    ph.setAttribute("role", "img");
    ph.setAttribute("aria-label", "Project photo coming soon");
    ph.innerHTML = ICONS.photo + "<span>Photo coming soon</span>";
    img.replaceWith(ph);
  }, true);

  /* bootstrap: fill all data-driven sections once DOM and data bridges are ready */
  function boot() {
    W.renderSections();
    W.renderProjects();
    W.renderVideos();
    W.renderGalleryGrid();
  }
  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
