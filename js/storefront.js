(function () {
  const config = Object.assign(
    {
      commerceBaseUrl: "",
      proCheckoutUrl: "",
      useLemonOverlay: true,
      defaultPlan: "pro_monthly",
      productCode: "novaspine-openclaw-pro",
      tier: "pro",
    },
    window.NovaStorefrontConfig || {},
  );

  const trimTrailingSlash = (value) => String(value || "").trim().replace(/\/+$/, "");
  const currentRef = window.location.pathname.replace(/^\//, "") || "index.html";
  const commerceBase = trimTrailingSlash(config.commerceBaseUrl);
  const checkoutUrl = String(config.proCheckoutUrl || "").trim();

  function buildDirectCheckoutUrl(plan, source) {
    if (!checkoutUrl) {
      return "";
    }
    const url = new URL(checkoutUrl);
    url.searchParams.set("checkout[custom][plan]", plan);
    url.searchParams.set("checkout[custom][tier]", config.tier);
    url.searchParams.set("checkout[custom][source]", source);
    url.searchParams.set("checkout[custom][product]", config.productCode);
    url.searchParams.set("checkout[custom][ref]", currentRef);
    return url.toString();
  }

  function buildCommerceUrl(plan, source) {
    if (!commerceBase) {
      return "";
    }
    const url = new URL(`${commerceBase}/buy/pro`);
    url.searchParams.set("plan", plan);
    url.searchParams.set("source", source);
    url.searchParams.set("ref", currentRef);
    return url.toString();
  }

  const buttons = document.querySelectorAll("[data-buy-plan]");
  for (const button of buttons) {
    const plan = button.getAttribute("data-buy-plan") || config.defaultPlan;
    const source = button.getAttribute("data-buy-source") || "nova-ai";
    const fallbackHref = button.getAttribute("href") || "contact.html";
    const href = buildCommerceUrl(plan, source) || buildDirectCheckoutUrl(plan, source) || fallbackHref;
    button.setAttribute("href", href);
    if (!commerceBase && checkoutUrl && config.useLemonOverlay) {
      button.classList.add("lemonsqueezy-button");
    }
  }

  if (typeof window.createLemonSqueezy === "function") {
    window.createLemonSqueezy();
  }
})();
