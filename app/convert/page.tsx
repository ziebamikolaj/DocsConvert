"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { ConversionSettings } from "./types/conversionSettings";
import type {
  AttributeRule,
  DeleteTagRule,
  IgnoreTagRule,
  TagConversion,
  TocEntry,
} from "./types/conversionTypes";
import TocBasedView from "@/components/TocBasedView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { apiFetchClient } from "@/lib/apiFetchClient";

import { ConversionOptions } from "./components/ConversionOptions";
import FilePreview from "./components/FilePreview";
import FileUpload from "./components/FileUpload";
import ConvertedContent from "./components/lib/ConvertedContent";
import CopyButton from "./components/lib/CopyButton";
import DownloadButton from "./components/lib/DownloadButton";
import OutputFormatSelector from "./components/OutputFormatSelector";

const acceptedFileTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.oasis.opendocument.text",
  "application/msword",
];

const Convert = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedContent, setConvertedContent] = useState<string>("");
  const { toast } = useToast();

  const [ignoreTags, setIgnoreTags] = useState<IgnoreTagRule[]>([]);
  const [deleteTags, setDeleteTags] = useState<DeleteTagRule[]>([]);
  const [tagConversions, setTagConversions] = useState<Array<TagConversion>>(
    [],
  );
  const [attributeRules, setAttributeRules] = useState<Array<AttributeRule>>(
    [],
  );
  const [presets, setPresets] = useState<
    Array<{ name: string; settings: ConversionSettings }>
  >([]);
  const [outputFormat, setOutputFormat] = useState<"html" | "xml" | "htl">(
    "xml",
  );
  const [autoCopy, setAutoCopy] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"single" | "toc">("single");
  const [tocEntries, setTocEntries] = useState<TocEntry[]>([]);

  const { data: userSettings } = useQuery({
    queryKey: ["userSettings"],
    queryFn: async () => {
      const response = await apiFetchClient("/api/users/me");
      return response.settings || {};
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: { [key: string]: any }) => {
      await apiFetchClient("/api/users/settings", {
        method: "PUT",
        body: JSON.stringify({ settings: newSettings }),
      });
    },
  });

  useEffect(() => {
    if (userSettings && "autoCopy" in userSettings) {
      setAutoCopy(userSettings.autoCopy);
    }
  }, [userSettings]);

  const conversionOptions = {
    ignoreTags,
    tagConversions,
    attributeRules,
    deleteTags,
  };

  const convertMutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("No file selected");

      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("options", JSON.stringify(conversionOptions));

        if (viewMode === "toc") {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/conversion/split-by-toc`,
            {
              method: "POST",
              body: formData,
            },
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to split document by TOC");
          }

          const { entries } = await response.json();
          setTocEntries(entries);
          return null;
        } else {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/conversion/to-${outputFormat}`,
            {
              method: "POST",
              body: formData,
            },
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Conversion failed");
          }

          const { content } = await response.json();
          setConvertedContent(content);
          return content;
        }
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (data) => {
      if (viewMode === "single" && data) {
        toast({
          title: "Conversion complete",
          description: `Your file has been successfully converted to ${outputFormat.toUpperCase()}.`,
        });
        if (autoCopy) {
          navigator.clipboard.writeText(data);
          toast({
            title: "Copied to clipboard",
            description:
              "The converted content has been automatically copied to your clipboard.",
          });
        }
      } else if (viewMode === "toc") {
        toast({
          title: "Document split complete",
          description:
            "Your document has been successfully split by Table of Contents.",
        });
      }
    },
    onError: (error) => {
      console.error("Conversion error:", error);
      toast({
        variant: "destructive",
        title: "Conversion failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during conversion. Please try again.",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileFromUser = e.target.files[0];
      if (!acceptedFileTypes.includes(fileFromUser.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF, Word, or OpenDocument file.",
        });
        return;
      }
      setFile(fileFromUser);
      toast({
        title: "File uploaded",
        description: "Your file has been successfully uploaded.",
      });
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    toast({
      title: "File removed",
      description: "The file has been removed.",
    });
  };

  const handleConvert = () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload a file first.",
      });
      return;
    }
    convertMutation.mutate();
  };

  const handleAutoCopyChange = (checked: boolean) => {
    setAutoCopy(checked);
    updateSettingsMutation.mutate({ ...userSettings, autoCopy: checked });
  };

  const savePreset = (name: string, settings: ConversionSettings) => {
    const updatedPresets = [...presets, { name, settings }];
    setPresets(updatedPresets);
    updateSettingsMutation.mutate({ ...userSettings, presets: updatedPresets });
  };

  const loadPreset = (name: string) => {
    const preset = presets.find((p) => p.name === name);
    if (preset) {
      setIgnoreTags(preset.settings.ignoreTags);
      setDeleteTags(preset.settings.deleteTags);
      setTagConversions(preset.settings.tagConversions);
      setAttributeRules(preset.settings.attributeRules);
    }
  };

  useEffect(() => {
    if (userSettings && userSettings.presets) {
      setPresets(userSettings.presets);
    }
  }, [userSettings]);
  const [currentPreset, setCurrentPreset] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-primary">
          File Converter
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-xl transition-all duration-300 hover:shadow-2xl">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-center text-2xl font-bold">
                Upload & Convert
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <FileUpload
                handleFileChange={handleFileChange}
                acceptedFileTypes={acceptedFileTypes}
              />
              {file && (
                <FilePreview file={file} handleRemoveFile={handleRemoveFile} />
              )}
              <OutputFormatSelector
                outputFormat={outputFormat}
                setOutputFormat={setOutputFormat}
              />
              <div className="mb-4 flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="single"
                    checked={viewMode === "single"}
                    onChange={(e) =>
                      setViewMode(e.target.value as "single" | "toc")
                    }
                  />
                  Single Document
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="toc"
                    checked={viewMode === "toc"}
                    onChange={(e) =>
                      setViewMode(e.target.value as "single" | "toc")
                    }
                  />
                  Split by Table of Contents
                </label>
              </div>
              <Button
                onClick={handleConvert}
                disabled={!file || isLoading}
                className="w-full text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                {isLoading ? "Converting..." : "Convert File"}
              </Button>
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-copy"
                  checked={autoCopy}
                  onCheckedChange={handleAutoCopyChange}
                />
                <Label htmlFor="auto-copy">Auto-copy result</Label>
              </div>
            </CardContent>
          </Card>

          <ConversionOptions
            deleteTags={deleteTags}
            setDeleteTags={setDeleteTags}
            ignoreTags={ignoreTags}
            setIgnoreTags={setIgnoreTags}
            tagConversions={tagConversions}
            setTagConversions={setTagConversions}
            attributeRules={attributeRules}
            setAttributeRules={setAttributeRules}
            presets={presets}
            setPresets={setPresets}
            savePreset={savePreset}
            loadPreset={loadPreset}
            currentPreset={currentPreset}
            setCurrentPreset={setCurrentPreset}
          />
        </div>

        {viewMode === "toc" && tocEntries.length > 0 ? (
          <TocBasedView entries={tocEntries} />
        ) : (
          convertedContent && (
            <div className="mt-8">
              <div className="flex w-full flex-wrap space-x-4">
                <DownloadButton
                  content={convertedContent}
                  filename={
                    file
                      ? file.name.split(".").slice(0, -1).join(".")
                      : "converted"
                  }
                  format={outputFormat}
                />
                <CopyButton content={convertedContent} format={outputFormat} />
              </div>
              <ConvertedContent
                content={convertedContent}
                format={outputFormat}
              />
            </div>
          )
        )}

        {convertMutation.isError && (
          <div className="mt-4 text-red-500">
            {convertMutation.error instanceof Error
              ? convertMutation.error.message
              : "An error occurred during conversion. Please try again."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Convert;
