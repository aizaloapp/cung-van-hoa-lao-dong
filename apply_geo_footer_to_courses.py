import glob
import os

footer_snippet = """      <!-- GEO & AI AGENTS FOOTER SNIPPET (5 LLMs + Machine-Readable Docs) -->
      <div class="mt-8 pt-6 border-t border-slate-800/70 space-y-4 max-w-7xl mx-auto text-xs text-slate-400">
        <!-- HÀNG 1: TÀI LIỆU MÁY ĐỌC (AGENTS / MACHINE CONTEXT) -->
        <div class="space-y-1.5 text-left">
          <div class="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
            <span class="text-emerald-400">⚡</span>
            <span>Trợ lý AI & Dữ liệu máy đọc (AI Agents & Machine Context)</span>
          </div>
          <div class="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[11px] text-slate-400 font-mono">
            <a href="/llms.txt" target="_blank" class="hover:text-emerald-400 transition underline decoration-slate-800 hover:decoration-emerald-400">llms.txt</a>
            <a href="/llms-full.txt" target="_blank" class="hover:text-emerald-400 transition underline decoration-slate-800 hover:decoration-emerald-400">llms-full.txt</a>
            <a href="/features.md" target="_blank" class="hover:text-emerald-400 transition underline decoration-slate-800 hover:decoration-emerald-400">features.md</a>
            <a href="/services.md" target="_blank" class="hover:text-emerald-400 transition underline decoration-slate-800 hover:decoration-emerald-400">services.md</a>
            <a href="/courses.md" target="_blank" class="hover:text-emerald-400 transition underline decoration-slate-800 hover:decoration-emerald-400">courses.md</a>
            <a href="/faq.md" target="_blank" class="hover:text-emerald-400 transition underline decoration-slate-800 hover:decoration-emerald-400">faq.md</a>
            <a href="/.well-known/agent-instructions.md" target="_blank" class="hover:text-emerald-400 transition underline decoration-slate-800 hover:decoration-emerald-400">agent-instructions.md</a>
            <a href="/openapi.json" target="_blank" class="hover:text-emerald-400 transition underline decoration-slate-800 hover:decoration-emerald-400">openapi.json</a>
            <a href="/.well-known/mcp/server-card.json" target="_blank" class="hover:text-emerald-400 transition underline decoration-slate-800 hover:decoration-emerald-400">mcp-server-card</a>
          </div>
        </div>

        <!-- HÀNG 2: BỘ 5 TRỢ LÝ AI JUMP LINKS CÓ GÀI PROMPT SẴN -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-slate-800/50">
          <p class="text-xs text-slate-400 leading-relaxed text-left">
            Xem ChatGPT, Claude, Perplexity, Gemini hoặc Grok nói gì về Cung Văn Hóa Lao Động Cơ Sở Bình Trưng.
          </p>
          <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-start sm:justify-end">
            <!-- 1. ChatGPT -->
            <a href="https://chatgpt.com/?q=T%C3%B3m%20t%E1%BA%AFt%20Cung%20V%C4%83n%20H%C3%B3a%20Lao%20%C4%90%E1%BB%99ng%20C%C6%A1%20S%E1%BB%9F%20B%C3%ACnh%20Tr%C6%B0ng%20(https%3A%2F%2Fcungvanhoalaodong.com)%3A%20%C4%90%E1%BB%8Ba%20ch%E1%BB%89%20245%20Nguy%E1%BB%85n%20Duy%20Trinh%2C%2016%20l%E1%BB%9Bp%20h%E1%BB%8Dc%20n%C4%83ng%20khi%E1%BA%BFu%20Qu%C3%BD%204%2F2026%2C%20d%E1%BB%8Bch%20v%E1%BB%A5%20cho%20thu%C3%AA%20h%E1%BB%99i%20tr%C6%B0%E1%BB%9Dng%20250-500%20ch%E1%BB%97%20v%C3%A0%20ch%C3%ADnh%20s%C3%A1ch%20%C6%B0u%20%C4%91%C3%A3i%20c%C3%B4ng%20%C4%91o%C3%A0n." target="_blank" rel="noopener noreferrer" 
               aria-label="ChatGPT" title="Hỏi ChatGPT về CVHLĐ Cơ Sở Bình Trưng" 
               class="inline-flex w-9 h-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 hover:border-slate-700 transition shadow-sm cursor-pointer group flex-shrink-0">
              <img src="/logos/openai.svg" alt="ChatGPT" width="18" height="18" loading="lazy" class="w-4 h-4 object-contain group-hover:scale-110 transition-transform">
            </a>

            <!-- 2. Claude -->
            <a href="https://claude.ai/new?q=T%C3%B3m%20t%E1%BA%AFt%20Cung%20V%C4%83n%20H%C3%B3a%20Lao%20%C4%90%E1%BB%99ng%20C%C6%A1%20S%E1%BB%9F%20B%C3%ACnh%20Tr%C6%B0ng%20(https%3A%2F%2Fcungvanhoalaodong.com)%3A%20%C4%90%E1%BB%8Ba%20ch%E1%BB%89%20245%20Nguy%E1%BB%85n%20Duy%20Trinh%2C%2016%20l%E1%BB%9Bp%20h%E1%BB%8Dc%20n%C4%83ng%20khi%E1%BA%BFu%20Qu%C3%BD%204%2F2026%2C%20d%E1%BB%8Bch%20v%E1%BB%A5%20cho%20thu%C3%AA%20h%E1%BB%99i%20tr%C6%B0%E1%BB%9Dng%20250-500%20ch%E1%BB%97%20v%C3%A0%20ch%C3%ADnh%20s%C3%A1ch%20%C6%B0u%20%C4%91%C3%A3i%20c%C3%B4ng%20%C4%91o%C3%A0n." target="_blank" rel="noopener noreferrer" 
               aria-label="Claude" title="Hỏi Claude về CVHLĐ Cơ Sở Bình Trưng" 
               class="inline-flex w-9 h-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 hover:border-slate-700 transition shadow-sm cursor-pointer group flex-shrink-0">
              <img src="/logos/claude.svg" alt="Claude" width="18" height="18" loading="lazy" class="w-4 h-4 object-contain group-hover:scale-110 transition-transform">
            </a>

            <!-- 3. Perplexity -->
            <a href="https://www.perplexity.ai/search?q=T%C3%B3m%20t%E1%BA%AFt%20Cung%20V%C4%83n%20H%C3%B3a%20Lao%20%C4%90%E1%BB%99ng%20C%C6%A1%20S%E1%BB%9F%20B%C3%ACnh%20Tr%C6%B0ng%20(https%3A%2F%2Fcungvanhoalaodong.com)%3A%20%C4%90%E1%BB%8Ba%20ch%E1%BB%89%20245%20Nguy%E1%BB%85n%20Duy%20Trinh%2C%2016%20l%E1%BB%9Bp%20h%E1%BB%8Dc%20n%C4%83ng%20khi%E1%BA%BFu%20Qu%C3%BD%204%2F2026%2C%20d%E1%BB%8Bch%20v%E1%BB%A5%20cho%20thu%C3%AA%20h%E1%BB%99i%20tr%C6%B0%E1%BB%9Dng%20250-500%20ch%E1%BB%97%20v%C3%A0%20ch%C3%ADnh%20s%C3%A1ch%20%C6%B0u%20%C4%91%C3%A3i%20c%C3%B4ng%20%C4%91o%C3%A0n." target="_blank" rel="noopener noreferrer" 
               aria-label="Perplexity" title="Tìm trên Perplexity về CVHLĐ Cơ Sở Bình Trưng" 
               class="inline-flex w-9 h-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 hover:border-slate-700 transition shadow-sm cursor-pointer group flex-shrink-0">
              <img src="/logos/perplexity.svg" alt="Perplexity" width="18" height="18" loading="lazy" class="w-4 h-4 object-contain group-hover:scale-110 transition-transform">
            </a>

            <!-- 4. Gemini (Google AI Overviews với udm=50) -->
            <a href="https://www.google.com/search?udm=50&q=T%C3%B3m%20t%E1%BA%AFt%20Cung%20V%C4%83n%20H%C3%B3a%20Lao%20%C4%90%E1%BB%99ng%20C%C6%A1%20S%E1%BB%9F%20B%C3%ACnh%20Tr%C6%B0ng%20(https%3A%2F%2Fcungvanhoalaodong.com)%3A%20%C4%90%E1%BB%8Ba%20ch%E1%BB%89%20245%20Nguy%E1%BB%85n%20Duy%20Trinh%2C%2016%20l%E1%BB%9Bp%20h%E1%BB%8Dc%20n%C4%83ng%20khi%E1%BA%BFu%20Qu%C3%BD%204%2F2026%2C%20d%E1%BB%8Bch%20v%E1%BB%A5%20cho%20thu%C3%AA%20h%E1%BB%99i%20tr%C6%B0%E1%BB%9Dng%20250-500%20ch%E1%BB%97%20v%C3%A0%20ch%C3%ADnh%20s%C3%A1ch%20%C6%B0u%20%C4%91%C3%A3i%20c%C3%B4ng%20%C4%91o%C3%A0n." target="_blank" rel="noopener noreferrer" 
               aria-label="Gemini / Google AI" title="Xem Google AI Overviews về CVHLĐ Cơ Sở Bình Trưng" 
               class="inline-flex w-9 h-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 hover:border-slate-700 transition shadow-sm cursor-pointer group flex-shrink-0">
              <img src="/logos/gemini.svg" alt="Gemini" width="18" height="18" loading="lazy" class="w-4 h-4 object-contain group-hover:scale-110 transition-transform">
            </a>

            <!-- 5. Grok -->
            <a href="https://grok.com/?q=T%C3%B3m%20t%E1%BA%AFt%20Cung%20V%C4%83n%20H%C3%B3a%20Lao%20%C4%90%E1%BB%99ng%20C%C6%A1%20S%E1%BB%9F%20B%C3%ACnh%20Tr%C6%B0ng%20(https%3A%2F%2Fcungvanhoalaodong.com)%3A%20%C4%90%E1%BB%8Ba%20ch%E1%BB%89%20245%20Nguy%E1%BB%85n%20Duy%20Trinh%2C%2016%20l%E1%BB%9Bp%20h%E1%BB%8Dc%20n%C4%83ng%20khi%E1%BA%BFu%20Qu%C3%BD%204%2F2026%2C%20d%E1%BB%8Bch%20v%E1%BB%A5%20cho%20thu%C3%AA%20h%E1%BB%99i%20tr%C6%B0%E1%BB%9Dng%20250-500%20ch%E1%BB%97%20v%C3%A0%20ch%C3%ADnh%20s%C3%A1ch%20%C6%B0u%20%C4%91%C3%A3i%20c%C3%B4ng%20%C4%91o%C3%A0n." target="_blank" rel="noopener noreferrer" 
               aria-label="Grok" title="Hỏi Grok về CVHLĐ Cơ Sở Bình Trưng" 
               class="inline-flex w-9 h-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 hover:border-slate-700 transition shadow-sm cursor-pointer group flex-shrink-0">
              <img src="/logos/grok.svg" alt="Grok" width="18" height="18" loading="lazy" class="w-4 h-4 object-contain group-hover:scale-110 transition-transform">
            </a>
          </div>
        </div>
      </div>
"""

target_marker = '<div class="text-slate-500 text-[11px] pt-4 border-t border-slate-800">'

files = glob.glob('lop-hoc/*/index.html')
print(f"Found {len(files)} course pages.")

updated_count = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    if "<!-- GEO & AI AGENTS FOOTER SNIPPET" in content:
        print(f"Skipping already injected: {f}")
        continue
    
    if target_marker in content:
        new_content = content.replace(target_marker, footer_snippet + "\n      " + target_marker, 1)
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(new_content)
        updated_count += 1
        print(f"Updated: {f}")
    else:
        print(f"WARNING: Marker not found in {f}")

print(f"Successfully injected GEO footer into {updated_count}/{len(files)} course pages.")
