import React from "react";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ConditionBuilder from "./ConditionBuilder";
import type { DeleteTagsSectionProps, DeleteTagRule } from "@/app/convert/types/conversionTypes";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./Droppable";
import { useState } from "react";

const DeleteTagsSection: React.FC<DeleteTagsSectionProps> = ({
  deleteTags,
  setDeleteTags,
  errors,
  validateAndSetErrors,
}) => {
  const [expandedTags, setExpandedTags] = useState<number[]>([]);

  const addDeleteTag = () => {
    const newDeleteTags = [...deleteTags, { tag: "", rule: { conditions: [], logic: "AND" } }];
    setDeleteTags(newDeleteTags as DeleteTagRule[]);
    if (validateAndSetErrors) {
      validateAndSetErrors("deleteTags", newDeleteTags);
    }
  };

  const updateDeleteTag = (index: number, field: keyof DeleteTagRule, value: any) => {
    const newDeleteTags = deleteTags.map((rule, i) =>
      i === index ? { ...rule, [field]: value } : rule
    );
    setDeleteTags(newDeleteTags);
    if (validateAndSetErrors) {
      validateAndSetErrors("deleteTags", newDeleteTags);
    }
  };

  const removeDeleteTag = (index: number) => {
    const newDeleteTags = deleteTags.filter((_, i) => i !== index);
    setDeleteTags(newDeleteTags);
    if (validateAndSetErrors) {
      validateAndSetErrors("deleteTags", newDeleteTags);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newDeleteTags = Array.from(deleteTags);
    const [reorderedItem] = newDeleteTags.splice(result.source.index, 1);
    newDeleteTags.splice(result.destination.index, 0, reorderedItem as DeleteTagRule);

    setDeleteTags(newDeleteTags);
    if (validateAndSetErrors) {
      validateAndSetErrors("deleteTags", newDeleteTags);
    }
  };

  const toggleTag = (index: number) => {
    setExpandedTags(expandedTags.includes(index)
      ? expandedTags.filter((i) => i !== index)
      : [...expandedTags, index]
    );
  };

  const getTagSummary = (rule: DeleteTagRule) => {
    return rule.tag || "Not set";
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-4">
        <StrictModeDroppable droppableId="deleteTags">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {deleteTags.map((rule, index) => (
                <Draggable key={`deleteTag-${index}`} draggableId={`deleteTag-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-2 rounded border bg-secondary/20 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div {...provided.dragHandleProps} className="cursor-move">
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="ml-2 flex-grow cursor-pointer font-medium" onClick={() => toggleTag(index)}>
                          Delete Tag {index + 1}: {getTagSummary(rule)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => toggleTag(index)}>
                            {expandedTags.includes(index) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => removeDeleteTag(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {expandedTags.includes(index) && (
                        <div className="mt-2 space-y-2">
                          <Input
                            value={rule.tag}
                            onChange={(e) => updateDeleteTag(index, "tag", e.target.value)}
                            placeholder="Tag"
                            className="flex-grow"
                          />
                          <ConditionBuilder
                            rule={rule.rule || { conditions: [], logic: "AND" }}
                            setRule={(newRule) => updateDeleteTag(index, "rule", newRule)}
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
        <Button onClick={addDeleteTag} variant="outline" className="w-full">
          <Plus className="mr-2 size-4" /> Add Delete Tag
        </Button>
      </div>
    </DragDropContext>
  );
};

export default DeleteTagsSection;