interface PWAIconProps {
  className?: string;
}

export function PWAIcon({ className = "w-6 h-6" }: PWAIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L13.09 8.26L19 7L16.5 12.5L22 14L15.74 15.09L17 21L11.5 18.5L10 24L8.26 17.74L2 19L4.5 13.5L0 12L6.26 10.91L5 5L10.5 7.5L12 2Z"
        fill="currentColor"
      />
      <path
        d="M12 8C10.34 8 9 9.34 9 11C9 12.66 10.34 14 12 14C13.66 14 15 12.66 15 11C15 9.34 13.66 8 12 8Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}