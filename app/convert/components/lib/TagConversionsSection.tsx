import type {
  TagConversion,
  TagConversionsSectionProps,
} from "@/app/convert/types/conversionTypes";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Info,
  Plus,
  Trash2,
} from "lucide-react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ConditionBuilder from "./ConditionBuilder";
import { StrictModeDroppable } from "./Droppable";

const TagConversionsSection = ({
  tagConversions,
  setTagConversions,
  errors,
  validateAndSetErrors,
}: TagConversionsSectionProps) => {
  const [expandedConversions, setExpandedConversions] = useState<number[]>([]);

  const addTagConversion = () => {
    const newIndex = tagConversions.length;
    const newTagConversions = [
      ...tagConversions,
      {
        from: "",
        to: "",
        rule: {
          conditions: [],
          logic: "AND",
        },
      } as TagConversion,
    ];
    setTagConversions(newTagConversions);
    if (validateAndSetErrors) {
      validateAndSetErrors("tagConversions", newTagConversions);
    }
    setExpandedConversions([newIndex]);
  };

  const removeTagConversion = (index: number) => {
    const newTagConversions = tagConversions.filter((_, i) => i !== index);
    setTagConversions(newTagConversions);
    if (validateAndSetErrors) {
      validateAndSetErrors("tagConversions", newTagConversions);
    }
    setExpandedConversions(expandedConversions.filter((i) => i !== index));
  };

  const updateTagConversion = (
    index: number,
    field: keyof TagConversion,
    value: any,
  ) => {
    const newTagConversions = tagConversions.map((conversion, i) =>
      i === index ? { ...conversion, [field]: value } : conversion,
    );
    setTagConversions(newTagConversions); 
    if (validateAndSetErrors) {
      validateAndSetErrors("tagConversions", newTagConversions);
    }
  };

  const toggleConversion = (index: number) => {
    setExpandedConversions(
      expandedConversions.includes(index)
        ? expandedConversions.filter((i) => i !== index)
        : [...expandedConversions, index],
    );
  };

  const getConversionSummary = (conversion: TagConversion) => {
    if (!conversion.from || !conversion.to) {
      return "Not set";
    }
    return `${conversion.from} → ${conversion.to}`;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(tagConversions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem as TagConversion);

    setTagConversions(items);
    if (validateAndSetErrors) {
      validateAndSetErrors("tagConversions", items);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-4">
        <StrictModeDroppable droppableId="tag-conversions-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tagConversions.map((conversion, index) => (
                <Draggable
                  key={`tag-conversion-${index}`}
                  draggableId={`tag-conversion-${index}`}
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
                          onClick={() => toggleConversion(index)}
                        >
                          Conversion {index + 1}:{" "}
                          {getConversionSummary(conversion)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleConversion(index)}
                          >
                            {expandedConversions.includes(index) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTagConversion(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {expandedConversions.includes(index) && (
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Input
                              value={conversion.from}
                              onChange={(e) =>
                                updateTagConversion(
                                  index,
                                  "from",
                                  e.target.value,
                                )
                              }
                              placeholder="From tag"
                            />
                            <Input
                              value={conversion.to}
                              onChange={(e) =>
                                updateTagConversion(index, "to", e.target.value)
                              }
                              placeholder="To tag"
                            />
                          </div>
                          <ConditionBuilder
                            rule={
                              conversion.rule || {
                                conditions: [],
                                logic: "AND",
                              }
                            }
                            setRule={(newRule) => {
                              updateTagConversion(index, "rule", newRule);
                            }}
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
        <Button onClick={addTagConversion} variant="outline" className="w-full">
          <Plus className="mr-2 size-4" /> Add Tag Conversion
        </Button>
      </div>
    </DragDropContext>
  );
};

export default TagConversionsSection;
