import { useEffect, useState } from 'react';

export const DEFAULT_GUEST = 'Tamu Undangan';

const fromB64u = (s: string) => {
  const b = s.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b + '='.repeat((4 - (b.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

/** Token dari path pertama (charisita.com/<token>) atau ?to=<token>. */
function readToken(): string | null {
  const q = new URLSearchParams(window.location.search).get('to');
  return q || window.location.pathname.split('/').filter(Boolean)[0] || null;
}

/** Format token: base64url( iv[12] + ciphertext + tag[16] ), AES-256-GCM. */
async function decryptGuest(token: string, passphrase: string): Promise<string | null> {
  try {
    if (!crypto?.subtle) return null; // butuh HTTPS atau localhost
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(passphrase));
    const key = await crypto.subtle.importKey('raw', hash, 'AES-GCM', false, ['decrypt']);
    const bytes = fromB64u(token);
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.slice(0, 12) }, key, bytes.slice(12));
    return new TextDecoder().decode(plain).slice(0, 60) || null;
  } catch {
    return null; // token salah / dimodifikasi
  }
}

export function useGuestName() {
  const [name, setName] = useState(DEFAULT_GUEST);
  useEffect(() => {
    const pass = import.meta.env.VITE_GUEST_KEY as string | undefined;
    const token = readToken();
    if (!pass || !token) return;
    let live = true;
    decryptGuest(token, pass).then((n) => { if (live && n) setName(n); });
    return () => { live = false; };
  }, []);
  return name;
}
