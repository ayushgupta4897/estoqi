import { CheckCircle, Loader2, Play, Send } from "lucide-react";
import type React from "react";
import { useState } from "react";
import VideoModal from "../components/VideoModal";
import { useScrollAnimation } from "../hooks/useIntersectionObserver";
import {
  useAddCommunityStory,
  useGetCommunityStories,
} from "../hooks/useQueries";

const placeholderTestimonials = [
  {
    id: 1,
    name: "Priya Mehta",
    location: "Mumbai",
    quote:
      "Changed how our entire family thinks about food and water. The produce cleansing is remarkable.",
  },
  {
    id: 2,
    name: "Arjun Kapoor",
    location: "Delhi",
    quote:
      "As a chef, I was skeptical. After 3 months with ESTOQI, I can taste the difference in every dish.",
  },
  {
    id: 3,
    name: "Sunita Rao",
    location: "Bangalore",
    quote:
      "My children's health has visibly improved. ESTOQI is the future of home wellness.",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Pune",
    quote:
      "Our restaurant kitchen transformed overnight. Produce lasts longer, tastes cleaner.",
  },
  {
    id: 5,
    name: "Ananya Sharma",
    location: "Chennai",
    quote:
      "The science behind ESTOQI is real. I've seen the lab reports. This is not a gimmick.",
  },
  {
    id: 6,
    name: "Rohan Gupta",
    location: "Hyderabad",
    quote:
      "Best investment we've made for our family's health. The hydration quality is unmatched.",
  },
];

const badges = [
  {
    emoji: "💧",
    name: "Hydration Pioneer",
    description:
      "Awarded to early adopters who embraced ESTOQI's 9.5 pH drinking stream.",
    color: "bg-estoqi-blue/10 border-estoqi-blue/30 text-estoqi-blue",
    iconBg: "bg-estoqi-blue/20",
  },
  {
    emoji: "🌿",
    name: "Clean Eater",
    description:
      "Earned by members who complete 30 days of daily produce cleansing with ESTOQI.",
    color: "bg-estoqi-green/10 border-estoqi-green/30 text-estoqi-green",
    iconBg: "bg-estoqi-green/20",
  },
  {
    emoji: "⚙️",
    name: "System Advocate",
    description:
      "Granted to members who refer 3 or more households to the ESTOQI system.",
    color: "bg-estoqi-green/10 border-estoqi-green/30 text-estoqi-green",
    iconBg: "bg-estoqi-green/20",
  },
  {
    emoji: "☀️",
    name: "Wellness Trailblazer",
    description:
      "Recognized for sharing your ESTOQI wellness journey with the community.",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconBg: "bg-amber-100",
  },
  {
    emoji: "👑",
    name: "ESTOQI Elite",
    description:
      "The highest honor - awarded to members who embody the ESTOQI philosophy in every aspect of life.",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    iconBg: "bg-purple-100",
  },
];

