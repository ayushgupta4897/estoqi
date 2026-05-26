import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CommunityStory {
    name: string;
    story: string;
    timestamp: bigint;
    videoUrl?: string;
}
export interface ConsultationSubmission {
    interest: string;
    fullName: string;
    email: string;
    preferredDateTime: string;
    message: string;
    timestamp: bigint;
    phoneNumber: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCommunityStory(name: string, story: string, videoUrl: string | null): Promise<void>;
    addConsultationSubmission(fullName: string, email: string, phoneNumber: string, interest: string, preferredDateTime: string, message: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllCommunityStories(): Promise<Array<CommunityStory>>;
    getAllConsultationSubmissions(): Promise<Array<ConsultationSubmission>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
