export default {
    providers: [
      {
        domain: "nice-goshawk-24.clerk.accounts.dev",
        applicationID: "convex",
        development: process.env.NODE_ENV === "development"
      },
    ]
  };
