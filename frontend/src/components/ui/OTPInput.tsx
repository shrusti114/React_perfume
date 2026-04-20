import {
  useState,
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

type OTPInputProps = {
  value?: string;
  onChange?: (_next: string) => void;
  length?: number;
  error?: string;
};

export function OTPInput({
  value = "",
  onChange,
  length = 4,
  error,
}: OTPInputProps) {
  const hasError = !!error;
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Derive digits from the external value string, padded with empties
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  const emit = (arr: string[]) => onChange?.(arr.join(""));

  const handleInput = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const digit = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    if (!digit) return;
    const next = [...digits];
    next[idx] = digit;
    emit(next);
    if (idx < length - 1) refs.current[idx + 1]?.focus();
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[idx]) {
        // Remove digit at current position and shift remaining left
        const next = [...digits];
        next.splice(idx, 1);
        next.push(""); // pad end
        emit(next);
        // Keep focus on same index (now shows the shifted digit)
      } else if (idx > 0) {
        // Current is empty — remove previous digit and shift
        const next = [...digits];
        next.splice(idx - 1, 1);
        next.push("");
        emit(next);
        refs.current[idx - 1]?.focus();
      }
    }

    if (e.key === "Delete") {
      e.preventDefault();
      if (digits[idx]) {
        // Remove digit at current position and shift remaining left
        const next = [...digits];
        next.splice(idx, 1);
        next.push("");
        emit(next);
      }
    }

    if (e.key === "ArrowLeft" && idx > 0) refs.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < length - 1)
      refs.current[idx + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, length);
    const next = Array.from({ length }, (_, i) => text[i] || "");
    emit(next);
    refs.current[Math.min(text.length, length - 1)]?.focus();
  };

  // Auto-select text on focus so typing replaces the existing digit
  const handleFocus = (idx: number) => {
    setFocusedIdx(idx);
    // Small delay so the selection happens after React re-render
    requestAnimationFrame(() => {
      refs.current[idx]?.select();
    });
  };

  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            refs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={2}
          value={digit}
          id={`otp-${idx}`}
          onChange={(e) => handleInput(e, idx)}
          onKeyDown={(e) => handleKey(e, idx)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(idx)}
          onBlur={() => setFocusedIdx(null)}
          className={`border rounded-[10px] w-[86.5px] h-16 text-2xl font-medium leading-8 text-center text-white bg-white/5 outline-none transition-all
    ${
      hasError
        ? "border-red-600"
        : focusedIdx === idx
          ? "border-[#f8c8dc] shadow-lg shadow-[#f8c8dc]/10"
          : "border-white/10"
    }`}
        />
      ))}
    </div>
  );
}
