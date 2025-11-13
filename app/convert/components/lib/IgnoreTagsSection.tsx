import React, { useState } from "react";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ConditionBuilder from "./ConditionBuilder";
import type { IgnoreTagsSectionProps, IgnoreTagRule } from "@/app/convert/types/conversionTypes";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./Droppable";

const IgnoreTagsSection: React.FC<IgnoreTagsSectionProps> = ({
  ignoreTags,
  setIgnoreTags,
  errors,
  validateAndSetErrors,
}) => {
  const [expandedTags, setExpandedTags] = useState<number[]>([]);

  const addIgnoreTag = () => {
    const newIgnoreTags = [...ignoreTags, { tag: "", rule: { conditions: [], logic: "AND" } }];
    setIgnoreTags(newIgnoreTags as IgnoreTagRule[]);
    if (validateAndSetErrors) {
      validateAndSetErrors("ignoreTags", newIgnoreTags);
    }
  };

  const updateIgnoreTag = (index: number, field: keyof IgnoreTagRule, value: any) => {
    const newIgnoreTags = ignoreTags.map((rule, i) =>
      i === index ? { ...rule, [field]: value } : rule
    );
    setIgnoreTags(newIgnoreTags);
    if (validateAndSetErrors) {
      validateAndSetErrors("ignoreTags", newIgnoreTags);
    }
  };

  const removeIgnoreTag = (index: number) => {
    const newIgnoreTags = ignoreTags.filter((_, i) => i !== index);
    setIgnoreTags(newIgnoreTags);
    if (validateAndSetErrors) {
      validateAndSetErrors("ignoreTags", newIgnoreTags);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newIgnoreTags = Array.from(ignoreTags);
    const [reorderedItem] = newIgnoreTags.splice(result.source.index, 1);
    newIgnoreTags.splice(result.destination.index, 0, reorderedItem as IgnoreTagRule);

    setIgnoreTags(newIgnoreTags);
    if (validateAndSetErrors) {
      validateAndSetErrors("ignoreTags", newIgnoreTags);
    }
  };

  const toggleTag = (index: number) => {
    setExpandedTags(expandedTags.includes(index)
      ? expandedTags.filter((i) => i !== index)
      : [...expandedTags, index]
    );
  };

  const getTagSummary = (rule: IgnoreTagRule) => {
    return rule.tag || "Not set";
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-4">
        <StrictModeDroppable droppableId="ignoreTags">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {ignoreTags.map((rule, index) => (
                <Draggable key={`ignoreTag-${index}`} draggableId={`ignoreTag-${index}`} index={index}>
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
                        <div className="ml-2 flex-grow cursor-pointer font-medium" onClick={() => toggleTag(index)}>
                          Ignore Tag {index + 1}: {getTagSummary(rule)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => toggleTag(index)}>
                            {expandedTags.includes(index) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => removeIgnoreTag(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {expandedTags.includes(index) && (
                        <div className="mt-2 space-y-2">
                          <Input
                            value={rule.tag}
                            onChange={(e) => updateIgnoreTag(index, "tag", e.target.value)}
                            placeholder="Tag"
                            className="flex-grow"
                          />
                          <ConditionBuilder
                            rule={rule.rule || { conditions: [], logic: "AND" }}
                            setRule={(newRule) => updateIgnoreTag(index, "rule", newRule)}
                          />
                          {errors && errors[index] && (
                            <p className="text-sm text-red-500">{errors[index]}</p>
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
        <Button onClick={addIgnoreTag} variant="outline" className="w-full">
          <Plus className="mr-2 size-4" /> Add Ignore Tag
        </Button>
      </div>
    </DragDropContext>
  );
};

export default IgnoreTagsSection;