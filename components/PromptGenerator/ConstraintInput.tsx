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
    if (e.key === "Enter" && inputValue.trim()) {
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
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 min-h-[40px]">
        <AnimatePresence mode="popLayout">
          {constraints.map((constraint, index) => (
            <motion.span
              key={constraint}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-medium border border-primary/20"
            >
              {constraint}
              <button
                type="button"
                onClick={() => removeConstraint(index)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a constraint and press Enter..."
        className="bg-surface-elevated border-border focus:border-primary/50 focus:ring-primary/20"
      />
    </div>
  );
};
