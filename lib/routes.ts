export const rootPath = () => '/';
export const loginPath = () => '/login';
export const interviewsPath = () => '/interviews';
export const scheduleInterviewPath = (appUuid?: string | null) =>
  `/interviews/new?a=${appUuid}`;
export const profilePath = () => '/profile';
export const interviewPath = (uuid: string) => `/interviews/${uuid}`;
export const candidateProfilePath = (uuid: string) => `/candidates/${uuid}`;
export const positionPath = (uuid: string) => `/positions/${uuid}`;
