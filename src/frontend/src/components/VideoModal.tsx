import { X } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import VideoPlaceholder from "./VideoPlaceholder";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  videoUrl?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title,
  videoUrl,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: ESC key handled via window listener
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-estoqi-dark/92 backdrop-blur-sm animate-fade-in-scale" />

      {/* Modal Content */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagation only */}
      <div
        className="relative w-full max-w-5xl animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 label-caps z-10"
        >
          <span>Close</span>
          <X size={18} />
        </button>

        {title && <p className="text-white/50 label-caps mb-4">{title}</p>}

        {videoUrl ? (
          <div className="aspect-video w-full rounded-sm overflow-hidden">
            <iframe
              src={videoUrl}
              title={title || "Video player"}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        ) : (
          <VideoPlaceholder
            label={title || "ESTOQI Film"}
            size="lg"
            className="rounded-sm"
          />
        )}
      </div>
    </div>
  );
};

export default VideoModal;
