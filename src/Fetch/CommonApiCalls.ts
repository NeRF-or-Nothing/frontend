/**
 * @file CommonApiCalls.ts
 * @desc Commonly used fetch api calls to backend. Functions should adhere to 
 * the Types/Functions.ts definitions.
 * 
 * In order to be consistent with ../Types/Function.ts, all functions return null on failure.
 * All http errors handling should be done in the fetch calls.
 * 
 * Any function that requires an auth token should have the token as the first argument.
 */

import { BACKEND_URL } from '../Util/Constants';
import {
  RequestMetaData,
  LoginUserResponse,
  RegisterUserResponse,
  SceneMetadataResponse,
  SceneNameResponse,
  SceneProgressResponse,
  UserSceneHistoryResponse,
  ModifyUserResponse,
} from '../Types/Responses';


/**
 * @desc Logs existing user into NeRF-Or-Nothing
 * @returns Response containing JWT token of userID on success, null on failure
 * @implements FetchFunction
 */
async function fetchLogin (
  username: string,
  password: string
): Promise<LoginUserResponse | null> {
  try {
    const url = `${BACKEND_URL}/user/account/login`;

    console.log('Fetching from ', url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ username, password }),
    });

    const data = await response.json() as LoginUserResponse;

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error: any) {
    console.error('Error logging in:', error);
    return null;
  }
}

/**
 * @desc Registers a new user with NeRF-Or-Nothing
 * @returns Response containing True on success, false on failure
 * @implements FetchFunction
 */
async function fetchRegister(
  username: string,
  password: string
): Promise<RegisterUserResponse | null> {
  try {
    const url = `${BACKEND_URL}/user/account/register`;

    console.log('Fetching from ', url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
    });

    const data = await response.json() as RegisterUserResponse;

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, ${
          data.error || 'Registration failed'
        }`
      );
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

/**
 * @desc Changes the username of the user if the new username is available
 * Requires the user's password for verification
 * @returns Response containing success, null on failure
 * @implements AuthedFetchFunction
 */
async function fetchChangeUsername(
  token: string,
  password: string,
  newUsername: string,
): Promise<ModifyUserResponse | null> {
  try {
    const url = `${BACKEND_URL}/user/account/update/username`;

    console.log('Fetching from ', url);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams({
        password: password,
        newUsername: newUsername,
      }),
    });

    const data = await response.json() as ModifyUserResponse;

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, ${
          data.message || 'Username change failed'
        }`
      );
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

/**
 * @desc Changes the password of the user. Requires old password for verification
 * @returns Response containing success, null on failure
 * @implements AuthedFetchFunction
 */
async function fetchChangePassword(
  token: string,
  oldPassword: string,
  newPassword: string,
): Promise<ModifyUserResponse | null> {
  try {
    const url = `${BACKEND_URL}/user/account/update/password`;

    console.log('Fetching from ', url);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    });

    const data = await response.json() as ModifyUserResponse;

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, ${
          data.message || 'Password change failed'
        }`
      );
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

/**
 * @desc Deletes a scene from the user's history
 * @returns Response containing success, null on failure
 * @implements AuthedFetchFunction
 */
async function fetchDeleteScene(
  token: string,
  sceneID: string,
): Promise<ModifyUserResponse | null> {
  try {
    const url = `${BACKEND_URL}/user/scene/delete${sceneID}`;

    console.log('Fetching from ', url);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, ${
          data.message || 'Scene deletion failed'
        }`
      );
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

/**
 * @desc Deletes the user's account. Requires the user's password for verification
 * @returns true on success, null on failure
 * @implements AuthedFetchFunction
 */
