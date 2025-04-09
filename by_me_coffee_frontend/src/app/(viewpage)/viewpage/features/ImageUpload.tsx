import { useProfile } from "@/provider/ProfileProvider";
import { CameraIcon } from "lucide-react"

const ImageUpload = () =>{
    const {addBackgroundImage} = useProfile()
          const ProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "file" && e.target.files) {
          const file = e.target.files[0];
    
          try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "coffee");
    
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/dovchxnto/image/upload`,
              {
                method: "POST",
                body: formData,
              }
            );
            if (!response.ok) {
              throw new Error("Upload failed");
            }
            const result = await response.json();
            await addBackgroundImage(result.secure_url)
          } catch (error) {
            console.error(error);
          }
        }
      };
    return(
        <div className="w-full h-full flex justify-center items-center bg-[#F4F4F5]">
        <label className="flex items-center cursor-pointer bg-[#18181B] px-4 py-2 rounded-lg gap-2 text-[#FAFAFA]">
          <CameraIcon />
          Add cover image
          <input type="file" onChange={ProfileImage} className="hidden" />
        </label>
      </div>
    )
}
export default ImageUpload