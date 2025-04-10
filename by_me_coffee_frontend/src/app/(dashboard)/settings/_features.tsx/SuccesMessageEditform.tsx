import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profileSchema } from "@/schema/zodSchema";
import { putSuccess } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'react-toastify';
export default function SuccessEdit() {
      const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            successMessage: "",
        },
      });
      const updatedSucess = async (value: z.infer<typeof profileSchema>) => {
          try {
            console.log(value);
      
              const res = await putSuccess(value)
              console.log(res);
          } catch (error) {
            console.log(error);
          }
        };
        const notify = () => toast("Success Message");
  return (
    <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(updatedSucess)}>
      <div className="flex p-6 flex-col gap-[24px] border rounded-xl mt-[20px]">
        <p className="font-bold text-base">Success page</p>
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[8px]">
            <Label className="font-semibold text-sm">
              Confirmation message
            </Label>
            <Input
              className="flex h-[40px] px-3 py-10 items-center "
              placeholder="Enter message"
            />
          </div>
        </div>
        <Button className="flex h-[40px] px-4 py-4 items-center justify-center gap-[8px]" onClick={()=> notify}>
          Save Changes
        </Button>
      </div>
      </form>
    </FormProvider>
  );
}
