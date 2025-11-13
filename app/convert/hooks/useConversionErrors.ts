"use client";

import type { Condition, Rule } from "@/app/convert/types/conversionTypes";
import { useState } from "react";
import type { AttributeRule, IgnoreTagRule, DeleteTagRule } from "@/app/convert/types/conversionTypes";

interface ConversionErrors {
  ignoreTags: { [key: number]: string };
  deleteTags: { [key: number]: string };
  tagConversions: { [key: number]: string };
  attributeRules: { [key: number]: string };
}

export function useConversionErrors() {
  const [errors, setErrors] = useState<ConversionErrors>({
    ignoreTags: {},
    deleteTags: {},
    tagConversions: {},
    attributeRules: {},
  });

  const validateAndSetErrors = (field: string, value: any) => {
    let newErrors: any = {};
  
    if (field === "ignoreTags") {
      newErrors.ignoreTags = value.reduce((acc: { [key: number]: string }, rule: IgnoreTagRule, index: number) => {
        const error = validateIgnoreTagRule(rule);
        if (error) acc[index] = error;
        return acc;
      }, {});
    } else if (field === "deleteTags") {
      newErrors.deleteTags = value.reduce((acc: { [key: number]: string }, rule: DeleteTagRule, index: number) => {
        const error = validateDeleteTagRule(rule);
        if (error) acc[index] = error;
        return acc;
      }, {});
    } else if (field === "tagConversions") {
      newErrors.tagConversions = value.reduce((acc: { [key: number]: string }, conversion: { from: string, to: string }, index: number) => {
        const error = validateTagConversion(conversion.from, conversion.to);
        if (error) acc[index] = error;
        return acc;
      }, {});
    } else if (field === "attributeRules") {
      newErrors.attributeRules = value.reduce((acc: { [key: number]: string }, rule: AttributeRule, index: number) => {
        const error = validateAttributeRule(rule.tag, rule.attribute, rule.value);  
        if (error) acc[index] = error;
        return acc;
      }, {});
    }
  
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  const validateIgnoreTag = (tag: string): string => {
    if (tag.trim() === "") {
      return "Tag must be specified\t";
    }
    if (tag.includes(" ")) {
      return "Tag cannot contain spaces\t";
    }
    return "";
  };

  const validateTagConversion = (from: string, to: string): string => {
    return from.trim() !== "" && to.trim() !== ""
      ? ""
      : 'Both "from" and "to" tags must be specified';
  };

  const validateAttributeRule = (
    tag: string,
    attribute: string,
    value: string,
  ): string => {
    if (attribute === undefined || value === undefined) {
      return "Attribute and Value must be specified";
    }
    if (tag.trim() === "") {
      return "Tag must be specified";
    }
    if (attribute.trim() === "" || value.trim() === "") {
      return "'Attribute' and 'Value' must be specified";
    }
    return "";
  };

  const validateCondition = (condition: Condition): string => {
    if (condition.property.trim() === "") {
      return "Property must be specified";
    }
    if (condition.operator.trim() === "") {
      return "Operator must be specified";
    }
    if (condition.value.trim() === "") {
      return "Value must be specified";
    }
    return "";
  };

  const validateRule = (rule: Rule): string => {
    if (!rule.conditions || rule.conditions.length === 0) {
      return "At least one condition must be specified";
    }
    if (rule.conditions.length > 1 && !rule.logic) {
      return "Logic (AND/OR) must be specified for multiple conditions";
    }
    return "";
  };

  const validateIgnoreTagRule = (rule: IgnoreTagRule): string => {
    if (rule.tag.trim() === "") {
      return "Tag must be specified";
    }
    if (rule.rule && rule.rule.conditions.length > 0) {
      return validateRule(rule.rule);
    }
    return "";
  };
  
  const validateDeleteTagRule = (rule: DeleteTagRule): string => {
    if (rule.tag.trim() === "") {
      return "Tag must be specified";
    }
    if (rule.rule && rule.rule.conditions.length > 0) {
      return validateRule(rule.rule);
    }
    return "";
  };
  return { errors, validateAndSetErrors };
};
