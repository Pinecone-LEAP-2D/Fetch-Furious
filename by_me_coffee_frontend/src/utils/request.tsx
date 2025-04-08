import { profileSchema } from "@/app/(profile)/profile/_features/Profile";
import axios from "axios";
import { z } from "zod";

export const postProfile = async (values: z.infer<typeof profileSchema>) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://localhost:4000/profile",
      {
        avatarImage: values.avatarImage,
        name: values.name,
        about: values.about,
        socialMediaURL: values.socialMediaURL,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getProfile = async (userId:number) => {
    try {
        const response = await axios.get(`http://localhost:4000/profile/${userId}`)
        return response
    } catch (error) {
        console.log(error);
    }
}
