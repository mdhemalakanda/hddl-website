/* HDDL — property listing page: search, filters, sort, pagination, grid/list */
(function ($) {
  "use strict";
  if (document.body.dataset.page !== "properties") return;

  var ALL = window.HDDL_PROPERTIES || [];
  var $grid = $("#propertiesGrid");
  var $count = $("#resultCount");
  var $sort = $("#sortSelect");
  var PAGE_SIZE = 9;

  var state = {
    keyword: "", location: "", project: "", status: "", purpose: "",
    beds: "", baths: "", priceMin: "", priceMax: "", sizeMin: "", sizeMax: "",
    sort: "featured", page: 1, view: "grid",
  };

  /* ---------- distinct value helpers ---------- */
  function distinct(key) {
    var set = [];
    ALL.forEach(function (p) {
      var v = p[key];
      if (v == null || v === "") return;
      var s = String(v);
      if (set.indexOf(s) === -1) set.push(s);
    });
    return set;
  }

  /* ---------- populate filters from the dataset (only real values) ---------- */
  function fillSelect(sel, values, label) {
    if (!sel.length) return;
    if (values.length < 2) { sel.closest(".field").prop("hidden", true); return; }
    sel.append($("<option>", { value: "", text: label }));
    values.sort().forEach(function (v) {
      sel.append($("<option>", { value: v, text: v }));
    });
  }
  fillSelect($("#fLocation"), distinct("area"), "Any location");
  fillSelect($("#fProject"), distinct("project_name"), "Any project");
  fillSelect($("#fStatus"), distinct("status"), "Any status");

  /* beds/baths chips: only when more than one distinct value */
  function fillChips(sel, key) {
    var values = distinct(key).sort();
    var $wrap = $(sel);
    if (values.length < 2) { $wrap.closest("fieldset").prop("hidden", true); return; }
    values.forEach(function (v) {
      $('<button type="button" class="chip">').text(v + "+").attr("data-val", v).appendTo($wrap);
    });
  }
  fillChips("#fBeds", "bedrooms");
  fillChips("#fBaths", "bathrooms");

  /* ---------- URL deep links (?status=...&purpose=...&project=...&location=...&beds=...) ---------- */
  (function readUrl() {
    var q = new URLSearchParams(location.search);
    ["location", "project", "status", "purpose"].forEach(function (k) {
      var v = q.get(k);
      if (v) state[k] = v;
    });
    if (q.get("beds")) state.beds = q.get("beds");
    $("#fLocation").val(state.location);
    $("#fProject").val(state.project);
    $("#fStatus").val(state.status);
    /* purpose filter is select-based only when multiple purposes exist */
    $("#fPurpose").val(state.purpose);
  })();

  /* ---------- filtering ---------- */
  function num(v) { var n = parseFloat(String(v).replace(/[^0-9.]/g, "")); return isNaN(n) ? null : n; }

  function filtered() {
    var kw = state.keyword.trim().toLowerCase();
    var pMin = num(state.priceMin), pMax = num(state.priceMax);
    var sMin = num(state.sizeMin), sMax = num(state.sizeMax);
    var out = ALL.filter(function (p) {
      if (kw) {
        var hay = [p.title, p.subtitle, p.project_name, p.area, p.city, p.address, p.id]
          .filter(Boolean).join(" ").toLowerCase();
        if (hay.indexOf(kw) === -1) return false;
      }
      if (state.location && String(p.area) !== state.location) return false;
      if (state.project && String(p.project_name) !== state.project) return false;
      if (state.status && String(p.status) !== state.status) return false;
      if (state.purpose && String(p.purpose) !== state.purpose) return false;
      if (state.beds && !(p.bedrooms >= parseInt(state.beds, 10))) return false;
      if (state.baths && !(p.bathrooms >= parseInt(state.baths, 10))) return false;
      if (pMin != null && (p.price_amount == null || p.price_amount < pMin)) return false;
      if (pMax != null && (p.price_amount == null || p.price_amount > pMax)) return false;
      if (sMin != null && !(p.size_sqft >= sMin)) return false;
      if (sMax != null && !(p.size_sqft <= sMax)) return false;
      return true;
    });
    return sortList(out);
  }

  function sortList(list) {
    var by = state.sort;
    var unpricedLast = function (a, b) {
      var aa = a.price_amount == null ? 1 : 0;
      var bb = b.price_amount == null ? 1 : 0;
      if (aa !== bb) return aa - bb;
      return 0;
    };
    var cmp = {
      featured: function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); },
      priceAsc: function (a, b) { return unpricedLast(a, b) || (a.price_amount || 0) - (b.price_amount || 0); },
      priceDesc: function (a, b) { return unpricedLast(a, b) || (b.price_amount || 0) - (a.price_amount || 0); },
      sizeDesc: function (a, b) { return (b.size_sqft || 0) - (a.size_sqft || 0); },
      sizeAsc: function (a, b) { return (a.size_sqft || 0) - (b.size_sqft || 0); },
      bedsDesc: function (a, b) { return (b.bedrooms || 0) - (a.bedrooms || 0); },
    }[by];
    return list.slice().sort(cmp || function () { return 0; });
  }

  /* ---------- render ---------- */
  function render() {
    var items = filtered();
    var pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    var slice = items.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);

    window.renderCards($grid, slice, "", "No apartments match your filters. Try clearing some filters.");
    $count.html("<strong>" + items.length + "</strong> " + (items.length === 1 ? "apartment" : "apartments") + " found");
    renderPagination(pages, items.length);
    syncUrl();
  }

  function renderPagination(pages, total) {
    var $pag = $("#pagination").empty();
    if (pages <= 1) return;
    var mk = function (label, page, opts) {
      opts = opts || {};
      var $b = $("<button>").html(label).attr("aria-label", opts.aria || ("Page " + page));
      if (opts.disabled) $b.prop("disabled", true);
      else {
        if (page === state.page) $b.addClass("active");
        $b.on("click", function () { state.page = page; render(); scrollToGrid(); });
      }
      return $b;
    };
    $pag.append(mk("&lsaquo;", state.page - 1, { disabled: state.page === 1, aria: "Previous page" }));
    for (var i = 1; i <= pages; i++) $pag.append(mk(String(i), i));
    $pag.append(mk("&rsaquo;", state.page + 1, { disabled: state.page === pages, aria: "Next page" }));
  }

  function scrollToGrid() {
    var el = document.getElementById("propertiesGrid");
    if (el) {
      var y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  function syncUrl() {
    var q = new URLSearchParams();
    ["location", "project", "status", "purpose"].forEach(function (k) { if (state[k]) q.set(k, state[k]); });
    if (state.beds) q.set("beds", state.beds);
    var qs = q.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
  }

  /* ---------- events ---------- */
  var kwTimer = null;
  $("#fKeyword").on("input", function () {
    clearTimeout(kwTimer);
    var v = this.value;
    kwTimer = setTimeout(function () { state.keyword = v; state.page = 1; render(); }, 220);
  });
  $("#fLocation, #fProject, #fStatus, #fPurpose").on("change", function () {
    var id = this.id.replace("f", "").toLowerCase();
    var key = id === "location" ? "location" : id;
    state[key] = this.value; state.page = 1; render();
  });
  $("#fBeds, #fBaths").on("click", ".chip", function () {
    var $wrap = $(this).closest(".chip-row");
    var active = $(this).hasClass("active");
    $wrap.find(".chip").removeClass("active");
    if (!active) {
      $(this).addClass("active");
      state[$wrap.attr("data-key")] = $(this).attr("data-val");
    } else {
      state[$wrap.attr("data-key")] = "";
    }
    state.page = 1; render();
  });
  $("#fPriceMin, #fPriceMax, #fSizeMin, #fSizeMax").on("input", function () {
    clearTimeout(kwTimer);
    kwTimer = setTimeout(function () {
      state.priceMin = $("#fPriceMin").val(); state.priceMax = $("#fPriceMax").val();
      state.sizeMin = $("#fSizeMin").val(); state.sizeMax = $("#fSizeMax").val();
      state.page = 1; render();
    }, 300);
  });
  $sort.on("change", function () { state.sort = this.value; render(); });
  $(".view-toggle button").on("click", function () {
    $(".view-toggle button").removeClass("active");
    $(this).addClass("active");
    state.view = $(this).attr("data-view");
    $grid.toggleClass("list-view", state.view === "list");
  });
  $("#clearFilters").on("click", function () {
    Object.assign(state, {
      keyword: "", location: "", project: "", status: "", purpose: "",
      beds: "", baths: "", priceMin: "", priceMax: "", sizeMin: "", sizeMax: "", page: 1,
    });
    $("#filtersForm").find("input, select").val("");
    $("#fBeds, #fBaths").find(".chip").removeClass("active");
    render();
  });

  /* initial view from URL (?view=list) */
  if (new URLSearchParams(location.search).get("view") === "list") {
    $('.view-toggle button[data-view="list"]').trigger("click");
  }

  /* mobile: filters start collapsed; the toggle button shows/hides them */
  var mqFilters = window.matchMedia("(max-width: 940px)");
  function syncFilters(collapsed) {
    $("#listingRoot").toggleClass("filters-collapsed", collapsed);
    $("#filtersToggle").text(collapsed ? "Show filters" : "Hide filters");
    $("#filtersToggle").attr("aria-expanded", String(!collapsed));
  }
  if ($("#filtersToggle").length) {
    syncFilters(mqFilters.matches);
    mqFilters.addEventListener
      ? mqFilters.addEventListener("change", function (e) { syncFilters(e.matches); })
      : mqFilters.addListener(function (e) { syncFilters(e.matches); });
    $("#filtersToggle").on("click", function () {
      syncFilters(!$("#listingRoot").hasClass("filters-collapsed"));
    });
  }

  render();
})(jQuery);
