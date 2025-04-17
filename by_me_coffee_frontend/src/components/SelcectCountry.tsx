import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCountry = ({
  onValueChange,
  defaultValue,
}: {
  onValueChange: (...event: string[]) => void;
  defaultValue: string;
}) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className="w-[460px]">
        <SelectValue placeholder="Select a Country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Country</SelectLabel>
          <SelectItem value="America">America</SelectItem>
          <SelectItem value="China">China</SelectItem>
          <SelectItem value="Russia">Russia</SelectItem>
          <SelectItem value="Thailand">Thailand</SelectItem>
          <SelectItem value="Mongolia">Mongolia</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectCountry;
