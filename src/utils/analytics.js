const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initializeGA = () => {
  if (!GA_MEASUREMENT_ID || import.meta.env.DEV || import.meta.env.MODE === 'development') {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'secure;samesite=strict'
    });
  };
};

export const trackEvent = (eventName, parameters = {}) => {
  if (import.meta.env.PROD && typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  }
};