import type {
  AttributeRule,
  AttributeRulesSectionProps,
  Rule,
} from "@/app/convert/types/conversionTypes";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Info,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ConditionBuilder from "./ConditionBuilder";
import { StrictModeDroppable } from "./Droppable";

const AttributeRulesSection = ({
  attributeRules,
  setAttributeRules,
  errors,
  validateAndSetErrors,
}: AttributeRulesSectionProps) => {
  const [expandedRules, setExpandedRules] = useState<number[]>([]);

  const addAttributeRule = () => {
    const newIndex = attributeRules.length;
    const newAttributeRules = [
      ...attributeRules,
      {
        tag: "",
        attribute: "",
        value: "",
        rule: { conditions: [], logic: "AND" } as Rule,
      },
    ];
    setAttributeRules(newAttributeRules);
    if (validateAndSetErrors) {
      validateAndSetErrors("attributeRules", newAttributeRules);
    }
    setExpandedRules([newIndex]);
  };

  const removeAttributeRule = (index: number) => {
    const newAttributeRules = attributeRules.filter((_, i) => i !== index);
    setAttributeRules(newAttributeRules);
    if (validateAndSetErrors) {
      validateAndSetErrors("attributeRules", newAttributeRules);
    }
    setExpandedRules(expandedRules.filter((i) => i !== index));
  };

  const updateAttributeRule = (
    index: number,
    field: keyof AttributeRule,
    value: any,
  ) => {
    const newAttributeRules = attributeRules.map((rule, i) =>
      i === index ? { ...rule, [field]: value } : rule,
    );
    setAttributeRules(newAttributeRules);
    if (validateAndSetErrors) {
      validateAndSetErrors("attributeRules", newAttributeRules);
    }
  };

  const toggleRule = (index: number) => {
    setExpandedRules(
      expandedRules.includes(index)
        ? expandedRules.filter((i) => i !== index)
        : [...expandedRules, index],
    );
  };

  const getRuleSummary = (rule: AttributeRule) => {
    if (!rule.tag || !rule.attribute) {
      return "Not set";
    }
    return `${rule.tag} - ${rule.attribute}${rule.value ? ` = ${rule.value}` : ""}`;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(attributeRules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem as AttributeRule);

    setAttributeRules(items);
    if (validateAndSetErrors) { 
      validateAndSetErrors("attributeRules", items);
    }
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="attribute-rules-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {attributeRules.map((rule, index) => (
                <Draggable
                  key={`attribute-rule-${index}`}
                  draggableId={`attribute-rule-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-2 rounded border bg-secondary/20 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-move"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div
                          className="ml-2 flex-grow cursor-pointer font-medium"
                          onClick={() => toggleRule(index)}
                        >
                          Rule {index + 1}: {getRuleSummary(rule)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRule(index)}
                          >
                            {expandedRules.includes(index) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttributeRule(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {expandedRules.includes(index) && (
                        <div className="mt-2 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              className="col-span-2"
                              value={rule.tag}
                              onChange={(e) =>
                                updateAttributeRule(
                                  index,
                                  "tag",
                                  e.target.value,
                                )
                              }
                              placeholder="Tag"
                            />
                            <Input
                              value={rule.attribute}
                              onChange={(e) =>
                                updateAttributeRule(
                                  index,
                                  "attribute",
                                  e.target.value,
                                )
                              }
                              placeholder="Attribute"
                            />
                            <Input
                              value={rule.value}
                              onChange={(e) =>
                                updateAttributeRule(
                                  index,
                                  "value",
                                  e.target.value,
                                )
                              }
                              placeholder="Value"
                            />
                          </div>
                          <ConditionBuilder
                            rule={rule.rule || { conditions: [], logic: "AND" }}
                            setRule={(newRule) =>
                              updateAttributeRule(index, "rule", newRule)
                            }
                          />
                          {errors && errors[index] && (
                            <p className="text-sm text-red-500">
                              {errors[index]}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      <Button onClick={addAttributeRule} variant="outline" className="w-full">
        <Plus className="mr-2 size-4" /> Add Attribute Rule
      </Button>
    </div>
  );
};

export default AttributeRulesSection;
