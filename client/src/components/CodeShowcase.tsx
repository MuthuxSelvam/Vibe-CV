import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeShowcaseProps {
  code: string;
  language: string;
  title?: string;
}

const languageColors: Record<string, { bg: string; text: string; label: string }> = {
  typescript: { bg: "bg-blue-500/10", text: "text-blue-400", label: "TypeScript" },
  javascript: { bg: "bg-yellow-500/10", text: "text-yellow-400", label: "JavaScript" },
  python: { bg: "bg-green-500/10", text: "text-green-400", label: "Python" },
  rust: { bg: "bg-orange-500/10", text: "text-orange-400", label: "Rust" },
  go: { bg: "bg-cyan-500/10", text: "text-cyan-400", label: "Go" },
  sql: { bg: "bg-purple-500/10", text: "text-purple-400", label: "SQL" }
};

function highlightSyntax(code: string, language: string): string {
  const keywords: Record<string, string[]> = {
    typescript: ["const", "let", "var", "function", "class", "interface", "type", "export", "import", "from", "return", "if", "else", "for", "while", "async", "await", "new", "this", "public", "private", "protected", "extends", "implements", "typeof", "instanceof"],
    javascript: ["const", "let", "var", "function", "class", "export", "import", "from", "return", "if", "else", "for", "while", "async", "await", "new", "this"],
    python: ["def", "class", "import", "from", "return", "if", "else", "elif", "for", "while", "async", "await", "with", "as", "try", "except", "finally", "raise", "self", "None", "True", "False"],
    rust: ["fn", "let", "mut", "const", "struct", "enum", "impl", "trait", "pub", "use", "mod", "self", "Self", "return", "if", "else", "for", "while", "loop", "match", "async", "await"],
    go: ["func", "var", "const", "type", "struct", "interface", "package", "import", "return", "if", "else", "for", "range", "go", "defer", "chan"]
  };

  const types: Record<string, string[]> = {
    typescript: ["string", "number", "boolean", "void", "any", "unknown", "never", "null", "undefined", "Promise", "Array", "Map", "Set", "Record", "Partial", "Required"],
    python: ["str", "int", "float", "bool", "list", "dict", "tuple", "set", "None"],
    rust: ["i32", "i64", "u32", "u64", "f32", "f64", "bool", "String", "str", "Vec", "Option", "Result", "Box", "Rc", "Arc"],
    go: ["int", "int64", "float64", "string", "bool", "error", "interface", "struct"]
  };

  let result = code
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  result = result.replace(/(\/\/.*$)/gm, '<span class="text-muted-foreground/60">$1</span>');
  result = result.replace(/(#.*$)/gm, '<span class="text-muted-foreground/60">$1</span>');

  result = result.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<span class="text-emerald-400">$1</span>');

  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-amber-400">$1</span>');

  const langKeywords = keywords[language] || keywords.typescript;
  langKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b(?![^<]*>)`, 'g');
    result = result.replace(regex, '<span class="text-purple-400 font-medium">$1</span>');
  });

  const langTypes = types[language] || types.typescript || [];
  langTypes.forEach(type => {
    const regex = new RegExp(`\\b(${type})\\b(?![^<]*>)`, 'g');
    result = result.replace(regex, '<span class="text-cyan-400">$1</span>');
  });

  result = result.replace(/\b([A-Z][a-zA-Z0-9]*)\b(?![^<]*>)/g, '<span class="text-yellow-400">$1</span>');

  result = result.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="text-blue-400">$1</span>');

  return result;
}

export function CodeShowcase({ code, language, title }: CodeShowcaseProps) {
  const [copied, setCopied] = useState(false);
  const langConfig = languageColors[language] || languageColors.typescript;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");
  const highlightedCode = highlightSyntax(code, language);

  return (
    <motion.div
      className="rounded-lg overflow-hidden bg-slate-950 border border-slate-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      data-testid="code-showcase"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {title && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>{title}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-xs font-mono ${langConfig.bg} ${langConfig.text}`}>
            {langConfig.label}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-slate-400 hover:text-white"
            onClick={handleCopy}
            data-testid="button-copy-code"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          <code>
            {highlightedCode.split("\n").map((line, i) => (
              <div key={i} className="flex">
                <span className="w-8 shrink-0 text-slate-600 text-right pr-4 select-none">
                  {i + 1}
                </span>
                <span 
                  className="text-slate-300"
                  dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
