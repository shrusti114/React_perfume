import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

function BackButton({
  to,
  label,
  onClick,
}: {
  to?: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex w-full text-white leading-10.5 px-2.5 h-10.5 py-4 gap-0.5 font-bold justify-start">
      <div
        className="cursor-pointer hover:text-[#f8c8dc] active:text-[#f8c8dc]/80 flex items-center gap-1"
        onClick={() => {
          onClick?.();
        }}
      >
        <ArrowLeft size={16} />
        {to ? (
          <Link
            to={to}
            className="font-medium leading-5 tracking-tighter underline-offset-2 underline"
          >
            {label}
          </Link>
        ) : (
          <span className="font-medium leading-5 tracking-tighter underline-offset-2 underline">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
export { BackButton };
