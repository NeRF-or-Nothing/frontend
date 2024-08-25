import { Container, Title, Text, Button, Group, Paper, Progress, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RequestMetaData, SceneProgressResponse } from "../../Types/Responses";
import { fetchSceneProgress } from "../../Fetch/CommonApiCalls";
import { useAuthFetchRetry } from "../../Fetch/Retry";
import VideoUpload from "./VideoUpload/VideoUpload";

function Home() {
  const [sceneID, setSceneId] = useState<string | null>(null);
  const [progress, setProgress] = useState<SceneProgressResponse | null>(null);
  const [wasProcessing, setWasProcessing] = useState(false);
  const [sceneFinished, setSceneFinished] = useState(false);
  const navigate = useNavigate();

  const authRetryFetchSceneProgress = useAuthFetchRetry(fetchSceneProgress);

  /**
   * Effect hook to check the progress of the job every 15 seconds while not completed.
   */
  useEffect(() => {
    if (sceneID) {
      const interval = setInterval(async () => {
        const progress = await authRetryFetchSceneProgress(sceneID);

        if (progress !== null) {
          if (progress.error) {
            console.error(progress.error);
            return;
          }

          setProgress(progress);

          console.log("progress: ", progress);

          // Scene Processing
          if (!wasProcessing && progress.processing) {
            console.log("Scene Processing");
            setWasProcessing(true);
          }

          // Scene Finished
          if (wasProcessing && !progress.processing) {
            console.log("Scene Finished");
            setWasProcessing(false);
            setSceneFinished(true);
          }
        }
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [sceneID, wasProcessing]);

  const handleUpload = (newJobInfo: RequestMetaData) => {
    if (newJobInfo.error) {
      console.error(newJobInfo.error);
      return;
    }
    setSceneId(newJobInfo.id);
  };

  const handleGoToMyScenes = () => {
    navigate("/MyScenes");
  };

  const handleGoToScene = () => {
    navigate(`/Scene?scene_id=${sceneID}`);
  };

  return (
    <Stack mih="100vh">
      <Paper p="md" radius={0} >
        <Title order={2} ta="center">
          Next generation interactive scene reconstruction powered by Deep
          Learning
        </Title>
      </Paper>

      <Container size="lg" py="xl" style={{ flexGrow: 1 }}>
        <Stack>
          <Title order={3} ta="center">
            Select a video file that you want reconstructed and watch the magic
            happen.
          </Title>
          <Text ta="center" size="sm">
            *Video file must be in .mp4 format. <br />
            *TensoRF is no longer accepting new video uploads.
          </Text>

          <VideoUpload onUpload={handleUpload} />

          {sceneID && (
            <Paper p="md" radius="md" withBorder>
              <Stack>
                <Title order={4} ta="center">
                  Job Information
                </Title>
                <Text ta="center">Scene ID: {sceneID}</Text>
                {progress && progress.processing && (
                  <>
                    <Title order={5} ta="center">
                      {`Overall Position: (${progress.overall_position}/${progress.overall_position})`}
                    </Title>
                    <Progress
                      value={
                        ((progress.overall_size - progress.overall_position) /
                          progress.overall_size) *
                        100
                      }
                      size="xl"
                    />
                    <Title order={5} ta="center">
                      {`Stage ${progress.stage} Position: (${progress.current_position}/${progress.current_size})`}
                    </Title>
                    <Progress
                      value={
                        ((progress.current_size - progress.current_position) /
                          progress.current_size) *
                        100
                      }
                      size="xl"
                    />
                  </>
                )}
              </Stack>
            </Paper>
          )}

          {sceneFinished && (
            <Group justify="center">
              <Button onClick={handleGoToMyScenes}>Go to all my Scenes</Button>
              <Button onClick={handleGoToScene}>Go to Scene</Button>
            </Group>
          )}
        </Stack>
      </Container>

    </Stack>
  );
}

export default Home;
