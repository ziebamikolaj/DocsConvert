import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  content: string;
  filename: string;
  format: "html" | "xml" | "htl";
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  content,
  filename,
  format,
}) => {
  const handleDownload = () => {
    const blob = new Blob([content], { type: `text/${format}` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} className="mt-4">
      Download {format.toUpperCase()}
    </Button>
  );
};

export default DownloadButton;