const Collective: React.FC = () => {
  const [videoModal, setVideoModal] = useState<{ open: boolean; name: string }>(
    { open: false, name: "" },
  );
  const [formData, setFormData] = useState({
    name: "",
    story: "",
    videoUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const addStory = useAddCommunityStory();
  const { data: communityStories } = useGetCommunityStories();

  useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.story.trim()) return;

    try {
      await addStory.mutateAsync({
        name: formData.name.trim(),
        story: formData.story.trim(),
        videoUrl: formData.videoUrl.trim() || null,
      });
      setSubmitted(true);
      setFormData({ name: "", story: "", videoUrl: "" });
    } catch (err) {
      console.error("Failed to submit story:", err);
    }
  };

  return (
    <main className="bg-estoqi-off-white">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-estoqi-dark">
        <img
          src="/assets/generated/hero-molecules.dim_1920x1080.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-estoqi-dark/20 to-estoqi-dark/90" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
          <p className="label-caps text-estoqi-green mb-6 animate-slide-up">
            The Collective
          </p>
          <h1
            className="heading-display text-white text-5xl md:text-7xl mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            The ESTOQI
            <br />
            collective
          </h1>
          <p
            className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            A growing community of people who have chosen intelligence over
            habit. Share your story. Inspire the next.
          </p>
        </div>
      </section>

      {/* Testimonial Grid */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-green mb-4">
              Community Voices
            </p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              Real People.
              <br />
              Real Transformation.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderTestimonials.map((t, i) => (
              <div
                key={t.id}
                className={`fade-up stagger-${(i % 3) + 1} group cursor-pointer`}
                onClick={() => setVideoModal({ open: true, name: t.name })}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  setVideoModal({ open: true, name: t.name })
                }
              >
                {/* Video thumbnail */}
                <div
                  className="relative rounded-sm overflow-hidden mb-4"
                  style={{ aspectRatio: "4/3" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-estoqi-dark to-[oklch(0.18_0.04_155)]">
                    <div className="absolute inset-0 bg-estoqi-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="play-icon group-hover:scale-110">
                      <Play
                        size={22}
                        className="text-white ml-0.5"
                        fill="white"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-estoqi-dark/60 to-transparent">
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.location}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>

          {/* Backend stories */}
          {communityStories && communityStories.length > 0 && (
            <div className="mt-16">
              <h3 className="heading-display text-2xl text-foreground mb-8 text-center fade-up">
                Community Submissions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityStories.map((story) => (
                  <div
                    key={story.name}
                    className="fade-up glass-white rounded-sm p-6 border border-border"
                  >
                    <p className="font-semibold text-foreground mb-2">
                      {story.name}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed italic mb-3">
                      "{story.story}"
                    </p>
                    {story.videoUrl && (
                      <a
                        href={story.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label-caps text-estoqi-blue text-xs hover:underline"
                      >
                        Watch Video →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-green mb-4">
              Share Your Story
            </p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              Your Voice
              <br />
              Matters
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto">
              Share your ESTOQI experience with the community. Your story could
              inspire someone to make the shift.
            </p>
          </div>

          {submitted ? (
            <div className="fade-up text-center py-16">
              <div className="w-20 h-20 rounded-full bg-estoqi-green/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={36} className="text-estoqi-green" />
              </div>
              <h3 className="heading-display text-2xl text-foreground mb-3">
                Story Submitted
              </h3>
              <p className="text-muted-foreground mb-8">
                Thank you for sharing your ESTOQI journey. Your story has been
                added to the collective.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-primary-estoqi"
              >
                Share Another Story
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="fade-up stagger-2 space-y-6"
            >
              <div>
                <label
                  htmlFor="story-name"
                  className="label-caps text-foreground/60 block mb-2"
                >
                  Your Name *
                </label>
                <input
                  id="story-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Full name"
                  required
                  className="w-full border border-border rounded-sm px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-estoqi-green transition-colors bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="story-text"
                  className="label-caps text-foreground/60 block mb-2"
                >
                  Your Story *
                </label>
                <textarea
                  id="story-text"
                  value={formData.story}
                  onChange={(e) =>
                    setFormData({ ...formData, story: e.target.value })
                  }
                  placeholder="Share your ESTOQI experience..."
                  required
                  rows={5}
                  className="w-full border border-border rounded-sm px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-estoqi-green transition-colors bg-white resize-none"
                />
              </div>

              <div>
                <label
                  htmlFor="story-video"
                  className="label-caps text-foreground/60 block mb-2"
                >
                  Video Link{" "}
                  <span className="text-muted-foreground normal-case font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  id="story-video"
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  placeholder="https://youtube.com/..."
                  className="w-full border border-border rounded-sm px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-estoqi-green transition-colors bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={
                  addStory.isPending ||
                  !formData.name.trim() ||
                  !formData.story.trim()
                }
                className="btn-primary-estoqi w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addStory.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Your Story
                  </>
                )}
              </button>

              {addStory.isError && (
                <p className="text-destructive text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* Badges */}
      <section className="py-24 lg:py-32 bg-estoqi-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="label-caps text-estoqi-green mb-4">
              Achievement Badges
            </p>
            <h2 className="heading-display text-4xl md:text-5xl text-foreground">
              Earn Your Place
              <br />
              in the Collective
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {badges.map((badge, i) => (
              <div
                key={badge.name}
                className={`fade-up stagger-${i + 1} rounded-sm border-2 p-6 text-center ${badge.color} transition-all hover:-translate-y-1 hover:shadow-glass`}
              >
                <div
                  className={`w-16 h-16 rounded-full ${badge.iconBg} flex items-center justify-center mx-auto mb-4 text-3xl`}
                >
                  {badge.emoji}
                </div>
                <h3 className="font-semibold text-sm mb-2">{badge.name}</h3>
                <p className="text-xs leading-relaxed opacity-80">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={videoModal.open}
        onClose={() => setVideoModal({ open: false, name: "" })}
        title={
          videoModal.name ? `${videoModal.name}'s Story` : "Community Story"
        }
      />
    </main>
  );
};

export default Collective;
