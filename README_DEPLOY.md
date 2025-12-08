# Deploy Checklist — fdLeon.dev

This file lists the exact steps and environment variables required to deploy the site (Vercel recommended).

## 1. Build & Runtime

- Node: use the same Node.js version used in development (check `package.json` `engines` or use Node 18+).
- Build command: `npm run build`
- Start command (production): `npm start` or rely on Vercel defaults.

## 2. Required Environment Variables (set these as *secrets* in Vercel)

- `RESEND_API_KEY` (server-only): API key from Resend — used for sending emails.
- `RESEND_RAFFLE_TEMPLATE_ID` (server-only): Resend template ID for raffle confirmation.
- `RESEND_CONTACT_TEMPLATE_ID` (server-only): Resend template ID for contact confirmations.
- `RESEND_EBOOK_TEMPLATE_ID` (optional, server-only): Resend template ID to deliver the ebook. If omitted, service will send an HTML link fallback.
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL (public).
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon/public key (used client-side for reads).
- `SUPABASE_SERVICE_ROLE_KEY` (server-only): Supabase service role key for secure server-side writes. **Keep this secret.**
- `NEXT_PUBLIC_SITE_URL`: Public site URL, e.g. `https://fdleon.dev` (used in emails and links).
- `ADMIN_EMAIL`: Email that receives admin notifications for contact form.

Optional (only if you keep EmailJS client flow):
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## 3. DNS and Email Deliverability (Resend)

1. In Resend, add and verify a sending domain (recommended: `email.fdleon.dev` or `mail.fdleon.dev`).
2. Resend will provide SPF/DKIM TXT/CNAME records — add them to your DNS provider.
3. Optionally add a DMARC policy.

## 4. Database (Supabase)

1. Ensure these tables exist in your Supabase project:
   - `sorteo_participants` (columns: id, name, email, business, phone, ip_address, user_agent, created_at)
   - `blog_subscribers` (columns: id, email, source, subscribed_at, is_active, ip_address, user_agent)
   - `contact_messages` (columns: id, name, email, subject, message, ip_address, user_agent, created_at)
2. Optional: add `UNIQUE(email)` constraint on `sorteo_participants.email` to enforce uniqueness.

## 5. Deploy Steps (Vercel)

1. Push code to `main` branch (protected branch recommended).
2. On Vercel project settings → Environment Variables, add the secrets above for `Production` (and `Preview`/`Development` as needed).
3. Trigger a deploy; monitor logs for build-time warnings.
4. After deploy, send test requests to `/api/sorteo` and `/api/ebook` to verify emails are sent (check Resend activity and Supabase inserts).

## 6. Post-deploy checks

- Verify email deliverability and check Resend’s dashboard for bounces.
- Verify DB inserts in Supabase for participants and contact messages.
- Monitor server logs for any runtime errors (Resend or Supabase permission issues).

## 7. Rollback plan

If something fails in production, revert the deployment on Vercel and investigate the logs. Secrets are safe in Vercel's dashboard and do not require rotation unless compromised.

---
If you want, I can create short deploy commands or a CI script for automated checks after deploy.
