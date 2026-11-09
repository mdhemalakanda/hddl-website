/* HDDL — inquiry form: validation + WhatsApp / mailto handoff (frontend only, no backend) */
(function ($) {
  "use strict";

  var $form = $("#inquiryForm");
  if (!$form.length) return;

  var C = window.HDDL_COMPANY || {};
  var ctx = window.HDDL_INQUIRY_CONTEXT || null;

  var COUNTRIES = [
    "Bangladesh", "Australia", "Bahrain", "Canada", "India", "Italy", "Kuwait", "Malaysia",
    "Oman", "Qatar", "Saudi Arabia", "Singapore", "South Korea", "United Arab Emirates",
    "United Kingdom", "United States", "Other",
  ];
  var $country = $("#inqCountry");
  if ($country.length && $country.children().length <= 1) {
    COUNTRIES.forEach(function (c) { $("<option>", { value: c, text: c }).appendTo($country); });
    $("<option>", { value: "", text: "Select country" }).prependTo($country);
    $country.val("");
  }

  /* inquiry preview line (property context on detail pages) */
  var $preview = $("#inqPreview");
  if ($preview.length) {
    if (ctx) {
      $preview.html(
        "Enquiry for <strong>" + window.esc(ctx.property_title) + "</strong>" +
        (ctx.project_name ? " · " + window.esc(ctx.project_name) : "") +
        " · ID " + window.esc(ctx.property_id)
      ).prop("hidden", false);
    } else {
      $preview.prop("hidden", true);
    }
  }

  function mark($field, bad) {
    $field.closest(".form-field").toggleClass("error", bad);
    return !bad;
  }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function validPhone(v) { return /^[+()0-9\-\s.]{6,20}$/.test(v.trim()); }

  /* live validation */
  $form.on("input change", "input, select, textarea", function () {
    var $f = $(this);
    var v = $f.val();
    var bad = false;
    if ($f.prop("required") && !String(v).trim()) bad = true;
    if ($f.attr("type") === "email" && v && !validEmail(v)) bad = true;
    if ($f.attr("data-kind") === "phone" && v && !validPhone(v)) bad = true;
    $f.closest(".form-field").toggleClass("error", bad);
  });

  function buildMessage(data) {
    var lines = [];
    lines.push("Hello " + (C.name || "Hyperion Design & Development Ltd.") + ",");
    lines.push("");
    if (ctx) {
      lines.push("I am interested in this property:");
      lines.push("• Property: " + ctx.property_title + " (ID " + ctx.property_id + ")");
      if (ctx.project_name) lines.push("• Project: " + ctx.project_name);
      lines.push("• Page: " + ctx.url);
      lines.push("");
    } else {
      lines.push("I would like to ask about your apartments.");
      lines.push("");
    }
    lines.push("Name: " + data.name);
    lines.push("Email: " + data.email);
    lines.push("Phone: " + data.phone);
    if (data.country) lines.push("Country: " + data.country);
    lines.push("");
    lines.push("Message:");
    lines.push(data.message);
    return lines.join("\n");
  }

  function showBlocked(msg) {
    $("#formBlocked").text(msg).prop("hidden", false).trigger("focus");
  }

  $form.on("submit", function (e) {
    e.preventDefault();

    var data = {
      name: $("#inqName").val().trim(),
      email: $("#inqEmail").val().trim(),
      phone: $("#inqPhone").val().trim(),
      country: $("#inqCountry").val() || "",
      message: $("#inqMessage").val().trim(),
    };

    var ok = true;
    ok = mark($("#inqName"), !data.name) && ok;
    ok = mark($("#inqEmail"), !data.email || !validEmail(data.email)) && ok;
    ok = mark($("#inqPhone"), !data.phone || !validPhone(data.phone)) && ok;
    ok = mark($("#inqMessage"), !data.message) && ok;
    if (!ok) {
      $form.find(".form-field.error input, .form-field.error textarea").first().trigger("focus");
      return;
    }

    var text = buildMessage(data);
    var waDigits = "";
    if (C.phone && C.phone.whatsapp) {
      waDigits = String(C.phone.whatsapp).replace(/[^0-9]/g, "");
    }

    if (waDigits) {
      var url = "https://wa.me/" + waDigits + "?text=" + encodeURIComponent(text);
      var win = window.open(url, "_blank", "noopener");
      /* pop-up blocked → take the visitor to WhatsApp in the same tab */
      if (!win) window.location.href = url;
    } else if (C.email) {
      var subject = ctx
        ? "Property enquiry — " + ctx.property_title + " (ID " + ctx.property_id + ")"
        : "Website enquiry";
      window.location.href =
        "mailto:" + C.email + "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(text);
    } else {
      showBlocked(
        "Direct submission is not configured yet. Please call us instead — the verified phone number is shown above."
      );
    }
    /* Honest behaviour: no fake "message sent" success screen.
       Sending completes in WhatsApp or the visitor's email application. */
  });
})(jQuery);
