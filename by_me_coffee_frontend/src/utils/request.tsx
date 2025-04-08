import { profileSchema } from "@/app/(profile)/profile/_features/Profile";
import axios from "axios";
import { z } from "zod";

export const postProfile = async (
  values: z.infer<typeof profileSchema>,
  image: string
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }
  try {
    const response = await axios.post(
      "http://localhost:4000/profile",
      {
        avatarImage: image,
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
export const getProfile = async (userId: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }
  try {
    const response = await axios.get(
      `http://localhost:4000/profile/user/${userId}`,
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

export const getManyProfile = async (page = 1) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }

  try {
    const response = await axios.get("http://localhost:4000/profile/explore", {
      headers: {
        Authorization: token,
      },
      params: { page },
    });
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    return null;
  }
};

