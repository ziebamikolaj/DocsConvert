import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight } from "lucide-react";
import type { Condition, Rule } from "@/app/convert/types/conversionTypes";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./Droppable";

interface ConditionBuilderProps {
  rule: Rule;
  setRule: (rule: Rule) => void;
}

const ConditionBuilder: React.FC<ConditionBuilderProps> = ({ rule, setRule }) => {
  const [expandedConditions, setExpandedConditions] = useState<number[]>([]);

  const addCondition = () => {
    const newCondition: Condition = { property: "", operator: "contains", value: "" };
    const newConditions = [...rule.conditions, newCondition];
    setRule({ ...rule,  conditions: newConditions });
    setExpandedConditions([...expandedConditions, newConditions.length - 1]);
  };

  const removeCondition = (index: number) => {
    setRule({
      ...rule,
      conditions: rule.conditions.filter((_, i) => i !== index),
    });
    setExpandedConditions(expandedConditions.filter(i => i !== index).map(i => i > index ? i - 1 : i));
  };

  const updateCondition = (index: number, field: keyof Condition, value: string) => {
    setRule({
      ...rule,
      conditions: rule.conditions.map((condition, i) =>
        i === index ? { ...condition, [field]: value } : condition
      ),
    });
  };

  const toggleCondition = (index: number) => {
    setExpandedConditions(
      expandedConditions.includes(index)
        ? expandedConditions.filter((i) => i !== index)
        : [...expandedConditions, index]
    );
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newConditions = Array.from(rule.conditions);
    const [reorderedItem] = newConditions.splice(result.source.index, 1);
    newConditions.splice(result.destination.index, 0, reorderedItem as Condition);

    setRule({ ...rule, conditions: newConditions });
  };

  const renderInputs = (condition: Condition, index: number) => {
    switch (condition.operator) {
      case "isEmptyInside":
      case "isNotEmptyInside":
        return null;
      case "isParentOf":
      case "isChildOf":
        return (
          <Input
            value={condition.value}
            onChange={(e) => updateCondition(index, "value", e.target.value)}
            placeholder="Value"
            className="flex-grow"
          />
        );
      default:
        return (
          <>
            <Input
              value={condition.property}
              onChange={(e) => updateCondition(index, "property", e.target.value)}
              placeholder="Property"
              className="flex-grow"
            />
            <Input
              value={condition.value}
              onChange={(e) => updateCondition(index, "value", e.target.value)}
              placeholder="Value"
              className="flex-grow"
            />
          </>
        );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="conditions">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {rule.conditions.map((condition, index) => (
              <Draggable key={`condition-${index}`} draggableId={`condition-${index}`} index={index}>
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
                      <div className="ml-2 flex-grow cursor-pointer font-medium" onClick={() => toggleCondition(index)}>
                        Condition {index + 1}: {condition.property} {condition.operator} {condition.value}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => toggleCondition(index)}>
                          {expandedConditions.includes(index) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => removeCondition(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {expandedConditions.includes(index) && (
                      <div className="mt-2 space-y-2">
                        <Select
                          value={condition.operator}
                          onValueChange={(value) => updateCondition(index, "operator", value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="startsWith">Starts with</SelectItem>
                            <SelectItem value="endsWith">Ends with</SelectItem>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="matches">Matches</SelectItem>
                            <SelectItem value="isParentOf">Is parent of</SelectItem>
                            <SelectItem value="isChildOf">Is child of</SelectItem>
                            <SelectItem value="isEmptyInside">Is empty inside</SelectItem>
                            <SelectItem value="isNotEmptyInside">Is not empty inside</SelectItem>
                          </SelectContent>
                        </Select>
                        {renderInputs(condition, index)}
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
      <Button onClick={addCondition} variant="outline" className="w-full mt-2">
        <Plus className="mr-2 h-4 w-4" /> Add Condition
      </Button>
    </DragDropContext>
  );
};

export default ConditionBuilder;