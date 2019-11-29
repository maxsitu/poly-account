enum MutationStatus {
    SUCCESS= 'SUCCESS',
    FAILURE= 'FAILURE',
}

interface IMutationResult {
    status: MutationStatus;
    message?: string;
}

export {
    MutationStatus,
    IMutationResult,
};
