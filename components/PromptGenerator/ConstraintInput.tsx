'use client'
import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

interface ConstraintInputProps {
  constraints: string[];
  onChange: (constraints: string[]) => void;
}

export const ConstraintInput = ({ constraints, onChange }: ConstraintInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab" && inputValue.trim()) {
      e.preventDefault();
      if (!constraints.includes(inputValue.trim())) {
        onChange([...constraints, inputValue.trim()]);
      }
      setInputValue("");
    }
    if (e.key === "Backspace" && !inputValue && constraints.length > 0) {
      onChange(constraints.slice(0, -1));
    }
  };

  const removeConstraint = (index: number) => {
    onChange(constraints.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">

      <div className="relative group">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="New constraint... (Enter to add, Tab to add multiple)"
          className="h-12 bg-white/5 dark:bg-black/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl pl-4 placeholder:text-muted-foreground/40"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-muted text-[10px] font-bold text-muted-foreground opacity-0 group-focus-within:opacity-100 transition-opacity uppercase tracking-wider">
          Enter
        </div>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[40px]">
        <AnimatePresence mode="popLayout">
          {constraints.map((constraint, index) => (
            <motion.span
              key={constraint}
              layout
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -10 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-bold border border-primary/20 shadow-sm"
            >
              {constraint}
              <button
                type="button"
                onClick={() => removeConstraint(index)}
                className="hover:bg-primary/20 rounded-lg p-1 transition-colors group"
              >
                <X className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
