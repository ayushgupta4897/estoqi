import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Community story shape (local type since backend interface is empty)
export interface CommunityStory {
  name: string;
  story: string;
  videoUrl: string | null;
  timestamp: bigint;
}

// Consultation submission shape (local type)
export interface ConsultationSubmission {
  fullName: string;
  email: string;
  phoneNumber: string;
  interest: string;
  preferredDateTime: string;
  message: string;
  timestamp: bigint;
}

// Community Stories
export function useGetCommunityStories() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<CommunityStory[]>({
    queryKey: ["communityStories"],
    queryFn: async () => {
      if (!actor) return [];

      return (
        actor as unknown as {
          getAllCommunityStories: () => Promise<CommunityStory[]>;
        }
      ).getAllCommunityStories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCommunityStory() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      story,
      videoUrl,
    }: {
      name: string;
      story: string;
      videoUrl: string | null;
    }) => {
      if (!actor) throw new Error("Actor not available");

      return (
        actor as unknown as {
          addCommunityStory: (
            n: string,
            s: string,
            v: string | null,
          ) => Promise<void>;
        }
      ).addCommunityStory(name, story, videoUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityStories"] });
    },
  });
}

// Consultation Submissions
export function useAddConsultationSubmission() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      fullName,
      email,
      phoneNumber,
      interest,
      preferredDateTime,
      message,
    }: {
      fullName: string;
      email: string;
      phoneNumber: string;
      interest: string;
      preferredDateTime: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");

      return (
        actor as unknown as {
          addConsultationSubmission: (
            fn: string,
            e: string,
            p: string,
            i: string,
            d: string,
            m: string,
          ) => Promise<void>;
        }
      ).addConsultationSubmission(
        fullName,
        email,
        phoneNumber,
        interest,
        preferredDateTime,
        message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultationSubmissions"] });
    },
  });
}

export function useGetConsultationSubmissions() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<ConsultationSubmission[]>({
    queryKey: ["consultationSubmissions"],
    queryFn: async () => {
      if (!actor) return [];

      return (
        actor as unknown as {
          getAllConsultationSubmissions: () => Promise<
            ConsultationSubmission[]
          >;
        }
      ).getAllConsultationSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}
