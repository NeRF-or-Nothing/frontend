/**
 * @file ResourceCard.tsx
 * @desc This component displays information about a resource type and allows the user to
 * select an iteration.
 */

import { Card, Select, Title } from '@mantine/core';

interface ResourceCardProps {
  resourceType: string;
  iterations: number[];
  onIterationSelect: (iteration: number) => void;
  selectedIteration: number | null;
}

const ResourceCard = ({
  resourceType,
  iterations,
  onIterationSelect,
  selectedIteration,
}: ResourceCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">{resourceType}</Title>
      <Select
        label="Select Iteration"
        placeholder="Choose an iteration"
        data={iterations.map(iter => ({ value: iter.toString(), label: `Iteration ${iter}` }))}
        value={selectedIteration?.toString() || ''}
        onChange={(value) => onIterationSelect(Number(value))}
      />
    </Card>
  );
};

export default ResourceCard;