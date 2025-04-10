export function getWooCommerceStoreUrl() {
  if (typeof window === 'undefined') {
	return process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL_PROD;
  }

  const hostname = window.location.hostname;

  if (hostname === 'localhost') {
	return process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL_LOCAL;
  }

  if (hostname.startsWith('192.168.')) {
	return process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL_NETWORK;
  }

  return process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL_PROD;
}
