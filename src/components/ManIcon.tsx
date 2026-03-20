"use client";

export default function ManIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="6" r="3" />
      <path d="M12 10c-4 0-7 2-7 5v4h14v-4c0-3-3-5-7-5z" />
    </svg>
  );
}
