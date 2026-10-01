# auth.md

You are an agent. This service supports **agentic registration**: discover → register → (claim if needed) → exchange for an access_token → call API → handle revocation. Follow the steps in order; do not skip ahead.

Examples use host `https://cungvanhoalaodong.com` (the resource server hosting the Cung Văn Hóa Lao Động TP.HCM — Cơ Sở Bình Trưng API) and `https://cungvanhoalaodong.com` (the authorization server that handles registration).

## Step 1 — Discover

Discovery is two hops — you may have already done this.

The 401 response that pointed you here also carries a `WWW-Authenticate` header with the PRM URL:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://cungvanhoalaodong.com/.well-known/oauth-protected-resource"
```

Pull the `resource_metadata` value from that header and fetch it (1a). If you don't have the 401 in hand, the conventional path on the resource server is `/.well-known/oauth-protected-resource`.

### 1a. Fetch the Protected Resource Metadata

```http
GET /.well-known/oauth-protected-resource
```

Response shape:

```json
{
  "resource": "https://cungvanhoalaodong.com",
  "resource_name": "Cung Văn Hóa Lao Động TP.HCM — Cơ Sở Bình Trưng",
  "resource_logo_uri": "https://cungvanhoalaodong.com/icon-192.png",
  "authorization_servers": ["https://cungvanhoalaodong.com"],
  "scopes_supported": ["read:data", "write:data"],
  "bearer_methods_supported": ["header"]
}
```

### 1b. Fetch the Authorization Server metadata

```http
GET https://cungvanhoalaodong.com/.well-known/oauth-authorization-server
```

Response shape:

```json
{
  "issuer": "https://cungvanhoalaodong.com",
  "authorization_endpoint": "https://cungvanhoalaodong.com/api/auth/login",
  "token_endpoint": "https://cungvanhoalaodong.com/api/auth/verify-otp",
  "revocation_endpoint": "https://cungvanhoalaodong.com/api/auth/logout",
  "grant_types_supported": [
    "authorization_code",
    "urn:ietf:params:oauth:grant-type:token-exchange",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:workos:agent-auth:grant-type:claim"
  ],
  "agent_auth": {
    "skill": "https://cungvanhoalaodong.com/auth.md",
    "register_uri": "https://cungvanhoalaodong.com/api/auth/register",
    "identity_endpoint": "https://cungvanhoalaodong.com/api/auth/register",
    "claim_endpoint": "https://cungvanhoalaodong.com/api/auth/verify-otp",
    "claim_uri": "https://cungvanhoalaodong.com/api/auth/verify-otp",
    "revocation_endpoint": "https://cungvanhoalaodong.com/api/auth/logout",
    "revocation_uri": "https://cungvanhoalaodong.com/api/auth/logout",
    "identity_types_supported": ["anonymous", "identity_assertion", "service_auth"],
    "identity_assertion": {
      "assertion_types_supported": [
        "urn:ietf:params:oauth:token-type:id-jag"
      ]
    },
    "credential_types_supported": ["api_key", "bearer_token"]
  }
}
```

## Step 2 — Pick a method

Use this decision tree:

1. **You have a session tied to a user identity and can exchange it for an ID-JAG** → `identity_assertion`.
2. **You have only the user's email** → `service_auth`. Claim ceremony via email OTP confirmation required.
3. **You have neither** → `anonymous`. Instant session creation for zero-friction evaluation.

## Step 3 — Register

Send POST request to `https://cungvanhoalaodong.com/api/auth/register`:

```http
POST /api/auth/register HTTP/1.1
Host: cungvanhoalaodong.com
Content-Type: application/json

{
  "email": "agent-user@example.com",
  "name": "AI Agent Client",
  "audience": "agent"
}
```

Response: `200 OK` (dispatches 6-digit OTP code to the registered email).

## Step 4 — Claim Ceremony

Verify the OTP to receive a Bearer token:

```http
POST /api/auth/verify-otp HTTP/1.1
Host: cungvanhoalaodong.com
Content-Type: application/json

{
  "email": "agent-user@example.com",
  "code": "123456"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 2592000,
  "token_type": "Bearer",
  "scope": "read:data write:data"
}
```

Use `Authorization: Bearer <token>` on all requests to `https://cungvanhoalaodong.com/api/*`.
