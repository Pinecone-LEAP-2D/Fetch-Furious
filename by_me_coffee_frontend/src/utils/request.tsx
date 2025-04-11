import { profileSchema } from "@/app/(profile)/profile/_features/Profile";
import { donationSchema } from "@/app/(viewpage)/viewpage/_features/DonaitionZone";
import { bankCardSchema, passwordSchema } from "@/schema/zodSchema";
import { addDays } from "date-fns";
import axios from "axios";
import { z } from "zod";
export const successMessageSchema = z.object({
  successMessage: z.string(),
});
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
  try {
    console.log(userId);
    
    const response = await axios.get(
      `http://localhost:4000/profile/user/${userId}`,);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getManyProfile = async (page = 1, name: string) => {
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
      params: { page, name },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    return null;
  }
};
export const addBackground = async (
  backgroundImage: string,
  userID: string
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }
  try {
    await axios.put(
      `http://localhost:4000/profile/backgorund/${userID}`,
      { backgroundImage: backgroundImage },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const sendDonation = async (
  data: z.infer<typeof donationSchema>,
  recipientId: number
) => {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      `http://localhost:4000/donation/${recipientId}`,
      {
        amount: data.amount,
        socialURLOrBuyMeACoffee: data.socialURLOrBuyMeACoffee,
        specialMessage: data.specialMessage,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const addBankCard = async (value: z.infer<typeof bankCardSchema>) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }

  try {
    await axios.post(
      `http://localhost:4000/bankcard/`,
      {
        country: value.country,
        firstName: value.firstName,
        lastName: value.lastName,
        cardNumber: value.cardNumber,
        expiryDate: `${value.month}/${value.year}`,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const getDonation = async (userId: string | string[] | number) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/donation/all/${userId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDonationWithFilter = async (
  userId: string | string[] | number,
  amount: number | null | undefined,
  date: number | string
) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/donation/${userId}`,
      {
        params: {
          amount: amount,
          date: addDays(new Date(), -date).toISOString(),
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const putProfile = async (
  values: z.infer<typeof profileSchema>,
  image: string
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }
  try {
    const response = await axios.put(
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
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const putBankCard = async (value: z.infer<typeof bankCardSchema>) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found in localStorage.");
    return null;
  }

  try {
    const response = await axios.put(
      `http://localhost:4000/bankcard`,
      {
        country: value.country,
        firstName: value.firstName,
        lastName: value.lastName,
        cardNumber: value.cardNumber,
        expiryDate: `${value.month}/${value.year}`,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const putSuccess = async (
  values: z.infer<typeof successMessageSchema>
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }
  try {
    const response = await axios.put(
      "http://localhost:4000/profile",
      {
        successMessage: values.successMessage,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const putUser = async (values: z.infer<typeof passwordSchema>) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }
  try {
    const response = await axios.put(
      "http://localhost:4000/user",
      {
        password: values.password,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }
  try {
    const response = await axios.get(`http://localhost:4000/profile/auth`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
