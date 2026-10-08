// Deployment configuration. Every value comes from a Vite environment variable
// (see .env.example) so application, checkout, legal and form destinations can
// be connected per environment without code changes.

const env = import.meta.env

const clean = (value: string | undefined) => (value && value.trim() ? value.trim() : null)

/** Destinations for the {{keys}} named in the content document. */
export const destinations: Record<string, string | null> = {
  'app.signup_url': clean(env.VITE_APP_SIGNUP_URL) ?? 'https://app.vizedraw.com/signup',
  'app.signin_url': clean(env.VITE_APP_SIGNIN_URL) ?? 'https://app.vizedraw.com/',
  'checkout.free_url': clean(env.VITE_CHECKOUT_FREE_URL) ?? 'https://app.vizedraw.com/settings/billing?plan=free&audience=individual',
  'checkout.control_url': clean(env.VITE_CHECKOUT_CONTROL_URL) ?? 'https://app.vizedraw.com/settings/billing?plan=starter&audience=individual',
  'checkout.pro_url': clean(env.VITE_CHECKOUT_PRO_URL) ?? 'https://app.vizedraw.com/settings/billing?plan=pro&audience=individual',
  'legal.privacy_url': clean(env.VITE_PRIVACY_URL),
  'legal.terms_url': clean(env.VITE_TERMS_URL),
  'consent.cookie_preferences': clean(env.VITE_COOKIE_PREFERENCES_URL),
}

/** Endpoint that receives contact-form submissions as JSON (POST). */
export const contactEndpoint = clean(env.VITE_CONTACT_ENDPOINT)
