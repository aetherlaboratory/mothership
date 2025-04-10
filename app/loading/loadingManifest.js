// /app/loading/loadingManifest.js

// This manifest maps route names to expected loading tasks.
// Each task has an `id` and a `weight` (importance).
// You can extend this to include `type`, `group`, or even animation triggers later.

const loadingManifest = {
  homepage: [
    { id: 'fetchHeroBanner', weight: 2 },
    { id: 'fetchFeaturedProducts', weight: 3 },
    { id: 'loadHomepageImages', weight: 1 },
  ],
  profile: [
    { id: 'authCheck', weight: 2 },
    { id: 'fetchUserDetails', weight: 2 },
    { id: 'fetchOrderHistory', weight: 3 },
  ],
  shop: [
    { id: 'fetchCategories', weight: 2 },
    { id: 'fetchAllProducts', weight: 4 },
    { id: 'loadShopImages', weight: 2 },
  ],
  cart: [
    { id: 'fetchCartContents', weight: 2 },
    { id: 'validateCoupons', weight: 1 },
    { id: 'loadPaymentMethods', weight: 2 },
  ],
};

export default loadingManifest;
