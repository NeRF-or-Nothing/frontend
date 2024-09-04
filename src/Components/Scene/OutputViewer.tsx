/**
 * @file OutputViewer.tsx
 * @desc This component renders the appropriate handler based on the resource type.
 */

import { Alert, Box } from '@mantine/core';
import SplatCloudHandler from './OutputHandlers/SplatCloud/SplatCloudHandler';
import VideoHandler from './OutputHandlers/Video/VideoHandler';
import PointCloudHandler from './OutputHandlers/PointCloud/PointCloudHandler';
import ModelHandler from './OutputHandlers/Model/ModelHandler';

interface OutputViewerProps {
  resourceType: string;
  data: ArrayBuffer;
}

const OutputViewer = ({ resourceType, data }: OutputViewerProps) => {
  const renderViewer = () => {
    switch (resourceType) {
      case 'splat_cloud':
        return <SplatCloudHandler data={new Uint8Array(data)} />;
      case 'video':
        return <VideoHandler data={data} />;
      case 'point_cloud':
        return <PointCloudHandler data={data} />;
      case 'model':
        return <ModelHandler data={data} />;
      default:
        return <Alert color="yellow">Unknown resource type</Alert>;
    }
  };

  return (
    <Box style={{ height: '100%', width: '100%', position: 'relative' }}>
      {renderViewer()}
    </Box>
  );
};

export default OutputViewer;