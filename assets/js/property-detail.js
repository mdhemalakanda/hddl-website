/* HDDL — property detail page: renders everything from window.HDDL_PROPERTY */
(function ($) {
  "use strict";
  if (document.body.dataset.page !== "property-details") return;

  var p = window.HDDL_PROPERTY;
  if (!p) return;
  var ROOT = "../";
  var C = window.HDDL_COMPANY || {};
  var $ = window.jQuery;

  /* ---------- head/title block ---------- */
  $("#dTitle").text(p.title + (p.subtitle ? " — " + p.subtitle : ""));
  $("#dCrumbName").text(p.title);
  document.title = p.title + " — " + (C.name || "Hyperion");
  $("#dBadges").html(window.badgesFor(p));
  $("#dPrice").text(window.fmtPrice(p));
  if (p.price_qualifier) $("#dPriceQualifier").text(p.price_qualifier).prop("hidden", false);
  $("#dAddress").text(p.address_display || p.address || "Dhaka, Bangladesh");
  $(".d-id").text("Property ID: " + p.id);
  if (p.handover_date) {
    $("#dHandover").text("Handover (as listed): " + p.handover_date).prop("hidden", false);
  }

  /* ---------- specs ---------- */
  var specs = [
    ["size", window.ICONS.size, "Size", p.size_sqft ? p.size_sqft + " sq ft" : null],
    ["bed", window.ICONS.bed, "Bedrooms", p.bedrooms],
    ["bath", window.ICONS.bath, "Bathrooms", p.bathrooms],
    ["balc", window.ICONS.sofa, "Balconies", p.balconies],
    ["park", window.ICONS.car, "Parking", p.parking != null ? p.parking + " car" + (p.parking == 1 ? "" : "s") : null],
    ["floor", window.ICONS.floor, "Floors available", p.floor_available_on],
    ["tfloor", window.ICONS.floor, "Total floors", p.total_floors],
    ["type", window.ICONS.sofa, "Property type", p.property_type],
    ["trans", window.ICONS.check, "Transaction", p.transaction_type],
    ["furnish", window.ICONS.sofa, "Furnishing", p.furnishing],
    ["face", window.ICONS.pin, "Facing", p.facing],
    ["land", window.ICONS.size, "Land area", p.land_area],
  ];
  var $specs = $("#dSpecs").empty();
  specs.forEach(function (s) {
    if (s[3] == null || s[3] === "" || s[3] === "N/A") return;
    $specs.append(
      '<div class="spec-item">' + s[1] + "<div><small>" + window.esc(s[2]) +
      "</small><strong>" + window.esc(s[3]) + "</strong></div></div>"
    );
  });
  if ($("#specsPanel").length && $specs.children().length) $("#specsPanel").prop("hidden", false);

  /* ---------- amenities ---------- */
  var $am = $("#dAmenities").empty();
  (p.features || []).forEach(function (f) {
    $am.append("<li>" + window.ICONS.check + "<span>" + window.esc(f) + "</span></li>");
  });
  if (!(p.features || []).length) $("#amenitiesPanel").prop("hidden", true);

  /* ---------- description (verbatim; honest notice when not published) ---------- */
  var $desc = $("#dDesc");
  if (p.description && p.description.trim()) {
    p.description.split(/\n+/).forEach(function (para) {
      if (para.trim()) $desc.append($("<p>").text(para.trim()));
    });
    $desc.addClass("bn-ok");
  } else {
    $desc.html(
      '<div class="notice">The developer has not published a written description for this listing. ' +
      "All verified specifications are shown above. Please call or message us for a full briefing.</div>"
    );
  }

  /* ---------- source data notes (honest discrepancies from the listing source) ---------- */
  if (p.source_notes && p.source_notes.length) {
    var $notes = $("#dNotes ul").empty();
    p.source_notes.forEach(function (n) { $notes.append("<li>" + window.esc(n) + "</li>"); });
  } else {
    $("#dNotes").prop("hidden", true);
  }

  /* ---------- gallery: photos + floor plans ---------- */
  var items = [];
  (p.images || []).forEach(function (src, i) {
    items.push({ src: ROOT + src, caption: p.title + " — photo " + (i + 1) });
  });
  (p.floor_plans || []).forEach(function (src, i) {
    items.push({ src: ROOT + src, caption: "Floor plan " + (i + 1) });
  });

  var gIdx = 0;
  var $mainImg = $("#gMainImg"), $ph = $("#gPlaceholder"), $thumbs = $("#gThumbs"), $gCount = $("#gCount");

  function showGalleryItem(i) {
    gIdx = (i + items.length) % items.length;
    var it = items[gIdx];
    if ($ph.length) $ph.prop("hidden", true);
    if ($mainImg.length) {
      $mainImg.prop("hidden", false);
      $mainImg.attr("src", it.src).attr("alt", it.caption);
      $mainImg.attr("data-full", it.src);
    }
    if ($gCount.length) $gCount.text((gIdx + 1) + " / " + items.length);
    $thumbs.find("button").removeClass("active").eq(gIdx).addClass("active");
  }

  if (items.length) {
    $thumbs.html(items.map(function (it, i) {
      return '<button type="button" aria-label="Show image ' + (i + 1) + '"><img src="' + it.src + '" alt="' + window.esc(it.caption) + '" loading="lazy"></button>';
    }).join(""));
    $thumbs.find("button").on("click", function () { showGalleryItem($(this).index()); });
    $mainImg.on("click", function () { window.HDDL_LIGHTBOX.open(items, gIdx); });
    showGalleryItem(0);
  } else {
    $("#galleryPanel").prop("hidden", true);
  }

  /* ---------- videos ---------- */
  var vids = p.videos || [];
  if (vids.length) {
    $("#videosPanel").prop("hidden", false);
    var $v = $("#dVideos").empty();
    vids.forEach(function (url) {
      $v.append('<div class="video-embed"><iframe src="' + window.esc(url) +
        '" title="' + window.esc(p.title + " video") +
        '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');
    });
  } else {
    $("#videosPanel").prop("hidden", true);
  }

  /* ---------- map (only when the source provides an embed) ---------- */
  if (p.map_embed) {
    $("#mapPanel").prop("hidden", false);
    $("#dMap").attr("src", p.map_embed).attr("title", p.title + " location map");
  } else {
    $("#mapPanel").prop("hidden", true);
  }

  /* ---------- related properties ---------- */
  var rel = (window.HDDL_PROPERTIES || []).filter(function (x) { return String(x.id) !== String(p.id); });
  var scored = rel.slice().sort(function (a, b) {
    var sa = (a.project_slug === p.project_slug ? 2 : 0) + (a.area === p.area ? 1 : 0);
    var sb = (b.project_slug === p.project_slug ? 2 : 0) + (b.area === p.area ? 1 : 0);
    return sb - sa;
  }).slice(0, 3);
  window.renderCards($("#dRelated"), scored, ROOT, "No related properties available right now.");

  /* ---------- recently viewed ---------- */
  window.pushRecent(p.id);

  /* ---------- owner card ---------- */
  $("#ocName").text(C.name || "Hyperion Design & Development Ltd.");
  var logoPath = C.logo || C.logo_url;
  $("#ocLogo").attr("src", logoPath ? ROOT + logoPath : ROOT + "assets/img/logo.svg").attr("alt", (C.name || "Hyperion") + " logo");
  $("#ocPropertyId").text("Property ID: " + p.id);
  if (p.contact_person) $("#ocAgent").text(p.contact_person).prop("hidden", false);

  /* phone reveal: mask derived from the verified number — never a guessed digit */
  var intl = (C.phone && C.phone.intl) || (p.contact_phone || "");
  var digits = String(intl).replace(/[^0-9]/g, "");
  var masked = digits ? "+" + digits.slice(0, digits.length - 3) + " xxx" : "";
  var shown = false;
  var $phoneRow = $("#ocPhoneRow");
  if (digits) {
    $phoneRow.removeClass("hidden-section");
    $("#ocPhoneMasked").text(masked);
    $("#ocReveal").on("click", function () {
      shown = !shown;
      if (shown) {
        $("#ocPhoneMasked").html('<a href="tel:+' + digits + '">+' + digits.slice(0, 3) + " " + digits.slice(3, 7) + "-" + digits.slice(7) + "</a>");
        $(this).text("Hide number");
      } else {
        $("#ocPhoneMasked").text(masked);
        $(this).text("Click to show phone number");
      }
    });
  } else {
    $phoneRow.addClass("hidden-section");
  }

  /* ---------- favorite ---------- */
  var $fav = $("#dFav");
  if ($fav.length) {
    var isFav = window.getFavs().indexOf(String(p.id)) !== -1;
    $fav.toggleClass("active", isFav).attr("aria-pressed", String(isFav));
    $fav.on("click", function () {
      var added = window.toggleFav(p.id);
      $fav.toggleClass("active", added).attr("aria-pressed", String(added));
    });
  }

  /* ---------- inquiry context ---------- */
  window.HDDL_INQUIRY_CONTEXT = {
    property_id: p.id,
    property_title: p.title,
    project_name: p.project_name || null,
    url: location.href,
  };
})(jQuery);
