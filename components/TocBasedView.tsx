import React, { useState } from "react";
import { saveAs } from "file-saver";
import DOMPurify from "isomorphic-dompurify";
import JSZip from "jszip";

import ConvertedContent from "@/app/convert/components/lib/ConvertedContent";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

interface TocEntry {
  title: string;
  level: number;
  content: string;
  id: string;
  format?: "html" | "xml" | "htl";
}

interface TocBasedViewProps {
  entries: TocEntry[];
}

export const TocBasedView: React.FC<TocBasedViewProps> = ({ entries }) => {
  const [activeTab, setActiveTab] = useState(entries[0]?.id);
  const [selectedFormat, setSelectedFormat] = useState<
    "html" | "xml" | "dita" | "txt"
  >("html");

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Content copied",
      description: "The section content has been copied to your clipboard.",
    });
  };

  const getSafeFileName = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  };

  const getFormattedContent = (
    content: string,
    format: "html" | "xml" | "dita" | "txt",
    title: string,
  ) => {
    switch (format) {
      case "html":
        return content;
      case "xml":
        return `<?xml version="1.0" encoding="UTF-8"?>\n<section>\n${content}\n</section>`;
      case "dita":
        return `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD DITA Topic//EN" "topic.dtd">\n<topic id="topic_${Math.random().toString(36).substr(2, 9)}">\n<title>${title}</title>\n<body>\n${content}\n</body>\n</topic>`;
      case "txt":
        return content.replace(/<[^>]+>/g, "");
      default:
        return content;
    }
  };

  const handleDownload = (entry: TocEntry) => {
    const content = getFormattedContent(
      entry.content,
      selectedFormat,
      entry.title,
    );
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${getSafeFileName(entry.title)}.${selectedFormat}`);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();

    entries.forEach((entry) => {
      const content = getFormattedContent(
        entry.content,
        selectedFormat,
        entry.title,
      );
      zip.file(`${getSafeFileName(entry.title)}.${selectedFormat}`, content);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `document-sections.zip`);

    toast({
      title: "Download started",
      description: "All sections are being downloaded as a zip file.",
    });
  };

  const renderTocSidebar = () => {
    return (
      <div className="w-64 border-r p-4">
        <h2 className="mb-4 text-lg font-semibold">Table of Contents</h2>
        <div className="mb-4">
          <Select
            value={selectedFormat}
            onValueChange={(value: "html" | "xml" | "dita" | "txt") =>
              setSelectedFormat(value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
              <SelectItem value="dita">DITA</SelectItem>
              <SelectItem value="txt">TXT</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleDownloadAll}
            className="mt-2 w-full"
            variant="outline"
          >
            Download All
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-1">
            {entries.map((entry, index) => (
              <Button
                key={`${entry.id}-${index}`}
                variant={activeTab === entry.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  entry.level > 0 ? `ml-${entry.level * 4}` : ""
                }`}
                onClick={() => setActiveTab(entry.id)}
              >
                {entry.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="hidden">
            {entries.map((entry, index) => (
              <TabsTrigger key={`tab-${entry.id}-${index}`} value={entry.id}>
                {entry.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {entries.map((entry, index) => (
            <TabsContent
              key={`content-${entry.id}-${index}`}
              value={entry.id}
              className="mt-0"
            >
              <div className="prose dark:prose-invert max-w-none">
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="m-0 text-2xl font-bold">{entry.title}</h1>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(entry.content)}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(entry)}
                    >
                      Download
                    </Button>
                  </div>
                </div>
                <div className="h-[calc(100vh-12rem)] overflow-auto">
                  <ConvertedContent
                    content={entry.content}
                    format={entry.format || "htl"}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  };

  if (!entries || entries.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-gray-500">No content sections found</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {renderTocSidebar()}
      {renderContent()}
    </div>
  );
};

export default TocBasedView;
