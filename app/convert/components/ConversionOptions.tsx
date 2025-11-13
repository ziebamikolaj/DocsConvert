import React, { useState } from "react";
import { useConversionErrors } from "@/app/convert/hooks/useConversionErrors";
import { Card, CardContent } from "@/components/ui/card";
import AttributeRulesSection from "./lib/AttributeRulesSection";
import DeleteTagsSection from "./lib/DeleteTagsSection";
import IgnoreTagsSection from "./lib/IgnoreTagsSection";
import PresetsSection from "./lib/PresetsSection";
import TagConversionsSection from "./lib/TagConversionsSection";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

import type { ConversionSettings } from "@/app/convert/types/conversionSettings";
import type { TagConversion, AttributeRule, IgnoreTagRule, DeleteTagRule } from "@/app/convert/types/conversionTypes";

interface ConversionOptionsProps {
  deleteTags: DeleteTagRule[];
  setDeleteTags: (deleteTags: DeleteTagRule[]) => void;
  ignoreTags: IgnoreTagRule[];
  setIgnoreTags: (ignoreTags: IgnoreTagRule[]) => void;
  tagConversions: TagConversion[];
  setTagConversions: (tagConversions: TagConversion[]) => void;
  attributeRules: AttributeRule[];
  setAttributeRules: (attributeRules: AttributeRule[]) => void;
  presets: Array<{ name: string; settings: ConversionSettings }>;
  setPresets: React.Dispatch<React.SetStateAction<Array<{ name: string; settings: ConversionSettings }>>>;
  savePreset: (name: string, settings: ConversionSettings) => void;
  loadPreset: (name: string) => void;
  currentPreset: string;
  setCurrentPreset: React.Dispatch<React.SetStateAction<string>>;
}

export const ConversionOptions: React.FC<ConversionOptionsProps> = ({
  deleteTags,
  setDeleteTags,
  ignoreTags,
  setIgnoreTags,
  tagConversions,
  setTagConversions,
  attributeRules,
  setAttributeRules,
  presets,
  setPresets,
  savePreset,
  loadPreset,
  currentPreset,
  setCurrentPreset,
}) => {
  const { errors, validateAndSetErrors } = useConversionErrors();
  const [openSections, setOpenSections] = useState<string[]>(["presets"]);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const renderCollapsibleSection = (title: string, content: React.ReactNode) => (
    <Collapsible open={openSections.includes(title.toLowerCase())} onOpenChange={() => toggleSection(title.toLowerCase())}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between py-6 text-lg font-semibold">
          {title}
          {openSections.includes(title.toLowerCase()) ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4">{content}</CollapsibleContent>
    </Collapsible>
  );

  return (
    <Card className="shadow-xl transition-all duration-300 hover:shadow-2xl">
      <CardContent className="space-y-6 p-6">
        <PresetsSection
          presets={presets}
          setPresets={setPresets}
          ignoreTags={ignoreTags}
          tagConversions={tagConversions}
          attributeRules={attributeRules}
          deleteTags={deleteTags}
          setIgnoreTags={setIgnoreTags}
          setTagConversions={setTagConversions}
          setAttributeRules={setAttributeRules}
          setDeleteTags={setDeleteTags}
          savePreset={savePreset}
          loadPreset={loadPreset}
          currentPreset={currentPreset}
          setCurrentPreset={setCurrentPreset}
        />
        {renderCollapsibleSection("Ignore Tags", 
          <IgnoreTagsSection
            ignoreTags={ignoreTags}
            setIgnoreTags={setIgnoreTags}
            errors={errors.ignoreTags}
            validateAndSetErrors={validateAndSetErrors}
          />
        )}
        {renderCollapsibleSection("Delete Tags", 
          <DeleteTagsSection
            deleteTags={deleteTags}
            setDeleteTags={setDeleteTags}
            errors={errors.deleteTags}
            validateAndSetErrors={validateAndSetErrors}
          />
        )}
        {renderCollapsibleSection("Tag Conversions", 
          <TagConversionsSection
            tagConversions={tagConversions}
            setTagConversions={setTagConversions}
            errors={errors.tagConversions}
            validateAndSetErrors={validateAndSetErrors}
          />
        )}
        {renderCollapsibleSection("Attribute Rules", 
          <AttributeRulesSection
            attributeRules={attributeRules}
            setAttributeRules={setAttributeRules}
            errors={errors.attributeRules}
            validateAndSetErrors={validateAndSetErrors}
          />
        )}
      </CardContent>
    </Card>
  );
};
