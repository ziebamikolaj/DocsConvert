import { Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  acceptedFileTypes: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  handleFileChange,
  acceptedFileTypes,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Input
        type="file"
        id="file"
        className="hidden"
        onChange={handleFileChange}
        accept={acceptedFileTypes.join(",")}
      />
      <Label
        htmlFor="file"
        className="cursor-pointer rounded-full bg-primary p-6 text-primary-foreground transition duration-300 hover:bg-primary/90 hover:shadow-md"
      >
        <Upload className="size-12" />
      </Label>
      <span className="mt-4 text-sm text-muted-foreground">
        Upload a PDF, Word, or OpenDocument file
      </span>
    </div>
  );
};

export default FileUpload;
