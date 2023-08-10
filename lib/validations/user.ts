import * as zod from "zod";

export const UserValidation = zod.object({
    profile_photo: zod.string().url().nonempty(),
    name: zod
        .string()
        .min(3, { message: "minimun of three characters" })
        .max(30, { message: "Not more than 30 characters." }),
    username: zod
        .string()
        .min(3, { message: "minimun of three characters" })
        .max(30, { message: "Not more than 30 characters." }),
    bio: zod.string().min(3, { message: "minimun of three characters" }),
});
