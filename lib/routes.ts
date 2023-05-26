export const rootPath = () => '/';
export const loginPath = () => '/login';
export const interviewsPath = () => '/interviews';
export const scheduleInterviewPath = (
  appUuid: string | null,
  candidateUuid: string,
) => `/interviews/new?a=${appUuid}&c=${candidateUuid}`;

type RescheduleInterviewPathProps = {
  appUuid: string | null;
  candidateUuid: string;
  hiringStepId: number;
  interviewId: number;
};

export const rescheduleInterviewPath = ({
  appUuid,
  candidateUuid,
  hiringStepId,
  interviewId,
}: RescheduleInterviewPathProps) =>
  `/interviews/new?a=${appUuid}&c=${candidateUuid}&hs=${hiringStepId}&i=${interviewId}`;

export const profilePath = () => '/profile';
export const interviewPath = (uuid: string) => `/interviews/${uuid}`;
export const candidateProfilePath = (uuid: string) => `/candidates/${uuid}`;
export const positionPath = (uuid: string) => `/positions/${uuid}`;
export const applicationsPath = () => '/applications';
export const applicationPath = (uuid: string) => `/applications/${uuid}`;
export const manageTimeslotsPath = (
  applicationUuid: string,
  candidateUuid: string,
) => `/applications/${applicationUuid}/timeslots?c=${candidateUuid}`;
export const onboardingPath = (type?: 'r' | 'c') =>
  type ? `/signup?type=${type}` : '/signup';
export const resetPasswordPath = () => '/login/reset-password';
