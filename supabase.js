import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const SUPABASE_URL = 'https://nfsksehqhykiixnrzrdd.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_YUdcqphJZWWbpFBb-RogcQ_z0XdOteP';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    detectSessionInUrl: true,
    persistSession: true,
    autoRefreshToken: true,
  },
});

export async function requireUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search + location.hash);
    location.href = `auth.html?next=${next}`;
    return null;
  }
  return user;
}

export function projectPayload(form) {
  const data = Object.fromEntries(new FormData(form));
  data.theme = form.querySelector('[name="theme"]:checked')?.value || 'blue';
  return data;
}

export function slugify(value) {
  return String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'my-business';
}
