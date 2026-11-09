/* HDDL — lightbox for galleries (photos + floor plans + gallery page) */
(function ($) {
  "use strict";

  var $lb, $img, $cap, items = [], idx = 0, built = false;

  function build() {
    if (built) return;
    built = true;
    $lb = $(
      '<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">' +
      '<button class="lightbox-close" aria-label="Close">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
      '<button class="lightbox-prev" aria-label="Previous image">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></button>' +
      '<img src="" alt="">' +
      '<button class="lightbox-next" aria-label="Next image">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 6 6 6-6 6"/></svg></button>' +
      '<div class="lightbox-caption"></div>' +
      "</div>"
    ).appendTo("body");
    $img = $lb.find("img");
    $cap = $lb.find(".lightbox-caption");

    $lb.find(".lightbox-close").on("click", close);
    $lb.find(".lightbox-prev").on("click", function () { step(-1); });
    $lb.find(".lightbox-next").on("click", function () { step(1); });
    $lb.on("click", function (e) { if (e.target === $lb[0]) close(); });

    $(document).on("keydown", function (e) {
      if (!$lb.hasClass("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  function paint() {
    var it = items[idx];
    $img.attr("src", it.src).attr("alt", it.caption || "");
    $cap.text((idx + 1) + " / " + items.length + (it.caption ? " — " + it.caption : ""));
  }

  function step(d) {
    if (!items.length) return;
    idx = (idx + d + items.length) % items.length;
    paint();
  }

  function open(list, start) {
    build();
    items = list.slice();
    idx = Math.min(Math.max(0, start || 0), items.length - 1);
    paint();
    $lb.addClass("open");
    $("body").css("overflow", "hidden");
    $lb.find(".lightbox-close").trigger("focus");
  }

  function close() {
    $lb.removeClass("open");
    $("body").css("overflow", "");
  }

  window.HDDL_LIGHTBOX = { open: open, close: close };

  /* Delegated: any element with data-full inside a [data-gallery-group]
     opens a lightbox of its group's images (gallery page, project pages). */
  $(document).on("click", "[data-full]", function () {
    var $group = $(this).closest("[data-gallery-group]");
    var list;
    if ($group.length) {
      list = $group.find("[data-full]").map(function () {
        var $el = $(this);
        return { src: $el.attr("data-full"), caption: $el.attr("data-caption") || $el.find("img").attr("alt") || "" };
      }).get();
    } else {
      list = [{ src: $(this).attr("data-full"), caption: $(this).attr("data-caption") || "" }];
    }
    var start = $group.length ? $group.find("[data-full]").index(this) : 0;
    open(list, start);
  });
})(jQuery);
