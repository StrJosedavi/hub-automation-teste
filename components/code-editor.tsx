import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Eye, Maximize2, Play, Terminal, Settings } from "lucide-react";

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export function CodeEditor({
  value = "",
  onChange,
  placeholder = "// Escreva seu código aqui...",
  readOnly = false,
  className = "",
}: CodeEditorProps) {
  const [code, setCode] = useState(value);
  const [currentLine, setCurrentLine] = useState(1);
  const [currentColumn, setCurrentColumn] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (newValue: string) => {
    setCode(newValue);
    onChange?.(newValue);
    updateCursorPosition();
  };

  const updateCursorPosition = () => {
    if (textareaRef.current) {
      const { selectionStart } = textareaRef.current;
      const textBeforeCursor = code.substring(0, selectionStart);
      const line = textBeforeCursor.split("\n").length;
      const column = textBeforeCursor.split("\n").pop()?.length || 0;
      setCurrentLine(line);
      setCurrentColumn(column + 1);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = code.substring(0, start) + "  " + code.substring(end);
      setCode(newValue);
      onChange?.(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  useEffect(() => {
    updateCursorPosition();
  }, [code]);

  return (
    <div
      className={`border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2d2d30] to-[#252526] border-b border-[#3e3e42] px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-[#ff5f57] rounded-full"></div>
              <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
              <div className="w-3 h-3 bg-[#28ca42] rounded-full"></div>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#4ec9b0]" />
              <span className="text-sm font-medium text-[#cccccc]">
                test.spec.js
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-8 w-8 p-0 hover:bg-[#404040] text-[#cccccc] hover:text-white"
              title="Copiar código"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-[#404040] text-[#cccccc] hover:text-white"
              title="Executar testes"
            >
              <Play className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-[#404040] text-[#cccccc] hover:text-white"
              title="Visualizar"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-[#404040] text-[#cccccc] hover:text-white"
              title="Tela cheia"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-[#404040] text-[#cccccc] hover:text-white"
              title="Configurações"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="relative bg-[#1e1e1e]">
        {/* Line numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#252526] border-r border-[#3e3e42] flex flex-col text-xs text-[#858585] font-mono select-none">
          {code.split("\n").map((_, index) => (
            <div
              key={index}
              className={`px-2 py-0.5 text-right min-h-[1.5rem] flex items-center justify-end ${
                index + 1 === currentLine ? "bg-[#2a2d2e] text-[#cccccc]" : ""
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <Textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onSelect={updateCursorPosition}
          onClick={updateCursorPosition}
          placeholder={placeholder}
          readOnly={readOnly}
          className="pl-16 pr-4 py-4 bg-[#1e1e1e] border-0 resize-none outline-none text-[#d4d4d4] placeholder:text-[#6a737d] font-mono text-sm leading-6 min-h-[400px]"
          style={{
            fontFamily:
              '"Fira Code", "Cascadia Code", Consolas, "Courier New", monospace',
          }}
          spellCheck={false}
        />
      </div>

      {/* Footer */}
      <div className="bg-[#007acc] px-4 py-1 border-t border-[#3e3e42]">
        <div className="flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-4">
            <span>JavaScript</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-4">
            <span>
              Ln {currentLine}, Col {currentColumn}
            </span>
            <span>{code.length} caracteres</span>
          </div>
        </div>
      </div>
    </div>
  );
}
