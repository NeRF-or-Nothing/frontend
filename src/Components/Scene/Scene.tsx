/**
 * @file Scene.tsx
 * @desc Component for displaying and interacting with a single scene.
 * Fetches scene data, metadata, and handles scene output rendering.
 *
 * This is an authenticated route.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Tabs, Loader, Alert, Title, Box } from '@mantine/core';
import { SceneMetadataResponse } from '../../Types/Responses';
import {
  fetchSceneMetadata,
  fetchSceneOutput,
} from '../../Fetch/CommonApiCalls';
import { useAuthFetchRetry } from '../../Fetch/Retry';
import ResourceCard from './ResourceCard';
import OutputViewer from './OutputViewer';
import styles from './Scene.module.css';

const Scene: React.FC = () => {
  // URL Params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sceneID = searchParams.get('scene_id') || '';
  const sceneName = searchParams.get('name') || 'Unnamed Scene';

  // Request State Variables
  const [metadata, setMetadata] = useState<SceneMetadataResponse | null>(null);
  const [activeResource, setActiveResource] = useState<string | null>(null);
  const [activeIteration, setActiveIteration] = useState<number | null>(null);
  const [outputData, setOutputData] = useState<ArrayBuffer | null>(null);

  // Loading/Error State Variables
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Functions
  const authRetryFetchSceneMetadata = useAuthFetchRetry(fetchSceneMetadata);
  const authRetryFetchSceneOutput = useAuthFetchRetry(fetchSceneOutput);

  // Get scene resource info
  const fetchMetadata = useCallback(async () => {
    const data = await authRetryFetchSceneMetadata(sceneID);
    if (data) {
      setMetadata(data);
      console.log('metadata', data);
      const firstResourceType = Object.keys(data.resources)[0]; // Set first as active
      setActiveResource(firstResourceType);
    }
    setIsLoading(false);
  }, [sceneID, authRetryFetchSceneMetadata]);

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  const handleResourceSelect = (resourceType: string) => {
    setActiveResource(resourceType);
    setActiveIteration(null);
    setOutputData(null);
  };

  // Choose a resource iteration to view. Retrieves output data.
  const handleIterationSelect = async (iteration: number) => {
    if (!activeResource) return;

    setIsLoading(true);
    try {
      const resourceInfo = metadata?.resources[activeResource][iteration];
      if (!resourceInfo) throw new Error('Resource info not found');

      const output = await authRetryFetchSceneOutput(
        sceneID,
        activeResource,
        iteration,
        resourceInfo.chunks,
        1024 * 1024, // Assuming 1MB chunks
        resourceInfo.last_chunk_size
      );

      if (output) {
        setOutputData(output);
        setActiveIteration(iteration);
      } else {
        throw new Error('Failed to fetch output data');
      }
    } catch (err) {
      setError('Failed to fetch resource data');
      console.error('Error fetching resource data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container className={styles.loadingContainer}>
        <Loader size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={styles.errorContainer}>
        <Alert title="Error" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl" className={styles.container}>
      <Title order={2} className={styles.header}>Scene: {sceneName}</Title>

      {metadata && (
        <div className={styles.tabsContainer}>
          <Tabs value={activeResource} onChange={(value) => handleResourceSelect(value as string)}>
            <Tabs.List>
              {Object.keys(metadata.resources).map((resourceType) => (
                <Tabs.Tab key={resourceType} value={resourceType}>
                  {resourceType}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {Object.entries(metadata.resources).map(([resourceType, iterations]) => (
              <Tabs.Panel key={resourceType} value={resourceType}>
                <ResourceCard
                  resourceType={resourceType}
                  iterations={Object.keys(iterations).map(Number)}
                  onIterationSelect={handleIterationSelect}
                  selectedIteration={activeIteration}
                />
              </Tabs.Panel>
            ))}
          </Tabs>
        </div>
      )}

      <Box className={styles.outputViewerContainer}>
        {outputData && activeResource ? (
          <OutputViewer resourceType={activeResource} data={outputData} />
        ) : (
          <Title order={3}>Select a resource and iteration to view output</Title>
        )}
      </Box>

    </Container>
  );
};

export default Scene;