async function fetchDeleteAccount(
  token: string,
  password: string,
): Promise<ModifyUserResponse | null> {
  try {
    const url = `${BACKEND_URL}/user/account/delete`;

    console.log('Fetching from ', url);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams({
        password: password,
      }),
    });

    const data = await response.json() as ModifyUserResponse;

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, ${
          data.message || 'Account deletion failed'
        }`
      );
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

/**
 * @desc Posts a new scene to the backend for processing
 * @returns MetaDataResponse on success, null on failure
 * @implements AuthedFetchFunction
 */
async function fetchPostVideo(
  token: string,
  file: File,
  config: any,
): Promise<RequestMetaData | null> {
  try {
    const url = `${BACKEND_URL}/user/scene/new`;
    console.log('Fetching from ', url);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('training_mode', config.trainingMode);
    formData.append('output_types', config.outputTypes.join(','));
    formData.append('save_iterations', config.saveIterations.join(','));
    formData.append(
      'total_iterations',
      Math.min(Math.max(...config.saveIterations), 30000).toString()
    );
    formData.append('scene_name', config.sceneName);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Verify request success
    const validStatusCodes = [200, 202];
    if (!validStatusCodes.includes(response.status)) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    // Parse response data
    const responseData = (await response.json()) as RequestMetaData;
    return responseData;
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
}

/**
 * @desc Fetches metadata for a (hopefully) completed scene/job on the backend.
 * @returns SceneMetadataResponse on success, null on failure
 * @implements AuthedFetchFunction
 */
async function fetchSceneMetadata(
  token: string,
  sceneID: string,
  outputType?: string
): Promise<SceneMetadataResponse | null> {
  try {
    const url = `${BACKEND_URL}/user/scene/metadata/${sceneID}`;
    console.log('Fetching from', url);

    const formData = new FormData();
    if (outputType) {
      formData.append('output_type', outputType);
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as SceneMetadataResponse;
    return data;
  } catch (error) {
    console.error(`Error fetching job data for ${sceneID}:`, error);
    return null;
  }
}

/**
 * @desc Fetches the scene name corresponding to SceneID from the backend
 * @returns String containing scene name on success, null on failure
 * @implements AuthedFetchFunction
 */
async function fetchSceneName(
  token: string,
  sceneID: string,
) : Promise<SceneNameResponse | null> {
  try {
    const url = `${BACKEND_URL}/user/scene/name/${sceneID}`;
    console.log('Fetching from ', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as SceneNameResponse;

    console.log('Scene name response:', data);

    return data;
  } catch (error) {
    console.error('Error fetching scene name:', error);
    return null;
  }
}

/**
 * @desc Fetches the thumbnail for a specific scene
 * @returns A Blob containing the thumbnail image data on success, null on failure
 * @implements AuthedFetchFunction
 */
async function fetchSceneThumbnail(
  token: string,
  sceneID: string,
): Promise<Blob | null> {
  try {
    const url = `${BACKEND_URL}/user/scene/thumbnail/${sceneID}`;
    console.log('Fetching thumbnail from', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // The backend is sending raw image data, so we return it as a Blob
    const data = await response.blob();
    return data;
  } catch (error) {
    console.error(`Error fetching thumbnail for scene ${sceneID}:`, error);
    return null;
  }
}

/**
 * @desc Fetches the progress of a scene from the backend. The response should
 * @returns Information about the scene's progress on success, null on failure
 * @implements AuthedFetchFunction
 */
async function fetchSceneProgress(
  token: string,
  sceneID: string,
): Promise<SceneProgressResponse | null> {
  try {
    const url = `${BACKEND_URL}/user/scene/progress/${sceneID}`;
    console.log('Fetching from', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as SceneProgressResponse;
    console.log('Scene progress response:', data);
    return data;
  }
  catch (error) {
    console.error(`Error fetching progress for scene ${sceneID}:`, error);
    return null;
  }
}

/**
 * @desc Fetches the output of a scene from the backend. Uses range requests to fetch
 * the output in chunks specified by the backend.
 * @returns ArrayBuffer containing the output data on success, null on failure
 */
async function fetchSceneOutput(
  token: string,
  sceneID: string,
  outputType: string,
  iteration: number,
  chunks: number,
  chunkSize: number,
  lastChunkSize: number
): Promise<ArrayBuffer | null> {
  try {
    console.log('Attempting to fetch resource:', outputType, iteration);

    const totalSize = (chunks - 1) * chunkSize + lastChunkSize;
    const fullContent = new Uint8Array(totalSize);
    let offset = 0;

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize;
      const end = i === chunks - 1 ? totalSize - 1 : start + chunkSize - 1;

      console.log(`Fetching chunk ${i + 1}/${chunks} from`, `${BACKEND_URL}/user/scene/output/${outputType}/${sceneID}?iteration=${iteration}`);
      
      const response = await fetch(
        `${BACKEND_URL}/user/scene/output/${outputType}/${sceneID}?iteration=${iteration}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Range: `bytes=${start}-${end}`,
          },
        }
      );

      if (!response.ok && response.status !== 206) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const chunk = await response.arrayBuffer();
      
      // Check if the received chunk size matches the expected size
      const expectedChunkSize = i === chunks - 1 ? lastChunkSize : chunkSize;
      if (chunk.byteLength !== expectedChunkSize) {
        console.warn(`Received chunk size (${chunk.byteLength}) does not match expected size (${expectedChunkSize})`);
      }

      // Ensure we don't write beyond the buffer's end
      const writeLength = Math.min(chunk.byteLength, fullContent.length - offset);
      fullContent.set(new Uint8Array(chunk.slice(0, writeLength)), offset);
      offset += writeLength;

      // All data received
      if (offset >= totalSize) break;
    }

    // Trim the buffer if we received less data than expected
    return offset < totalSize ? fullContent.slice(0, offset).buffer : fullContent.buffer;
  } catch (error) {
    console.error('Error fetching scene output:', error);
    return null;
  }
}

/**
 * @desc Fetches the user's scene history from the backend.
 * @Requires a valid token containing user's ID
 * @returns Array of scene IDs on success, null on failure
 * @implements AuthedFetchFunction
 */
async function fetchUserSceneHistory(
  token: string
): Promise<UserSceneHistoryResponse | null> {
  try {
    const url = `${BACKEND_URL}/user/scene/history`;
    console.log('Fetching from ', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as UserSceneHistoryResponse;
    return data;
  } catch (error) {
    console.error('Error fetching user history:', error);
    return null;
  }
}

/**
 * All the API calls that are used in the frontend
 */
export {
  fetchLogin,
  fetchRegister,
  fetchChangeUsername,
  fetchChangePassword,
  fetchDeleteAccount,
  fetchDeleteScene,
  fetchPostVideo,
  fetchSceneMetadata,
  fetchSceneName,
  fetchSceneThumbnail,
  fetchSceneProgress,
  fetchSceneOutput,
  fetchUserSceneHistory,
};
