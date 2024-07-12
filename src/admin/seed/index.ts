import type { Payload } from "payload";

// WARNING/REMINDER: Please change the email and password to your own after seeding the data into production environment!
export const seed = async (payload: Payload) => {
  await payload.create({
    collection: "users",
    data: {
      email: "admin@owu.uy",
      password: "admin",
    },
  });
};
