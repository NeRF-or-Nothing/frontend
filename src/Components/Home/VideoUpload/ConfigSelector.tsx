/**
 * @file ConfigSelector.tsx
 * @desc This component contains forms and buttons to select a training configuration.
 * This component functions as a child component to one that requires a training configuration.
 * Upon user input, this component will update the parent component with the new configuration.
 */

import React, { useState, useEffect } from "react";
import {
  Stack,
  Checkbox,
  Select,
  TextInput,
  NumberInput,
  Button,
  Group,
  Badge,
  Text,
} from "@mantine/core";
import {
  TrainingConfig,
  VALID_OUTPUT_TYPES,
  VALID_TRAINING_MODES,
  RECOMMENDED_CONFIG,
} from "../../../Types/TrainingConfig";

interface ConfigSelectorProps {
  onConfigChange: (config: TrainingConfig) => void;
}

const ConfigSelector: React.FC<ConfigSelectorProps> = ({ onConfigChange }) => {
  const [trainingMode, setTrainingMode] = useState<string>("gaussian");
  const [outputTypes, setOutputTypes] = useState<string[]>([]);
  const [saveIterations, setSaveIterations] = useState<number[]>([]);
  const [currentIteration, setCurrentIteration] = useState<number | "">();
  const [useRecommended, setUseRecommended] = useState(false);
  const [sceneName, setSceneName] = useState<string>("");

  useEffect(() => {
    updateConfig();
  }, [trainingMode, outputTypes, saveIterations, sceneName]);

  // Update parent component with new config
  const updateConfig = () => {
    onConfigChange({ trainingMode, outputTypes, saveIterations, sceneName });
  };

  // Disable all inputs when using recommended config
  const handleRecommendedChange = (checked: boolean) => {
    setUseRecommended(checked);
    if (checked) {
      setTrainingMode(RECOMMENDED_CONFIG.trainingMode);
      setOutputTypes(RECOMMENDED_CONFIG.outputTypes);
      setSaveIterations(RECOMMENDED_CONFIG.saveIterations);
    } else {
      setTrainingMode("gaussian");
      setOutputTypes([]);
      setSaveIterations([]);
    }
  };

  // Update training mode and reset output types
  const handleTrainingModeChange = (value: string) => {
    setTrainingMode(value);
    setOutputTypes([]);
  };

  // Toggle output types
  const handleOutputTypeChange = (value: string) => {
    setOutputTypes((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  // Add save iteration to list by enter key or button
  const handleSaveIterationAdd = () => {
    if (
      typeof currentIteration === "number" &&
      currentIteration >= 0 &&
      currentIteration <= 30000 &&
      !saveIterations.includes(currentIteration) &&
      saveIterations.length < 5
    ) {
      setSaveIterations((prev) =>
        [...prev, currentIteration].sort((a, b) => a - b)
      );
      setCurrentIteration("");
    }
  };

  const handleRemoveIteration = (iteration: number) => {
    setSaveIterations((prev) => prev.filter((i) => i !== iteration));
  };

  return (
    <Stack gap="md">
      <Checkbox
        label="Use recommended configuration"
        checked={useRecommended}
        onChange={(event) =>
          handleRecommendedChange(event.currentTarget.checked)
        }
      />
      <Select
        label="Training Mode"
        data={VALID_TRAINING_MODES}
        value={trainingMode}
        onChange={(value) => handleTrainingModeChange(value as string)}
        disabled={useRecommended}
      />
      <Stack gap="xs">
        <Text size="sm">Output Types</Text>
        {VALID_OUTPUT_TYPES[
          trainingMode as keyof typeof VALID_OUTPUT_TYPES
        ].map((type) => (
          <Checkbox
            key={type}
            label={type}
            checked={outputTypes.includes(type)}
            onChange={() => handleOutputTypeChange(type)}
            disabled={useRecommended}
          />
        ))}
      </Stack>

      <Stack gap="xs">
        <Text size="sm">Save Iterations (up to 5, between 0-30000)</Text>
        <Group align="flex-end">
          <NumberInput
            value={currentIteration}
            onChange={(value) => setCurrentIteration(Number(value))}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSaveIterationAdd();
              }
            }}
            min={0}
            max={30000}
            disabled={useRecommended}
            style={{ flexGrow: 1 }}
          />
          <Button onClick={handleSaveIterationAdd} disabled={useRecommended}>
            Add
          </Button>
        </Group>
        <Group gap="xs">
          {saveIterations.map((iteration) => (
            <Badge
              key={iteration}
              size="lg"
              variant="filled"
              styles={{
                root: { cursor: useRecommended ? "default" : "pointer" },
              }}
              rightSection={
                !useRecommended ? (
                  <Text
                    size="xs"
                    onClick={() => handleRemoveIteration(iteration)}
                  >
                    &times;
                  </Text>
                ) : null
              }
            >
              {iteration}
            </Badge>
          ))}
        </Group>
      </Stack>
      <TextInput
        label="Scene Name"
        value={sceneName}
        onChange={(event) => setSceneName(event.currentTarget.value)}
      />
    </Stack>
  );
};

export default ConfigSelector;
