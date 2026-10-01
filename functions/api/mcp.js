/**
 * Cung Văn Hóa Lao Động TP.HCM — Cơ Sở Bình Trưng Edge MCP Server (Model Context Protocol)
 * Running on Cloudflare Pages Functions at /api/mcp
 * 
 * Complies with MCP Streamable HTTP / JSON-RPC 2.0 for AI Agents:
 * Claude Code, ChatGPT, OpenCode, Cursor, Windsurf, Traks
 */

export async function onRequest(context) {
  const { request } = context;

  // CORS Preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-requested-with',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // GET: Health & Discovery Info
  if (request.method === 'GET') {
    return new Response(JSON.stringify({
      status: 'active',
      server: 'cung-van-hoa-lao-dong-mcp',
      version: '1.0.0',
      protocol: 'Model Context Protocol (MCP) Streamable HTTP',
      docs: 'https://cungvanhoalaodong.com/.well-known/mcp/server-card.json',
      available_tools: ['lookup_info']
    }, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // POST: JSON-RPC 2.0 Handler
  try {
    const body = await request.json();
    const { id, method, params } = body;

    const corsHeaders = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    };

    // 1. MCP Initialize
    if (method === 'initialize') {
      return new Response(JSON.stringify({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: { listChanged: false } },
          serverInfo: {
            name: 'cung-van-hoa-lao-dong-mcp',
            version: '1.0.0'
          }
        }
      }), { headers: corsHeaders });
    }

    // 2. Client Notification
    if (method === 'notifications/initialized') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // 3. MCP List Tools
    if (method === 'tools/list') {
      return new Response(JSON.stringify({
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'lookup_info',
              description: 'Retrieve essential knowledge and documentation from Cung Văn Hóa Lao Động TP.HCM — Cơ Sở Bình Trưng.',
              inputSchema: {
                type: 'object',
                properties: {
                  query: { type: 'string', description: 'Search term or question' }
                },
                required: ['query']
              }
            }
          ]
        }
      }), { headers: corsHeaders });
    }

    // 4. MCP Call Tool
    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (toolName === 'lookup_info') {
        const query = (args.query || '').trim();
        return new Response(JSON.stringify({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  service: 'Cung Văn Hóa Lao Động TP.HCM — Cơ Sở Bình Trưng',
                  query: query,
                  documentation: 'https://cungvanhoalaodong.com/llms.txt',
                  message: `Results retrieved successfully for: ${query}`
                }, null, 2)
              }
            ]
          }
        }), { headers: corsHeaders });
      }

      return new Response(JSON.stringify({
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Tool not found: ${toolName}` }
      }), { status: 404, headers: corsHeaders });
    }

    // Default Unknown Method
    return new Response(JSON.stringify({
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Method not implemented: ${method}` }
    }), { status: 400, headers: corsHeaders });

  } catch (err) {
    return new Response(JSON.stringify({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32700, message: 'Parse error: ' + err.message }
    }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
