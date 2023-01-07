export const rootPath = () => '/';
export const loginPath = () => '/login';
export const interviewsPath = () => '/interviews';
export const scheduleInterviewPath = (
  appUuid: string | null,
  candidateUuid: string,
) => `/interviews/new?a=${appUuid}&c=${candidateUuid}`;
export const profilePath = () => '/profile';
export const interviewPath = (uuid: string) => `/interviews/${uuid}`;
export const candidateProfilePath = (uuid: string) => `/candidates/${uuid}`;
export const positionPath = (uuid: string) => `/positions/${uuid}`;
