(function () {
  const config = Object.assign(
    {
      commerceBaseUrl: "",
      proCheckoutUrl: "",
      checkoutUrls: {},
      commercePlans: ["pro_monthly"],
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
  const configuredUrls =
    config.checkoutUrls && typeof config.checkoutUrls === "object" ? config.checkoutUrls : {};

  function checkoutUrlForPlan(plan) {
    const explicit = String(configuredUrls[plan] || "").trim();
    if (explicit) {
      return explicit;
    }
    if (plan === config.defaultPlan) {
      return String(config.proCheckoutUrl || "").trim();
    }
    return "";
  }

  function buildDirectCheckoutUrl(plan, source) {
    const directUrl = checkoutUrlForPlan(plan);
    if (!directUrl) {
      return "";
    }
    // Hosted Lemon Squeezy share URLs break when we append custom checkout
    // query params here. Use the canonical share URL directly.
    return directUrl;
  }

  function buildCommerceUrl(plan, source) {
    if (!commerceBase) {
      return "";
    }
    const commercePlans = Array.isArray(config.commercePlans) ? config.commercePlans : [];
    if (!commercePlans.includes(plan)) {
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
    const directHref = buildDirectCheckoutUrl(plan, source);
    const commerceHref = buildCommerceUrl(plan, source);
    const href =
      (config.useLemonOverlay && directHref ? directHref : "") ||
      commerceHref ||
      directHref ||
      fallbackHref;
    button.setAttribute("href", href);
    if (directHref && config.useLemonOverlay) {
      button.classList.add("lemonsqueezy-button");
    }
  }

  if (typeof window.createLemonSqueezy === "function") {
    window.createLemonSqueezy();
  }
})();
