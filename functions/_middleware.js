/**
 * Cung Văn Hóa Lao Động TP.HCM — Cơ Sở Bình Trưng Cloudflare Pages Edge Middleware (_middleware.js)
 * 
 * Standards & Protocols Implemented:
 * 1. Fast-path static exemption (Preserves Cloudflare Functions 100k free tier quota)
 * 2. HTTP Content Negotiation (Accept: text/markdown) for AI Agents
 * 3. RFC 9728 OAuth Protected Resource Metadata (WWW-Authenticate & Link headers)
 * 4. Web Bot Auth HTTP Message Signatures (RFC 8037 / RFC 9421)
 * 5. WorkOS Agent Auth Standard (/.well-known/auth.md)
 */

const STANDARD_LINK_HEADER = '</llms.txt>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"; type="text/markdown", </.well-known/api-catalog>; rel="api-catalog", </.well-known/mcp/server-card.json>; rel="mcp-server-card", </.well-known/agent-card.json>; rel="agent-card", </.well-known/agent.json>; rel="agent", </.well-known/oauth-protected-resource>; rel="oauth-protected-resource", </auth.md>; rel="auth-metadata", </.well-known/auth.md>; rel="auth-metadata", </.well-known/http-message-signatures-directory>; rel="http-message-signatures-directory"';

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, '') || '/';
  const accept = request.headers.get('Accept') || '';
  const isHead = request.method === 'HEAD';

  // 1. FAST-PATH EXEMPTION: Bỏ qua file tĩnh ngay lập tức để tiết kiệm quota Functions
  if (
    pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|eot|mp4|webm|xml|map)$/i) &&
    !pathname.startsWith('/.well-known/')
  ) {
    return next();
  }

  // 2. Web Bot Auth HTTP Message Signatures Directory
  if (pathname === '/.well-known/http-message-signatures-directory' || pathname === '/.well-known/http-message-signatures-directory.json') {
    const jwksBody = JSON.stringify({
      "keys": [
        {
          "kty": "OKP",
          "crv": "Ed25519",
          "kid": "cung-van-hoa-lao-dong-web-bot-2026",
          "x": "25vK_k3W5F0k8QJ9z3nQp2dG9nN-eB6eP2jM6lW3xY4",
          "use": "sig",
          "alg": "EdDSA"
        }
      ]
    }, null, 2);

    return new Response(isHead ? null : jwksBody, {
      status: 200,
      headers: {
        'Content-Type': 'application/http-message-signatures-directory+json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Link': STANDARD_LINK_HEADER
      }
    });
  }

  // 3. Fallback routing cho /.well-known/auth.md -> /auth.md
  if (pathname === '/.well-known/auth.md') {
    try {
      const authUrl = new URL('/auth.md', request.url);
      let authRes = env.ASSETS && typeof env.ASSETS.fetch === 'function'
        ? await env.ASSETS.fetch(new Request(authUrl, { method: 'GET' }))
        : await fetch(authUrl.toString());

      if (authRes && authRes.ok) {
        const text = await authRes.text();
        return new Response(isHead ? null : text, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
            'Link': STANDARD_LINK_HEADER
          }
        });
      }
    } catch (e) {
      // Tiếp tục xuống nếu không tìm thấy
    }
  }

  // 4. API Endpoints: Bổ sung RFC 9728 WWW-Authenticate và Link Headers
  if (pathname.startsWith('/api/')) {
    const apiRes = await next();
    const newApiHeaders = new Headers(apiRes.headers);
    newApiHeaders.set('Link', STANDARD_LINK_HEADER + ', </.well-known/oauth-protected-resource>; rel="oauth-protected-resource"');
    
    if (apiRes.status === 401 || !request.headers.get('Authorization')) {
      newApiHeaders.set('WWW-Authenticate', 'Bearer realm="cung-van-hoa-lao-dong", resource_metadata="https://cungvanhoalaodong.com/.well-known/oauth-protected-resource"');
    }

    return new Response(apiRes.body, {
      status: apiRes.status,
      statusText: apiRes.statusText,
      headers: newApiHeaders
    });
  }

  // 5. Bỏ qua các file well-known khác đã có file tĩnh
  if (pathname.startsWith('/.well-known/') || pathname === '/openapi.json' || pathname === '/auth.md') {
    return next();
  }

  // 6. Content Negotiation: Trả về Markdown nếu Agent yêu cầu text/markdown
  if (accept.includes('text/markdown')) {
    try {
      const targetUrl = new URL('/llms.txt', request.url);
      const fetchReq = new Request(targetUrl, {
        method: 'GET',
        headers: { 'Accept': 'text/plain, text/markdown' }
      });

      let mdRes = env.ASSETS && typeof env.ASSETS.fetch === 'function'
        ? await env.ASSETS.fetch(fetchReq)
        : await fetch(targetUrl.toString());

      if (mdRes && mdRes.ok) {
        const mdText = await mdRes.text();
        const estimatedTokens = Math.max(1, Math.round(mdText.length / 4));

        return new Response(isHead ? null : mdText, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'x-markdown-tokens': String(estimatedTokens),
            'Content-Signal': 'search=yes, ai-input=yes, ai-train=no, use=reference',
            'Link': STANDARD_LINK_HEADER,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
          }
        });
      }
    } catch (err) {
      // Fallback xuống HTML bên dưới
    }
  }

  // 7. Phản hồi HTML thông thường (gắn Link headers & Content-Signal)
  const response = await next();
  const contentType = response.headers.get('Content-Type') || '';

  if (contentType.includes('text/html')) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Vary', 'Accept');
    newHeaders.set('Content-Signal', 'search=yes, ai-input=yes, ai-train=no, use=reference');
    newHeaders.set('Link', STANDARD_LINK_HEADER);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }

  return response;
}
