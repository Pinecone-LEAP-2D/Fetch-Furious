"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { addBackground, getProfile } from "@/utils/request";
import { Profile } from "@prisma/client";

type ProfileContext = {
  profile: Profile | undefined;
  addBackgroundImage : (image:string)=>void
};
const ProfileContex = createContext<ProfileContext | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const [userID, setUserID] = useState('')
  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;
    const decode = jwtDecode<JwtPayload>(token);
    try {
      const response = await getProfile(decode.userId);
      if (!response) {
        console.log("user not found");
        return;
      }
      await setProfile(response.data.result);
      setUserID(decode.userId)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [loading]);
const addBackgroundImage = async (image:string,) => {
    try {
        setLoading(true)
        await addBackground(image, userID)
    } catch (error) {
        console.log(error);
    }finally {
        setLoading(false)
    }
}
  return (
    <ProfileContex.Provider value={{ profile, addBackgroundImage }}>
      {children}
    </ProfileContex.Provider>
  );
};
export const useProfile = () => {
  const context = useContext(ProfileContex);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
