import type { AttributeRule, TagConversion, IgnoreTagRule, DeleteTagRule } from "./conversionTypes";

export interface ConversionSettings {
  ignoreTags: Array<IgnoreTagRule>;
  tagConversions: Array<TagConversion>;
  attributeRules: Array<AttributeRule>;
  deleteTags: Array<DeleteTagRule>;
}
