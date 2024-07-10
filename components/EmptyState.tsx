"use client";

import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({ title, showReset }) => {
  const router = useRouter();
  return (
    <div
      className="
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
    "
    >
      <h2>{title}</h2>

      <div className="w-52 mt-4">
        {showReset && (
          <button onClick={() => router.push("/")}>
            Aller à la page d&apos;accueil
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
