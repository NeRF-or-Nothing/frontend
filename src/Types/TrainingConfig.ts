// TrainingConfig
export interface TrainingConfig {
    trainingMode: string;
    outputTypes: string[];
    saveIterations: number[];
    sceneName: string;
};
export const VALID_TRAINING_MODES = ["gaussian", "tensorf"];
export const VALID_OUTPUT_TYPES = {
    gaussian: ["splat_cloud", "point_cloud", "video"],
    tensorf: ["model", "video"],
}
export const RECOMMENDED_CONFIG: TrainingConfig = {
    trainingMode: "gaussian",
    outputTypes: ["point_cloud", "splat_cloud"],
    saveIterations: [7000, 30000],
    sceneName: "",
};
