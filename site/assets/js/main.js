/* HDDL — global UI behaviour (jQuery) */
(function ($) {
  "use strict";

  /* year stamp */
  var y = document.getElementById("yearStamp");
  if (y) y.textContent = String(new Date().getFullYear());

  /* sticky header shadow */
  var $header = $("#siteHeader");
  function onScroll() {
    var st = window.scrollY || document.documentElement.scrollTop;
    $header.toggleClass("scrolled", st > 8);
    $("#toTop").toggleClass("show", st > 500);
  }
  $(window).on("scroll", onScroll);
  onScroll();

  /* mobile nav */
  var $toggle = $("#navToggle");
  var $nav = $("#mainNav");
  if ($toggle.length && $nav.length) {
    var $backdrop = $('<div class="nav-backdrop" aria-hidden="true"></div>').appendTo("body");
    function closeNav() {
      $nav.removeClass("open");
      $backdrop.removeClass("show");
      $toggle.attr("aria-expanded", "false");
    }
    $toggle.on("click", function () {
      var open = !$nav.hasClass("open");
      $nav.toggleClass("open", open);
      $backdrop.toggleClass("show", open);
      $toggle.attr("aria-expanded", String(open));
    });
    $backdrop.on("click", closeNav);
    $(document).on("keyup", function (e) { if (e.key === "Escape") closeNav(); });
    $nav.find("a").on("click", function () { if ($(window).width() <= 860) closeNav(); });

    /* subnav toggle on mobile */
    $nav.find(".has-sub > a").on("click", function (e) {
      if ($(window).width() <= 860) {
        var $li = $(this).parent();
        if (!$li.hasClass("expanded") && $(this).attr("href").indexOf("properties.html") === 0) {
          e.preventDefault();
          $li.addClass("expanded");
        }
      }
    });
  }

  /* back to top */
  $("#toTop").on("click", function () { $("html, body").animate({ scrollTop: 0 }, 450); });

  /* reveal on scroll */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $(".reveal").addClass("in");
  }

  /* floating WhatsApp button (only when a verified WhatsApp number exists) */
  var C = window.HDDL_COMPANY || {};
  if (C.phone && C.phone.whatsapp && document.body.dataset.page !== "contact") {
    var waHref = "https://wa.me/" + String(C.phone.whatsapp).replace(/[^0-9]/g, "") +
      "?text=" + encodeURIComponent("Hello Hyperion Design & Development Ltd., I would like to ask about your apartments.");
    $('<a class="wa-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">')
      .attr("href", waHref)
      .html('<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.45 1.35-2 1.4-.5.05-1.15.25-3.85-.8-3.25-1.3-5.3-4.6-5.45-4.8-.15-.2-1.3-1.75-1.3-3.35 0-1.6.85-2.4 1.15-2.7.3-.3.65-.4.85-.4h.6c.2 0 .45-.05.7.55.25.6.85 2.1.95 2.25.1.15.15.35.05.55-.1.2-.2.35-.35.55-.15.2-.35.45-.25.6.1.15.45.75 1.05 1.25.75.65 1.35.85 1.55.95.2.1.35.1.5-.05.15-.15.6-.7.75-.95.15-.25.3-.2.5-.15.2.1 1.55.75 1.8.9.25.15.45.2.5.3.05.15.05.7-.2 1.4Z"/></svg><span>WhatsApp</span>')
      .appendTo("body");
  }
})(jQuery);
