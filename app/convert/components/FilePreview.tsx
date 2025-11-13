import byteSize from "byte-size";
import { File, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FilePreviewProps {
  file: File;
  handleRemoveFile: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  handleRemoveFile,
}) => {
  return (
    <Card className="bg-secondary/30">
      <CardContent className="flex items-center justify-between py-4">
        <div className="flex items-center">
          <File className="mr-3 size-8 text-primary" />
          <div>
            <p className="max-w-[200px] truncate text-sm font-medium">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {byteSize(file.size).toString()}
            </p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                <Trash2 className="size-5 text-destructive" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove file</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default FilePreview;
