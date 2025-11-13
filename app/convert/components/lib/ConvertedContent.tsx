import { useEffect, useState } from "react";
import * as prettier from "prettier";
import * as htmlParser from "prettier/parser-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ConvertedContentProps {
  content: string;
  format: "html" | "xml" | "htl";
}

const ConvertedContent: React.FC<ConvertedContentProps> = ({
  content,
  format,
}) => {
  const language = format === "html" ? "html" : "mdx";
  const [formattedContent, setFormattedContent] = useState<string>(content);

  useEffect(() => {
    const formatContent = async () => {
      try {
        const formatted = await prettier.format(content, {
          plugins: [htmlParser],
          parser: "html",
          printWidth: 150,
        });

        setFormattedContent(formatted);
      } catch (error) {
        console.error("Error formatting content:", error);
        setFormattedContent(content);
      }
    };

    formatContent();
  }, [content, language]);

  return (
    <div className="mt-4">
      <h3 className="mb-2 text-lg font-semibold">Converted Content:</h3>
      <SyntaxHighlighter
        showLineNumbers={true}
        wrapLongLines={true}
        language={"html"}
        style={vscDarkPlus}
        className="rounded-md"
      >
        {formattedContent}
      </SyntaxHighlighter>
    </div>
  );
};

export default ConvertedContent;
