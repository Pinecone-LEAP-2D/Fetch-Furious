import { profileSchema } from "@/app/(profile)/profile/_features/Profile";
import { donationSchema } from "@/app/(viewpage)/viewpage/_features/DonaitionZone";
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
export const getProfile = async (userId: string | string[]) => {
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
export const addBackground = async (backgroundImage:string, userID:string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }

  try {
    console.log(userID);
    
    await axios.put(`http://localhost:4000/profile/${userID}`,{backgroundImage:backgroundImage}, {
      headers: {
        Authorization: token,
      },}) 
  } catch (error) {
    console.log(error);
    
  }
}
export const sendDonation =async (data:z.infer<typeof donationSchema>, recipientId:number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }

  try {
    console.log(recipientId);
    await axios.post(`http://localhost:4000/donation/${recipientId}`,{
      amount : data.amount,
      socialURLOrBuyMeACoffee : data.socialURLOrBuyMeACoffee,
      specialMessage : data.specialMessage
    }, {
      headers: {
        Authorization: token,
      },}) 
  } catch (error) {
    console.log(error);
    
  }
}