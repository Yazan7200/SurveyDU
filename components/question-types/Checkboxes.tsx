"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface CheckboxOption {
  id: number;
  text: string;
  checked: boolean;
}

export default function Checkboxes() {
  const [options, setOptions] = useState<CheckboxOption[]>([
    { id: 1, text: "", checked: false },
    { id: 2, text: "", checked: false },
  ]);

  const addOption = () => {
    const newId = options.length + 1;
    setOptions([...options, { id: newId, text: "", checked: false }]);
  };

  const removeOption = (idToRemove: number) => {
    if (options.length <= 2) return; // Maintain minimum 2 options
    setOptions(options.filter(({ id }) => id !== idToRemove));
  };

  const updateOptionText = (id: number, text: string) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, text } : option
      )
    );
  };

  const toggleOption = (id: number, checked: boolean) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, checked } : option
      )
    );
  };

  return (
    <div>
      <div className="space-y-3">
        {options.map(({ id, text, checked }) => (
          <div key={id} className="flex items-center space-x-2">
            <Checkbox
              id={`option-${id}`}
              checked={checked}
              onCheckedChange={(checked) => toggleOption(id, checked as boolean)}
            />
            <div className="flex-1 flex items-center space-x-2">
              <Input
                type="text"
                placeholder={`Option ${id}`}
                value={text}
                onChange={(e) => updateOptionText(id, e.target.value)}
                className="flex-1"
              />
              {options.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        className="mt-4"
        onClick={addOption}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Option
      </Button>
    </div>
  );
} 