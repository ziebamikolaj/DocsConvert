import type { ConversionSettings } from "@/app/convert/types/conversionSettings";
import type { PresetsSectionProps } from "@/app/convert/types/conversionTypes";
import React, { useState } from "react";
import { Info, ChevronDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PresetsSection extends PresetsSectionProps {
  savePreset: (name: string, settings: ConversionSettings) => void;
  loadPreset: (name: string) => void;
}

const PresetsSection = ({
  presets,
  currentPreset,
  ignoreTags,
  tagConversions,
  attributeRules,
  deleteTags,
  setPresets,
  setCurrentPreset,
  setIgnoreTags,
  setTagConversions,
  setAttributeRules,
  setDeleteTags,
  savePreset,
  loadPreset,
}: PresetsSection) => {
  const [isPresetListOpen, setIsPresetListOpen] = useState(false);

  const handleSavePreset = () => {
    if (currentPreset.trim() === "") return;
    const newPreset = {
      name: currentPreset,
      settings: {
        ignoreTags,
        tagConversions,
        attributeRules,
        deleteTags,
      } as ConversionSettings,
    };
    savePreset(newPreset.name, newPreset.settings);
    setCurrentPreset("");
  };

  const handleLoadPreset = (name: string) => {
    loadPreset(name);
  };

  const exportSettings = () => {
    const settings = { ignoreTags, tagConversions, attributeRules, deleteTags };
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "conversion_settings.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target?.result as string);
          setIgnoreTags(settings.ignoreTags);
          setTagConversions(settings.tagConversions);
          setAttributeRules(settings.attributeRules);
          setDeleteTags(settings.deleteTags);
        } catch (error) {
          console.error("Error parsing settings file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="flex items-center text-lg font-semibold">
        Presets
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="ml-2 size-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Save, load, export, and import conversion settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      <div className="flex flex-col space-y-2">
        <Input
          value={currentPreset}
          onChange={(e) => setCurrentPreset(e.target.value)}
          placeholder="Preset name"
        />
        <div className="flex space-x-2">
          <Button onClick={handleSavePreset} variant="outline" className="flex-1">
            Save Preset
          </Button>
          <Button onClick={exportSettings} variant="outline" className="flex-1">
            Export Settings
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Input type="file" accept=".json" onChange={importSettings} />
        </div>
      </div>
      <Collapsible open={isPresetListOpen} onOpenChange={setIsPresetListOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Saved Presets
            {isPresetListOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset, index) => (
              <Button
                key={index}
                onClick={() => handleLoadPreset(preset.name)}
                variant="outline"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default PresetsSection;
