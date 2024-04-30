type Route =
  | {
      type: "signin";
    }
  | {
      type: "signup";
    }
  | {
      type: "logout";
    }
  | {
      type: "forgot-password";
    }
  | {
      type: "reset-password";
    }
  | {
      type: "resumes-page";
    }
  | {
      type: "resume-preview";
      resumeId: string;
    }
  | {
      type: "profile";
    }
  | {
      type: "resume-builder";
      editResumeId?: string;
    }
  | {
      type: "dashboard";
    }
  | {
      type: "onboarding";
      step:
        | "overview"
        | "profile"
        | "loading-publications"
        | "import-publications"
        | "certifications-and-licensures"
        | "education-and-training"
        | "complete";
    };

export const createRoute = (route: Route) => {
  if (route.type === "signin") {
    return "/sign-in";
  }
  if (route.type === "signup") {
    return "/sign-up";
  }
  if (route.type === "logout") {
    return "/logout";
  }
  if (route.type === "reset-password") {
    return "/reset-password";
  }

  if (route.type === "dashboard") {
    return "/dashboard";
  }

  if (route.type === "profile") {
    return "/profile";
  }

  if (route.type === "resumes-page") {
    return "/resumes";
  }

  if (route.type === "resume-builder") {
    return route.editResumeId
      ? `/resumes/builder?resumeId=${route.editResumeId}`
      : "/resumes/builder";
  }

  if (route.type === "resume-preview") {
    return `/r/${route.resumeId}`;
  }

  if (route.type === "onboarding") {
    return `/onboarding/${route.step}`;
  }

  throw new Error("Invalid route");
};
