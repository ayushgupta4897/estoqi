import Time "mo:core/Time";
import List "mo:core/List";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import AccessControl "mo:caffeineai-authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  type CommunityStory = {
    name : Text;
    story : Text;
    videoUrl : ?Text;
    timestamp : Int;
  };

  type ConsultationSubmission = {
    fullName : Text;
    email : Text;
    phoneNumber : Text;
    interest : Text;
    preferredDateTime : Text;
    message : Text;
    timestamp : Int;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let communityStories = List.empty<CommunityStory>();
  let consultationSubmissions = List.empty<ConsultationSubmission>();

  public shared ({ caller }) func addCommunityStory(name : Text, story : Text, videoUrl : ?Text) : async () {
    let newStory : CommunityStory = {
      name;
      story;
      videoUrl;
      timestamp = Time.now();
    };
    communityStories.add(newStory);
  };

  public query func getAllCommunityStories() : async [CommunityStory] {
    communityStories.toArray().sort(
      func(a, b) { Int.compare(b.timestamp, a.timestamp) }
    );
  };

  public shared ({ caller }) func addConsultationSubmission(
    fullName : Text,
    email : Text,
    phoneNumber : Text,
    interest : Text,
    preferredDateTime : Text,
    message : Text,
  ) : async () {
    let newSubmission : ConsultationSubmission = {
      fullName;
      email;
      phoneNumber;
      interest;
      preferredDateTime;
      message;
      timestamp = Time.now();
    };
    consultationSubmissions.add(newSubmission);
  };

  public query ({ caller }) func getAllConsultationSubmissions() : async [ConsultationSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view consultation submissions");
    };
    consultationSubmissions.toArray().sort(
      func(a, b) { Int.compare(b.timestamp, a.timestamp) }
    );
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.isAdmin(accessControlState, caller)) and caller != user) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
