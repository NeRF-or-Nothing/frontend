/**
 * @file Responses.ts
 * @desc This file contains type declarations for decoding api responses from the backend.
 */

/**
 * JSON structure of metadata given with any "resource associated" response from the backend
 * and also returns as json. Will not work on thumbnail or output resources, as they have
 * content-encoding that is not json.
 */
export interface RequestMetaData {
  id: string;
  error: string;
  message: string;
}

/**
 * JSON structure of login response from the backend.
 */
export interface LoginUserResponse extends RequestMetaData {
  jwtToken: string;
}

/**
 * JSON structure of register response from the backend. 
 * Boole
 */
export interface RegisterUserResponse extends RequestMetaData {
  success: boolean;
}

/**
 * JSON structure of scene metadata response from the backend.
 * Contains request metadata and information about the scene's resources.
 * Particularly, the resources field contains information about the scene's output types,
 * iterations, and the existence and size of the resources.
 */
export interface SceneMetadataResponse extends RequestMetaData {
  resources: {
    [outputType: string]: {
      [iteration: string]: {
        exists: boolean;
        size: number;
        chunks: number;
        last_chunk_size: number;
      };
    };
  };
}

/**
 * JSON structure of user history response from the backend.
 * Contains request metadata and list of scene ids.
 */
export interface UserSceneHistoryResponse extends RequestMetaData {
  resources: string[];
}

/**
 * JSON structure of scene name response from the backend.
 * Contains request metadata and the name of the scene.
 */
export interface SceneNameResponse extends RequestMetaData {
  name: string;
}

/**
 * JSON strucutre of scene queue position response from the backend.
 * Contains request metadata, the stage of the scene, and the position in the stages queue.
 */
export interface SceneProgressResponse extends RequestMetaData {
  processing: boolean;
  overall_position: number;
  overall_size: number;
  stage: string;
  current_position: number;
  current_size: number;
}
  