// PROTECTION D'ACCES — toute l'app est derriere un mot de passe (HTTP Basic Auth),
// verifie AU NIVEAU SERVEUR avant de servir la moindre page. Le mot de passe vit
// dans la variable d'environnement SITE_PASSWORD (Vercel, Settings, Env Variables).
// Tant qu'elle n'est pas definie, rien n'est servi. Aucune donnee ne quitte le serveur.
export const config = { matcher: '/:path*' };

export default function middleware(req) {
  const pass = process.env.SITE_PASSWORD;
  if (!pass) {
    return new Response('Site non configure : ajoutez SITE_PASSWORD dans Vercel, puis redeployez.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const auth = req.headers.get('authorization') || '';
  if (auth.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6));
      const sep = decoded.indexOf(':');
      const provided = sep >= 0 ? decoded.slice(sep + 1) : decoded;
      if (provided === pass) return;
    } catch (e) {}
  }
  return new Response('Acces protege - entrez le mot de passe (laissez identifiant vide).', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Forma Interim", charset="UTF-8"', 'Content-Type': 'text/plain; charset=utf-8' } });
}
