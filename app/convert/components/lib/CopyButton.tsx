import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  content: string;
  format: "html" | "xml" | "htl";
}

const CopyButton: React.FC<CopyButtonProps> = ({ content, format }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Button onClick={handleCopy} className="mt-4">
      Copy {format.toUpperCase()}
    </Button>
  );
};

export default CopyButton;
