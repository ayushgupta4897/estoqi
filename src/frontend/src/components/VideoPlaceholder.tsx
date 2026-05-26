import { Play } from "lucide-react";
import type React from "react";

interface VideoPlaceholderProps {
  label?: string;
  thumbnail?: string;
  onClick?: () => void;
  className?: string;
  overlayText?: string;
  size?: "sm" | "md" | "lg";
}

const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
  label,
  thumbnail,
  onClick,
  className = "",
  overlayText,
  size = "md",
}) => {
  const playIconSize = size === "sm" ? 48 : size === "lg" ? 96 : 72;
  const iconSize = size === "sm" ? 20 : size === "lg" ? 36 : 28;

  return (
    <button
      type="button"
      className={`video-placeholder rounded-sm overflow-hidden group cursor-pointer border-0 p-0 w-full text-left ${className}`}
      onClick={onClick}
      aria-label={label || "Play video"}
    >
      {thumbnail && (
        <img
          src={thumbnail}
          alt={label || "Video thumbnail"}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
          loading="lazy"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Play button */}
      <div
        className="play-icon group-hover:scale-110"
        style={{ width: playIconSize, height: playIconSize }}
      >
        <Play size={iconSize} className="text-white ml-1" fill="white" />
      </div>

      {/* Label */}
      {(label || overlayText) && (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          {overlayText && (
            <p className="text-white/60 label-caps mb-1">{overlayText}</p>
          )}
          {label && <p className="text-white font-medium text-sm">{label}</p>}
        </div>
      )}
    </button>
  );
};

export default VideoPlaceholder;
