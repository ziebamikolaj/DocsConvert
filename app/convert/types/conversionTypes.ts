import type { ConversionSettings } from "./conversionSettings";

export interface ConversionOptionsProps {
  deleteTags: DeleteTagRule[];
  setDeleteTags: (deleteTags: DeleteTagRule[]) => void;
  ignoreTags: IgnoreTagRule[];
  setIgnoreTags: (ignoreTags: IgnoreTagRule[]) => void;
  tagConversions: TagConversion[];
  setTagConversions: (tagConversions: TagConversion[]) => void;
  attributeRules: AttributeRule[];
  setAttributeRules: (attributeRules: AttributeRule[]) => void;
  presets: Array<{ name: string; settings: ConversionSettings }>;
  setPresets: React.Dispatch<
    React.SetStateAction<Array<{ name: string; settings: ConversionSettings }>>
  >;
  savePreset: (name: string, settings: ConversionSettings) => void;
  loadPreset: (name: string) => void;
  currentPreset: string;
  setCurrentPreset: React.Dispatch<React.SetStateAction<string>>;
}

export interface PresetsSectionProps {
  presets: Array<{ name: string; settings: ConversionSettings }>;
  setPresets: React.Dispatch<
    React.SetStateAction<Array<{ name: string; settings: ConversionSettings }>>
  >;
  currentPreset: string;
  setCurrentPreset: React.Dispatch<React.SetStateAction<string>>;
  ignoreTags: IgnoreTagRule[];
  tagConversions: TagConversion[];
  attributeRules: AttributeRule[];
  deleteTags: DeleteTagRule[];
  setIgnoreTags: (ignoreTags: IgnoreTagRule[]) => void;
  setTagConversions: (tagConversions: TagConversion[]) => void;
  setAttributeRules: (attributeRules: AttributeRule[]) => void;
  setDeleteTags: (deleteTags: DeleteTagRule[]) => void;
}

export interface IgnoreTagsSectionProps {
  ignoreTags: IgnoreTagRule[];
  setIgnoreTags: (ignoreTags: IgnoreTagRule[]) => void;
  errors?: { [key: number]: string };
  validateAndSetErrors?: (field: string, value: any) => void;
}

export interface DeleteTagsSectionProps {
  deleteTags: DeleteTagRule[];
  setDeleteTags: (deleteTags: DeleteTagRule[]) => void;
  errors?: { [key: number]: string };
  validateAndSetErrors?: (field: string, value: any) => void;
}

export interface TagConversionsSectionProps {
  tagConversions: TagConversion[];
  setTagConversions: (tagConversions: TagConversion[]) => void;
  errors?: { [key: number]: string };
  validateAndSetErrors?: (field: string, value: any) => void;
}

export interface AttributeRulesSectionProps {
  attributeRules: AttributeRule[];
  setAttributeRules: (attributeRules: AttributeRule[]) => void;
  errors?: { [key: number]: string };
  validateAndSetErrors?: (field: string, value: any) => void;
}

export interface Condition {
  property: string;
  operator:
    | "contains"
    | "startsWith"
    | "endsWith"
    | "equals"
    | "matches"
    | "isParentOf"
    | "isChildOf"
    | "isEmptyInside"
    | "isNotEmptyInside";
  value: string;
}

export interface Rule {
  conditions: Condition[];
  logic: "AND" | "OR";
}

export interface TagConversion {
  from: string;
  to: string;
  rule?: Rule;
}

export interface AttributeRule {
  tag: string;
  attribute: string;
  value: string;
  rule?: Rule;
}

export interface IgnoreTagRule {
  tag: string;
  rule?: Rule;
}

export interface DeleteTagRule {
  tag: string;
  rule?: Rule;
}

export interface TocEntry {
  title: string;
  level: number;
  content: string;
  id: string;
}
