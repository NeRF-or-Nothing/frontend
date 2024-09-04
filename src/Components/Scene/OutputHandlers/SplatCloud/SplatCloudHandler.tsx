/**
 * @file SplatCloudHandler.tsx
 * @desc Component that handles the splat cloud output from the backend as binary data.
 * Embeds a THREE.js canvas to render the splat cloud data with SplatMesh component.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import SplatMesh from './SplatMesh';
import {
  OrbitControls,
  MapControls,
  TrackballControls,
  ArcballControls,
  FlyControls,
  FirstPersonControls,
  CameraControls,
  Stats,
} from '@react-three/drei';
import { Box, FileInput, Select } from '@mantine/core';

const controlTypes = [
  'Orbit',
  'Map',
  'Trackball',
  'Arcball',
  'Fly',
  'FirstPerson',
  'Camera',
] as const;

type ControlType = (typeof controlTypes)[number];

/**
 * Handler for interactive control type selection
 * @param controlType allows the user to switch between control methods
 * @returns
 */
const ControlsWrapper = ({ controlType }: { controlType: ControlType }) => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const handleFocus = () => canvas.focus();
    canvas.addEventListener('click', handleFocus);
    return () => canvas.removeEventListener('click', handleFocus);
  }, [gl]);

  switch (controlType) {
    case 'Orbit':
      return <OrbitControls />;
    case 'Map':
      return <MapControls />;
    case 'Trackball':
      return <TrackballControls />;
    case 'Arcball':
      return <ArcballControls />;
    case 'Fly':
      return <FlyControls rollSpeed={.1}/>;
    case 'FirstPerson':
      return <FirstPersonControls />;
    case 'Camera':
      return <CameraControls />;

    default:
      return null;
  }
};

interface SplatCloudHandlerProps {
  data?: Uint8Array;
}

/**
 * Main component for handling splat cloud data and passing to SplatMesh THREE.js renderer
 * @param param0 - data: Uint8Array Buffer containing the splat cloud data
 * @returns
 */
const SplatCloudHandler = ({ data }: SplatCloudHandlerProps) => {
  const [splatData, setSplatData] = useState<Uint8Array | null>(null);
  const [controlType, setControlType] = useState<ControlType>('Orbit');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setSplatData(data);
    }
  }, [data]);

  const handleFileUpload = useCallback(
    (payload: File | null) => {
      const file = payload;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (result instanceof ArrayBuffer) {
            setSplatData(new Uint8Array(result));
          }
        };
        reader.readAsArrayBuffer(file);
      }
    },
    []
  );

  return (
    <Box ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      
      {!splatData && (
        <FileInput
          placeholder="Upload .splat file"
          accept=".splat"
          onChange={handleFileUpload}
          style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}
        />
      )}

      {splatData && (
        <>
          <Select
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 1000,
              width: 200,
            }}
            value={controlType}
            onChange={(value) => setControlType(value as ControlType)}
            data={controlTypes.map((type) => ({ value: type, label: `${type} Controls` }))}
          />
          <Box style={{ width: '100%', height: '100%' }}>
            <Canvas
              style={{ width: '100%', height: '100%', display: 'block' }}
              gl={{ antialias: false }}
              camera={{ position: [0, 0, 5], fov: 75 }}
            >
              <ControlsWrapper controlType={controlType} />
              <Stats />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <group>
                <SplatMesh data={splatData} maxSplats={1000000} />
              </group>
            </Canvas>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SplatCloudHandler;
