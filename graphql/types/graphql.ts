/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccountType: any;
  ApplicationStatus: any;
  DateTime: any;
  InterviewFormat: any;
  InterviewStatus: any;
  PositionType: any;
  SalaryRateType: any;
  Upload: any;
  UserWhereUniqueInput: any;
};

export type Application = {
  __typename?: 'Application';
  candidate?: Maybe<Candidate>;
  currentStep?: Maybe<HiringStep>;
  declineMessage?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  interviews?: Maybe<Array<Maybe<Interview>>>;
  position?: Maybe<Position>;
  status?: Maybe<Scalars['ApplicationStatus']>;
  timeslots?: Maybe<Array<Maybe<Timeslot>>>;
  upcomingInterview?: Maybe<Interview>;
  uuid?: Maybe<Scalars['String']>;
};

export type ApplyToPositionInput = {
  candidateId: Scalars['Int'];
  positionUuid: Scalars['String'];
  timeslots: Array<InputMaybe<CreateTimeslotInput>>;
};

export type Candidate = {
  __typename?: 'Candidate';
  about?: Maybe<Scalars['String']>;
  applications?: Maybe<Array<Maybe<Application>>>;
  id?: Maybe<Scalars['Int']>;
  positionTitle?: Maybe<Scalars['String']>;
  resumeUrl?: Maybe<Scalars['String']>;
  reviews?: Maybe<Array<Maybe<Feedback>>>;
  salaryExpectation?: Maybe<Scalars['Int']>;
  salaryRateType?: Maybe<Scalars['SalaryRateType']>;
  skills?: Maybe<Array<Maybe<Skill>>>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  yearsOfExperience?: Maybe<Scalars['Int']>;
};

export type CandidateSkillInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  address?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type CompanyWhereInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CreateApplicationInput = {
  candidateId: Scalars['Int'];
  positionUuid: Scalars['String'];
  timeslots: Array<InputMaybe<CreateTimeslotInput>>;
};

export type CreateCompanyInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CreateFeedbackInput = {
  authorId: Scalars['Int'];
  candidateId: Scalars['Int'];
  details: Scalars['String'];
  interviewId: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateHiringStepInput = {
  order: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateInterviewInput = {
  candidateId: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  endsAt: Scalars['DateTime'];
  format?: InputMaybe<Scalars['InterviewFormat']>;
  hiringStepId: Scalars['Int'];
  meetingLink?: InputMaybe<Scalars['String']>;
  positionId: Scalars['Int'];
  recruiterId: Scalars['Int'];
  startsAt: Scalars['DateTime'];
  title: Scalars['String'];
};

export type CreateNotificationInput = {
  body: Scalars['String'];
  isRead: Scalars['Boolean'];
  recipientId: Scalars['Int'];
  redirectPath?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreatePositionInput = {
  authorId: Scalars['Int'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CreateQuestionInput = {
  body?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  recruiterId?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateSkillInput = {
  name: Scalars['String'];
};

export type CreateTimeslotInput = {
  endsAt: Scalars['DateTime'];
  startsAt: Scalars['DateTime'];
};

export type CreateUserInput = {
  candidateId?: InputMaybe<Scalars['Int']>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname?: InputMaybe<Scalars['String']>;
  middlename?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  recruiterId?: InputMaybe<Scalars['Int']>;
  type: Scalars['AccountType'];
};

export type DeclineApplicationInput = {
  declineMessage: Scalars['String'];
  redirectPath: Scalars['String'];
  userId: Scalars['Int'];
};

export type DeclineInterviewInput = {
  candidateId?: InputMaybe<Scalars['Int']>;
  declineReason?: InputMaybe<Scalars['String']>;
  declinedBy: Scalars['AccountType'];
  recruiterId?: InputMaybe<Scalars['Int']>;
  redirectPath: Scalars['String'];
};

export type Feedback = {
  __typename?: 'Feedback';
  authorId?: Maybe<Scalars['Int']>;
  candidateId?: Maybe<Scalars['Int']>;
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  interviewId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type GetCurrentUserResponse = {
  __typename?: 'GetCurrentUserResponse';
  user?: Maybe<User>;
};

export type GetInterviewsWhereInput = {
  candidateId?: InputMaybe<Scalars['Int']>;
  dayEnd?: InputMaybe<Scalars['DateTime']>;
  dayStart?: InputMaybe<Scalars['DateTime']>;
  recruiterId?: InputMaybe<Scalars['Int']>;
};

export type HiringStep = {
  __typename?: 'HiringStep';
  id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  position?: Maybe<Position>;
  positionId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type Interview = {
  __typename?: 'Interview';
  application?: Maybe<Application>;
  applicationId?: Maybe<Scalars['Int']>;
  candidate?: Maybe<Candidate>;
  candidateId?: Maybe<Scalars['Int']>;
  declineReason?: Maybe<Scalars['String']>;
  declinedBy?: Maybe<Scalars['AccountType']>;
  description?: Maybe<Scalars['String']>;
  endsAt?: Maybe<Scalars['DateTime']>;
  feedbackId?: Maybe<Scalars['Int']>;
  format?: Maybe<Scalars['InterviewFormat']>;
  hiringStepId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  meetingLink?: Maybe<Scalars['String']>;
  positionId?: Maybe<Scalars['Int']>;
  questions?: Maybe<Array<Maybe<Question>>>;
  recruiterId?: Maybe<Scalars['Int']>;
  startsAt?: Maybe<Scalars['DateTime']>;
  status?: Maybe<Scalars['InterviewStatus']>;
  title?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addSkillToCandidate: Candidate;
  addSkillToPosition: Position;
  applyToPosition: Application;
  createApplication: Application;
  createCompany: Company;
  createFeedback: Feedback;
  createHiringStep: HiringStep;
  createInterview: Interview;
  createNotification: Notification;
  createPosition: Position;
  createQuestion: Question;
  createTimeslot: Timeslot;
  createUser: User;
  declineApplication: Application;
  declineInterview: Interview;
  deleteHiringStep?: Maybe<HiringStep>;
  deleteTimeslot: Timeslot;
  hireApplication: Application;
  importQuestions: Interview;
  login: LoginResponse;
  logout: LogoutResponse;
  publishPosition: Position;
  removeCompany?: Maybe<Company>;
  removeFeedback?: Maybe<Feedback>;
  removeInterview?: Maybe<Interview>;
  removePosition?: Maybe<Position>;
  removeQuestions?: Maybe<Question>;
  removeResume: Candidate;
  removeSkillFromCandidate: Candidate;
  removeSkillFromPosition: Position;
  removeUser?: Maybe<User>;
  resendVerificationLink: SuccessPayload;
  resetPassword: User;
  sendPasswordResetLink: SuccessPayload;
  setCurrentRefreshToken: User;
  setNotificationRead: Notification;
  signup: LoginResponse;
  updateCandidate: Candidate;
  updateCompany: Company;
  updateFeedback: Feedback;
  updateHiringStep: HiringStep;
  updateInterview: Interview;
  updatePosition: Position;
  updateQuestion: Question;
  updateUser: User;
  uploadResume: Candidate;
  verifyAccount: SuccessPayload;
};


export type MutationAddSkillToCandidateArgs = {
  candidateId: Scalars['Int'];
  skillName: Scalars['String'];
};


export type MutationAddSkillToPositionArgs = {
  id: Scalars['Int'];
  skillName: Scalars['String'];
};


export type MutationApplyToPositionArgs = {
  applyToPositionInput: ApplyToPositionInput;
};


export type MutationCreateApplicationArgs = {
  createApplicationInput: CreateApplicationInput;
};


export type MutationCreateCompanyArgs = {
  createCompanyInput: CreateCompanyInput;
};


export type MutationCreateFeedbackArgs = {
  createFeedbackInput: CreateFeedbackInput;
};


export type MutationCreateHiringStepArgs = {
  createHiringStepInput: CreateHiringStepInput;
  positionId: Scalars['Int'];
};


export type MutationCreateInterviewArgs = {
  applicationId: Scalars['Int'];
  createInterviewInput: CreateInterviewInput;
  positionId: Scalars['Int'];
};


export type MutationCreateNotificationArgs = {
  createNotificationInput: CreateNotificationInput;
  recipientId: Scalars['Int'];
};


export type MutationCreatePositionArgs = {
  createPositionInput: CreatePositionInput;
};


export type MutationCreateQuestionArgs = {
  createQuestionInput: CreateQuestionInput;
};


export type MutationCreateTimeslotArgs = {
  applicationId: Scalars['Int'];
  candidateId: Scalars['Int'];
  createTimeslotInput: CreateTimeslotInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeclineApplicationArgs = {
  declineApplicationInput: DeclineApplicationInput;
  id: Scalars['Int'];
  positionId: Scalars['Int'];
};


export type MutationDeclineInterviewArgs = {
  declineInterviewInput: DeclineInterviewInput;
  id: Scalars['Int'];
  positionId: Scalars['Int'];
};


export type MutationDeleteHiringStepArgs = {
  id: Scalars['Int'];
  positionId?: InputMaybe<Scalars['Int']>;
};


export type MutationDeleteTimeslotArgs = {
  candidateId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationHireApplicationArgs = {
  id: Scalars['Int'];
  positionId: Scalars['Int'];
  redirectPath: Scalars['String'];
};


export type MutationImportQuestionsArgs = {
  interviewId: Scalars['Int'];
  positionId: Scalars['Int'];
  questionIds: Array<InputMaybe<Scalars['Int']>>;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationPublishPositionArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCompanyArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveFeedbackArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveInterviewArgs = {
  id: Scalars['Int'];
  positionId: Scalars['Int'];
};


export type MutationRemovePositionArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveQuestionsArgs = {
  ids: Array<InputMaybe<Scalars['Int']>>;
};


export type MutationRemoveResumeArgs = {
  candidateId: Scalars['Int'];
  key: Scalars['String'];
};


export type MutationRemoveSkillFromCandidateArgs = {
  candidateId: Scalars['Int'];
  skillId: Scalars['Int'];
};


export type MutationRemoveSkillFromPositionArgs = {
  id: Scalars['Int'];
  skillId: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationResendVerificationLinkArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationSendPasswordResetLinkArgs = {
  email: Scalars['String'];
};


export type MutationSetCurrentRefreshTokenArgs = {
  id: Scalars['Int'];
  refreshToken: Scalars['String'];
};


export type MutationSetNotificationReadArgs = {
  id: Scalars['Int'];
  recipientId: Scalars['Int'];
};


export type MutationSignupArgs = {
  signupUserInput: SignupUserInput;
};


export type MutationUpdateCandidateArgs = {
  candidateId: Scalars['Int'];
  updateCandidateInput: UpdateCandidateInput;
};


export type MutationUpdateCompanyArgs = {
  updateCompanyInput: UpdateCompanyInput;
};


export type MutationUpdateFeedbackArgs = {
  updateFeedbackInput: UpdateFeedbackInput;
};


export type MutationUpdateHiringStepArgs = {
  id: Scalars['Int'];
  positionId: Scalars['Int'];
  updateHiringStepInput: UpdateHiringStepInput;
};


export type MutationUpdateInterviewArgs = {
  id: Scalars['Int'];
  positionId: Scalars['Int'];
  updateInterviewInput: UpdateInterviewInput;
};


export type MutationUpdatePositionArgs = {
  id: Scalars['Int'];
  updatePositionInput: UpdatePositionInput;
};


export type MutationUpdateQuestionArgs = {
  id: Scalars['Int'];
  updateQuestionInput: UpdateQuestionInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  updateUserInput: UpdateUserInput;
};


export type MutationUploadResumeArgs = {
  candidateId: Scalars['Int'];
  resume: Scalars['Upload'];
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  body?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  isRead?: Maybe<Scalars['Boolean']>;
  recipient?: Maybe<Candidate>;
  recipientId?: Maybe<Scalars['Int']>;
  redirectPath?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['String']>;
};

export type NotificationWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  recipientId?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type Position = {
  __typename?: 'Position';
  applicationStatus?: Maybe<Scalars['ApplicationStatus']>;
  applications?: Maybe<Array<Maybe<Application>>>;
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['Int']>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  hiringSteps?: Maybe<Array<Maybe<HiringStep>>>;
  id?: Maybe<Scalars['Int']>;
  isArchived?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  isRemoteWorldWide?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  requiredSkills?: Maybe<Array<Maybe<Skill>>>;
  salaryRate?: Maybe<Scalars['Int']>;
  salaryRateType?: Maybe<Scalars['SalaryRateType']>;
  suggestedCandidates?: Maybe<Array<Maybe<Candidate>>>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['PositionType']>;
  uuid?: Maybe<Scalars['String']>;
};

export type PositionWhereInput = {
  authorId?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  isArchived?: InputMaybe<Scalars['Boolean']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  isRemoteWorldWide?: InputMaybe<Scalars['Boolean']>;
  salaryRateType?: InputMaybe<Scalars['SalaryRateType']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['PositionType']>;
};

export type ProposePositionInput = {
  body: Scalars['String'];
  recipientId: Scalars['Int'];
  redirectPath: Scalars['String'];
  title: Scalars['String'];
};

export type PublishPositionInput = {
  authorId: Scalars['Int'];
  companyId: Scalars['Int'];
  description: Scalars['String'];
  isRemoteWorldWide: Scalars['Boolean'];
  location?: InputMaybe<Scalars['String']>;
  salaryRate: Scalars['Int'];
  salaryRateType: Scalars['SalaryRateType'];
  title: Scalars['String'];
  type: Scalars['PositionType'];
};

export type Query = {
  __typename?: 'Query';
  getAllCompanies: Array<Maybe<Company>>;
  getAllFeedbacks: Array<Maybe<Feedback>>;
  getAllPositions: Array<Maybe<Position>>;
  getAllSkills?: Maybe<Array<Maybe<Skill>>>;
  getAllUsers: Array<Maybe<User>>;
  getApplication?: Maybe<Application>;
  getApplications: Array<Maybe<Application>>;
  getCalendarDayTimeslots: Array<Maybe<Timeslot>>;
  getCandidateProfile?: Maybe<Candidate>;
  getCompany?: Maybe<Company>;
  getCurrentUser: GetCurrentUserResponse;
  getFeedback?: Maybe<Feedback>;
  getInterview?: Maybe<Interview>;
  getInterviews: Array<Maybe<Interview>>;
  getNotifications: Array<Maybe<Notification>>;
  getPosition?: Maybe<Position>;
  getProposalStatus: Scalars['String'];
  getQuestion?: Maybe<Question>;
  getQuestions: Array<Maybe<Question>>;
  getUser?: Maybe<User>;
  getUserProfile?: Maybe<User>;
  refresh: RefreshResponse;
  searchCompanies: Array<Maybe<Company>>;
  searchSkills: Array<Maybe<Skill>>;
};


export type QueryGetAllCompaniesArgs = {
  where?: InputMaybe<CompanyWhereInput>;
};


export type QueryGetAllPositionsArgs = {
  where: PositionWhereInput;
};


export type QueryGetApplicationArgs = {
  candidateId?: InputMaybe<Scalars['Int']>;
  uuid: Scalars['String'];
};


export type QueryGetApplicationsArgs = {
  candidateId: Scalars['Int'];
};


export type QueryGetCalendarDayTimeslotsArgs = {
  where: TimeslotsWhereInput;
};


export type QueryGetCandidateProfileArgs = {
  uuid: Scalars['String'];
};


export type QueryGetCompanyArgs = {
  id: Scalars['Int'];
};


export type QueryGetFeedbackArgs = {
  id: Scalars['Int'];
};


export type QueryGetInterviewArgs = {
  uuid: Scalars['String'];
};


export type QueryGetInterviewsArgs = {
  getInterviewsWhereInput: GetInterviewsWhereInput;
};


export type QueryGetNotificationsArgs = {
  where: NotificationWhereUniqueInput;
};


export type QueryGetPositionArgs = {
  uuid: Scalars['String'];
};


export type QueryGetProposalStatusArgs = {
  positionUuid: Scalars['String'];
  uuid: Scalars['String'];
};


export type QueryGetQuestionArgs = {
  id: Scalars['Int'];
};


export type QueryGetQuestionsArgs = {
  recruiterId: Scalars['Int'];
};


export type QueryGetUserArgs = {
  where: Scalars['UserWhereUniqueInput'];
};


export type QuerySearchCompaniesArgs = {
  query: Scalars['String'];
};


export type QuerySearchSkillsArgs = {
  query: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['Int']>;
  body?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  interviews?: Maybe<Array<Maybe<Interview>>>;
  points?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type Recruiter = {
  __typename?: 'Recruiter';
  feedbacks?: Maybe<Array<Maybe<Feedback>>>;
  id?: Maybe<Scalars['Int']>;
  positionsCreated?: Maybe<Array<Maybe<Position>>>;
  user?: Maybe<User>;
};

export type RefreshResponse = {
  __typename?: 'RefreshResponse';
  accessToken: Scalars['String'];
  expSeconds: Scalars['Int'];
  user: User;
};

export type ResetPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type SignupResponse = {
  __typename?: 'SignupResponse';
  user: User;
};

export type SignupUserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  password: Scalars['String'];
  type: Scalars['AccountType'];
};

export type Skill = {
  __typename?: 'Skill';
  candidates?: Maybe<Array<Maybe<Candidate>>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type SuccessPayload = {
  __typename?: 'SuccessPayload';
  success: Scalars['Boolean'];
};

export type Timeslot = {
  __typename?: 'Timeslot';
  application?: Maybe<Application>;
  candidate?: Maybe<Candidate>;
  endsAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  startsAt?: Maybe<Scalars['DateTime']>;
};

export type TimeslotsWhereInput = {
  candidateId?: InputMaybe<Scalars['Int']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type TimestampInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  recruiterId?: InputMaybe<Scalars['Int']>;
};

export type TimestampOutput = {
  __typename?: 'TimestampOutput';
  endsAt?: Maybe<Scalars['DateTime']>;
  startsAt?: Maybe<Scalars['DateTime']>;
};

export type UpdateApplicationInput = {
  declineMessage?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['ApplicationStatus']>;
  timeslots?: InputMaybe<Array<InputMaybe<CreateTimeslotInput>>>;
};

export type UpdateCandidateInput = {
  about?: InputMaybe<Scalars['String']>;
  positionTitle?: InputMaybe<Scalars['String']>;
  resumeUrl?: InputMaybe<Scalars['String']>;
  salaryExpectation?: InputMaybe<Scalars['Int']>;
  salaryRateType?: InputMaybe<Scalars['SalaryRateType']>;
  skills?: InputMaybe<Array<InputMaybe<CandidateSkillInput>>>;
  yearsOfExperience?: InputMaybe<Scalars['Int']>;
};

export type UpdateCompanyInput = {
  address?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type UpdateFeedbackInput = {
  authorId?: InputMaybe<Scalars['Int']>;
  candidateId?: InputMaybe<Scalars['Int']>;
  details?: InputMaybe<Scalars['String']>;
  interviewId?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateHiringStepInput = {
  order?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateInterviewInput = {
  candidateId?: InputMaybe<Scalars['Int']>;
  declineReason?: InputMaybe<Scalars['String']>;
  declinedBy?: InputMaybe<Scalars['AccountType']>;
  description?: InputMaybe<Scalars['String']>;
  endsAt?: InputMaybe<Scalars['DateTime']>;
  feedbackId?: InputMaybe<Scalars['Int']>;
  format?: InputMaybe<Scalars['InterviewFormat']>;
  meetingLink?: InputMaybe<Scalars['String']>;
  positionId?: InputMaybe<Scalars['Int']>;
  startsAt?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<Scalars['InterviewStatus']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdatePositionInput = {
  companyId?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  isArchived?: InputMaybe<Scalars['Boolean']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  isRemoteWorldWide?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  salaryRate?: InputMaybe<Scalars['Int']>;
  salaryRateType?: InputMaybe<Scalars['SalaryRateType']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['PositionType']>;
};

export type UpdateQuestionInput = {
  authorId?: InputMaybe<Scalars['Int']>;
  body?: InputMaybe<Scalars['String']>;
  points?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  middlename?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['AccountType']>;
};

export type User = {
  __typename?: 'User';
  candidate?: Maybe<Candidate>;
  candidateId?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastname?: Maybe<Scalars['String']>;
  middlename?: Maybe<Scalars['String']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  recruiter?: Maybe<Recruiter>;
  recruiterId?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['AccountType']>;
};

export type HireApplicationMutationVariables = Exact<{
  id: Scalars['Int'];
  redirectPath: Scalars['String'];
  positionId: Scalars['Int'];
}>;


export type HireApplicationMutation = { __typename?: 'Mutation', hireApplication: { __typename?: 'Application', status?: any | null } };

export type DeclineApplicationMutationVariables = Exact<{
  id: Scalars['Int'];
  declineApplicationInput: DeclineApplicationInput;
  positionId: Scalars['Int'];
}>;


export type DeclineApplicationMutation = { __typename?: 'Mutation', declineApplication: { __typename?: 'Application', status?: any | null } };

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', firstname?: string | null, candidateId?: number | null } } };

export type SignupMutationVariables = Exact<{
  signupUserInput: SignupUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'LoginResponse', user: { __typename?: 'User', firstname?: string | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', success: boolean } };

export type UpdateCandidateMutationVariables = Exact<{
  candidateId: Scalars['Int'];
  updateCandidateInput: UpdateCandidateInput;
}>;


export type UpdateCandidateMutation = { __typename?: 'Mutation', updateCandidate: { __typename?: 'Candidate', positionTitle?: string | null, yearsOfExperience?: number | null } };

export type AddSkillToCandidateMutationVariables = Exact<{
  candidateId: Scalars['Int'];
  skillName: Scalars['String'];
}>;


export type AddSkillToCandidateMutation = { __typename?: 'Mutation', addSkillToCandidate: { __typename?: 'Candidate', skills?: Array<{ __typename?: 'Skill', id: number, name: string } | null> | null } };

export type RemoveSkillFromCandidateMutationVariables = Exact<{
  candidateId: Scalars['Int'];
  skillId: Scalars['Int'];
}>;


export type RemoveSkillFromCandidateMutation = { __typename?: 'Mutation', removeSkillFromCandidate: { __typename?: 'Candidate', skills?: Array<{ __typename?: 'Skill', id: number, name: string } | null> | null } };

export type UploadResumeMutationVariables = Exact<{
  candidateId: Scalars['Int'];
  resume: Scalars['Upload'];
}>;


export type UploadResumeMutation = { __typename?: 'Mutation', uploadResume: { __typename: 'Candidate', resumeUrl?: string | null } };

export type RemoveResumeMutationVariables = Exact<{
  candidateId: Scalars['Int'];
  key: Scalars['String'];
}>;


export type RemoveResumeMutation = { __typename?: 'Mutation', removeResume: { __typename: 'Candidate', resumeUrl?: string | null } };

export type CreateCompanyMutationVariables = Exact<{
  createCompanyInput: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'Company', id?: number | null, name?: string | null } };

export type VerifyAccountMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyAccountMutation = { __typename?: 'Mutation', verifyAccount: { __typename?: 'SuccessPayload', success: boolean } };

export type ResendVerificationLinkMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResendVerificationLinkMutation = { __typename?: 'Mutation', resendVerificationLink: { __typename?: 'SuccessPayload', success: boolean } };

export type SendPasswordResetLinkMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendPasswordResetLinkMutation = { __typename?: 'Mutation', sendPasswordResetLink: { __typename?: 'SuccessPayload', success: boolean } };

export type CreateHiringStepMutationVariables = Exact<{
  createHiringStepInput: CreateHiringStepInput;
  positionId: Scalars['Int'];
}>;


export type CreateHiringStepMutation = { __typename?: 'Mutation', createHiringStep: { __typename?: 'HiringStep', id?: number | null, title?: string | null } };

export type UpdateHiringStepMutationVariables = Exact<{
  id: Scalars['Int'];
  positionId: Scalars['Int'];
  updateHiringStepInput: UpdateHiringStepInput;
}>;


export type UpdateHiringStepMutation = { __typename?: 'Mutation', updateHiringStep: { __typename?: 'HiringStep', id?: number | null, title?: string | null } };

export type DeleteHiringStepMutationVariables = Exact<{
  id: Scalars['Int'];
  positionId: Scalars['Int'];
}>;


export type DeleteHiringStepMutation = { __typename?: 'Mutation', deleteHiringStep?: { __typename: 'HiringStep' } | null };

export type CreateInterviewMutationVariables = Exact<{
  createInterviewInput: CreateInterviewInput;
  applicationId: Scalars['Int'];
  positionId: Scalars['Int'];
}>;


export type CreateInterviewMutation = { __typename?: 'Mutation', createInterview: { __typename?: 'Interview', id?: number | null, title?: string | null, meetingLink?: string | null, format?: any | null, candidateId?: number | null, positionId?: number | null, startsAt?: any | null, feedbackId?: number | null } };

export type UpdateInterviewMutationVariables = Exact<{
  id: Scalars['Int'];
  updateInterviewInput: UpdateInterviewInput;
  positionId: Scalars['Int'];
}>;


export type UpdateInterviewMutation = { __typename?: 'Mutation', updateInterview: { __typename?: 'Interview', id?: number | null } };

export type ImportQuestionsMutationVariables = Exact<{
  questionIds: Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>;
  interviewId: Scalars['Int'];
  positionId: Scalars['Int'];
}>;


export type ImportQuestionsMutation = { __typename?: 'Mutation', importQuestions: { __typename: 'Interview' } };

export type DeclineInterviewMutationVariables = Exact<{
  id: Scalars['Int'];
  declineInterviewInput: DeclineInterviewInput;
  positionId: Scalars['Int'];
}>;


export type DeclineInterviewMutation = { __typename?: 'Mutation', declineInterview: { __typename?: 'Interview', status?: any | null } };

export type SetNotificationReadMutationVariables = Exact<{
  id: Scalars['Int'];
  recipientId: Scalars['Int'];
}>;


export type SetNotificationReadMutation = { __typename?: 'Mutation', setNotificationRead: { __typename?: 'Notification', id?: number | null, isRead?: boolean | null } };

export type CreatePositionMutationVariables = Exact<{
  createPositionInput: CreatePositionInput;
}>;


export type CreatePositionMutation = { __typename?: 'Mutation', createPosition: { __typename?: 'Position', title?: string | null, description?: string | null } };

export type UpdatePositionMutationVariables = Exact<{
  id: Scalars['Int'];
  updatePositionInput: UpdatePositionInput;
}>;


export type UpdatePositionMutation = { __typename?: 'Mutation', updatePosition: { __typename?: 'Position', title?: string | null, description?: string | null } };

export type PublishPositionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PublishPositionMutation = { __typename?: 'Mutation', publishPosition: { __typename?: 'Position', id?: number | null, title?: string | null, isPublished?: boolean | null } };

export type ApplyPositionMutationVariables = Exact<{
  applyToPositionInput: ApplyToPositionInput;
}>;


export type ApplyPositionMutation = { __typename?: 'Mutation', applyToPosition: { __typename?: 'Application', timeslots?: Array<{ __typename?: 'Timeslot', id?: number | null, startsAt?: any | null, endsAt?: any | null } | null> | null } };

export type AddSkillToPositionMutationVariables = Exact<{
  id: Scalars['Int'];
  skillName: Scalars['String'];
}>;


export type AddSkillToPositionMutation = { __typename?: 'Mutation', addSkillToPosition: { __typename?: 'Position', requiredSkills?: Array<{ __typename?: 'Skill', id: number, name: string } | null> | null } };

export type RemoveSkillFromPositionMutationVariables = Exact<{
  id: Scalars['Int'];
  skillId: Scalars['Int'];
}>;


export type RemoveSkillFromPositionMutation = { __typename?: 'Mutation', removeSkillFromPosition: { __typename?: 'Position', requiredSkills?: Array<{ __typename?: 'Skill', id: number, name: string } | null> | null } };

export type CreateQuestionMutationVariables = Exact<{
  createQuestionInput: CreateQuestionInput;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'Question', id?: number | null } };

export type UpdateQuestionMutationVariables = Exact<{
  id: Scalars['Int'];
  updateQuestionInput: UpdateQuestionInput;
}>;


export type UpdateQuestionMutation = { __typename?: 'Mutation', updateQuestion: { __typename?: 'Question', id?: number | null, title?: string | null, points?: number | null } };

export type RemoveQuestionsMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type RemoveQuestionsMutation = { __typename?: 'Mutation', removeQuestions?: { __typename: 'Question' } | null };

export type CreateTimeslotMutationVariables = Exact<{
  createTimeslotInput: CreateTimeslotInput;
  candidateId: Scalars['Int'];
  applicationId: Scalars['Int'];
}>;


export type CreateTimeslotMutation = { __typename?: 'Mutation', createTimeslot: { __typename?: 'Timeslot', id?: number | null } };

export type DeleteTimeslotMutationVariables = Exact<{
  id: Scalars['Int'];
  candidateId: Scalars['Int'];
}>;


export type DeleteTimeslotMutation = { __typename?: 'Mutation', deleteTimeslot: { __typename: 'Timeslot' } };

export type ResetPasswordMutationVariables = Exact<{
  resetPasswordInput: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'User', email?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int'];
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename: 'User' } };

export type GetApplicationQueryVariables = Exact<{
  uuid: Scalars['String'];
  candidateId?: InputMaybe<Scalars['Int']>;
}>;


export type GetApplicationQuery = { __typename?: 'Query', getApplication?: { __typename?: 'Application', id?: number | null, uuid?: string | null, status?: any | null, declineMessage?: string | null, currentStep?: { __typename?: 'HiringStep', id?: number | null, title?: string | null, order?: number | null } | null, upcomingInterview?: { __typename?: 'Interview', id?: number | null, uuid?: string | null, title?: string | null, description?: string | null, format?: any | null, meetingLink?: string | null, startsAt?: any | null, endsAt?: any | null, status?: any | null, questions?: Array<{ __typename?: 'Question', id?: number | null, title?: string | null, points?: number | null } | null> | null } | null, position?: { __typename?: 'Position', id?: number | null, uuid?: string | null, title?: string | null, salaryRateType?: any | null, salaryRate?: number | null, type?: any | null, description?: string | null, requiredSkills?: Array<{ __typename?: 'Skill', id: number, name: string } | null> | null, company?: { __typename?: 'Company', id?: number | null, name?: string | null } | null, hiringSteps?: Array<{ __typename?: 'HiringStep', id?: number | null, title?: string | null, order?: number | null } | null> | null } | null, candidate?: { __typename?: 'Candidate', id?: number | null, uuid?: string | null, positionTitle?: string | null, yearsOfExperience?: number | null, salaryExpectation?: number | null, salaryRateType?: any | null, about?: string | null, userId?: number | null, skills?: Array<{ __typename?: 'Skill', id: number, name: string } | null> | null, user?: { __typename?: 'User', firstname?: string | null } | null } | null } | null };

export type GetApplicationsQueryVariables = Exact<{
  candidateId: Scalars['Int'];
}>;


export type GetApplicationsQuery = { __typename?: 'Query', getApplications: Array<{ __typename?: 'Application', id?: number | null, uuid?: string | null, status?: any | null, position?: { __typename?: 'Position', id?: number | null, title?: string | null, company?: { __typename?: 'Company', id?: number | null, name?: string | null } | null } | null } | null> };

export type RefreshQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshQuery = { __typename?: 'Query', refresh: { __typename?: 'RefreshResponse', accessToken: string, expSeconds: number, user: { __typename?: 'User', id?: number | null, firstname?: string | null, lastname?: string | null, email?: string | null, type?: any | null, candidateId?: number | null, recruiterId?: number | null, candidate?: { __typename?: 'Candidate', id?: number | null, uuid?: string | null, positionTitle?: string | null, yearsOfExperience?: number | null, salaryExpectation?: number | null, salaryRateType?: any | null, about?: string | null } | null } } };

export type GetCandidateProfileQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type GetCandidateProfileQuery = { __typename?: 'Query', getCandidateProfile?: { __typename?: 'Candidate', id?: number | null, uuid?: string | null, positionTitle?: string | null, yearsOfExperience?: number | null, salaryExpectation?: number | null, salaryRateType?: any | null, about?: string | null, resumeUrl?: string | null, skills?: Array<{ __typename?: 'Skill', id: number, name: string } | null> | null } | null };

export type GetProposalStatusQueryVariables = Exact<{
  uuid: Scalars['String'];
  positionUuid: Scalars['String'];
}>;


export type GetProposalStatusQuery = { __typename?: 'Query', getProposalStatus: string };

export type SearchCompaniesQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchCompaniesQuery = { __typename?: 'Query', searchCompanies: Array<{ __typename?: 'Company', id?: number | null, name?: string | null } | null> };

export type GetInterviewsQueryVariables = Exact<{
  getInterviewsWhereInput: GetInterviewsWhereInput;
}>;


export type GetInterviewsQuery = { __typename?: 'Query', getInterviews: Array<{ __typename?: 'Interview', id?: number | null, uuid?: string | null, title?: string | null, description?: string | null, meetingLink?: string | null, startsAt?: any | null, endsAt?: any | null, status?: any | null, hiringStepId?: number | null, applicationId?: number | null, positionId?: number | null } | null> };

export type GetInterviewQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type GetInterviewQuery = { __typename?: 'Query', getInterview?: { __typename?: 'Interview', id?: number | null, uuid?: string | null, title?: string | null, description?: string | null, format?: any | null, meetingLink?: string | null, startsAt?: any | null, endsAt?: any | null, status?: any | null, candidateId?: number | null, positionId?: number | null, recruiterId?: number | null, declineReason?: string | null, declinedBy?: any | null, hiringStepId?: number | null, application?: { __typename?: 'Application', uuid?: string | null, candidate?: { __typename?: 'Candidate', uuid?: string | null } | null } | null, questions?: Array<{ __typename?: 'Question', id?: number | null, title?: string | null, points?: number | null } | null> | null } | null };

export type GetNotificationsQueryVariables = Exact<{
  where: NotificationWhereUniqueInput;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotifications: Array<{ __typename?: 'Notification', id?: number | null, title?: string | null, body?: string | null, isRead?: boolean | null, redirectPath?: string | null, recipientId?: number | null } | null> };

export type GetPositionQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type GetPositionQuery = { __typename?: 'Query', getPosition?: { __typename?: 'Position', id?: number | null, uuid?: string | null, title?: string | null, description?: string | null, type?: any | null, isRemoteWorldWide?: boolean | null, location?: string | null, isPublished?: boolean | null, salaryRate?: number | null, salaryRateType?: any | null, authorId?: number | null, applicationStatus?: any | null, hiringSteps?: Array<{ __typename?: 'HiringStep', id?: number | null, title?: string | null, positionId?: number | null } | null> | null, requiredSkills?: Array<{ __typename?: 'Skill', id: number, name: string } | null> | null, company?: { __typename?: 'Company', id?: number | null, name?: string | null } | null, suggestedCandidates?: Array<{ __typename?: 'Candidate', id?: number | null, uuid?: string | null, positionTitle?: string | null, yearsOfExperience?: number | null, salaryExpectation?: number | null, salaryRateType?: any | null } | null> | null, applications?: Array<{ __typename?: 'Application', id?: number | null, uuid?: string | null, status?: any | null, candidate?: { __typename?: 'Candidate', id?: number | null, uuid?: string | null, positionTitle?: string | null, yearsOfExperience?: number | null, salaryExpectation?: number | null, salaryRateType?: any | null } | null, interviews?: Array<{ __typename?: 'Interview', uuid?: string | null } | null> | null } | null> | null } | null };

export type GetPositionsQueryVariables = Exact<{
  where: PositionWhereInput;
}>;


export type GetPositionsQuery = { __typename?: 'Query', getAllPositions: Array<{ __typename?: 'Position', id?: number | null, uuid?: string | null, title?: string | null, description?: string | null, type?: any | null, isRemoteWorldWide?: boolean | null, location?: string | null, isPublished?: boolean | null, salaryRate?: number | null, salaryRateType?: any | null, company?: { __typename?: 'Company', id?: number | null, name?: string | null } | null } | null> };

export type GetQuestionsQueryVariables = Exact<{
  recruiterId: Scalars['Int'];
}>;


export type GetQuestionsQuery = { __typename?: 'Query', getQuestions: Array<{ __typename?: 'Question', id?: number | null, title?: string | null, points?: number | null } | null> };

export type SearchSkillsQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchSkillsQuery = { __typename?: 'Query', searchSkills: Array<{ __typename?: 'Skill', id: number, name: string } | null> };

export type GetCalendarDayTimeslotsQueryVariables = Exact<{
  where: TimeslotsWhereInput;
}>;


export type GetCalendarDayTimeslotsQuery = { __typename?: 'Query', getCalendarDayTimeslots: Array<{ __typename?: 'Timeslot', id?: number | null, startsAt?: any | null, endsAt?: any | null } | null> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', firstname?: string | null, type?: any | null } | null> };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'GetCurrentUserResponse', user?: { __typename?: 'User', id?: number | null, firstname?: string | null, lastname?: string | null, email?: string | null, type?: any | null, candidateId?: number | null, recruiterId?: number | null, candidate?: { __typename?: 'Candidate', id?: number | null, uuid?: string | null, positionTitle?: string | null, yearsOfExperience?: number | null, salaryExpectation?: number | null, salaryRateType?: any | null, about?: string | null } | null } | null } };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', getUserProfile?: { __typename?: 'User', id?: number | null, firstname?: string | null, middlename?: string | null, lastname?: string | null, email?: string | null, type?: any | null, candidateId?: number | null, recruiterId?: number | null, candidate?: { __typename?: 'Candidate', id?: number | null, uuid?: string | null, positionTitle?: string | null, yearsOfExperience?: number | null, salaryExpectation?: number | null, salaryRateType?: any | null, about?: string | null, resumeUrl?: string | null, skills?: Array<{ __typename?: 'Skill', id: number, name: string } | null> | null } | null, recruiter?: { __typename?: 'Recruiter', id?: number | null } | null } | null };


export const HireApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"HireApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"redirectPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hireApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"redirectPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"redirectPath"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<HireApplicationMutation, HireApplicationMutationVariables>;
export const DeclineApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeclineApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declineApplicationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeclineApplicationInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declineApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"declineApplicationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declineApplicationInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeclineApplicationMutation, DeclineApplicationMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"candidateId"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signupUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signupUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname"}}]}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const UpdateCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCandidateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCandidateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"candidateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateCandidateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCandidateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positionTitle"}},{"kind":"Field","name":{"kind":"Name","value":"yearsOfExperience"}}]}}]}}]} as unknown as DocumentNode<UpdateCandidateMutation, UpdateCandidateMutationVariables>;
export const AddSkillToCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSkillToCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skillName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSkillToCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"candidateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"skillName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skillName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddSkillToCandidateMutation, AddSkillToCandidateMutationVariables>;
export const RemoveSkillFromCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSkillFromCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skillId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSkillFromCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"candidateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"skillId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skillId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveSkillFromCandidateMutation, RemoveSkillFromCandidateMutationVariables>;
export const UploadResumeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadResume"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resume"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadResume"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"candidateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"resume"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resume"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"resumeUrl"}}]}}]}}]} as unknown as DocumentNode<UploadResumeMutation, UploadResumeMutationVariables>;
export const RemoveResumeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveResume"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeResume"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"candidateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"resumeUrl"}}]}}]}}]} as unknown as DocumentNode<RemoveResumeMutation, RemoveResumeMutationVariables>;
export const CreateCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCompanyInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCompanyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCompanyInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCompanyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const VerifyAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<VerifyAccountMutation, VerifyAccountMutationVariables>;
export const ResendVerificationLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendVerificationLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendVerificationLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ResendVerificationLinkMutation, ResendVerificationLinkMutationVariables>;
export const SendPasswordResetLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendPasswordResetLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPasswordResetLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>;
export const CreateHiringStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHiringStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createHiringStepInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateHiringStepInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHiringStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createHiringStepInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createHiringStepInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateHiringStepMutation, CreateHiringStepMutationVariables>;
export const UpdateHiringStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHiringStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateHiringStepInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateHiringStepInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHiringStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateHiringStepInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateHiringStepInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdateHiringStepMutation, UpdateHiringStepMutationVariables>;
export const DeleteHiringStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteHiringStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteHiringStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<DeleteHiringStepMutation, DeleteHiringStepMutationVariables>;
export const CreateInterviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createInterview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createInterviewInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateInterviewInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInterview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createInterviewInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createInterviewInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"applicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"meetingLink"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"candidateId"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackId"}}]}}]}}]} as unknown as DocumentNode<CreateInterviewMutation, CreateInterviewMutationVariables>;
export const UpdateInterviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInterview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateInterviewInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateInterviewInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInterview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateInterviewInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateInterviewInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateInterviewMutation, UpdateInterviewMutationVariables>;
export const ImportQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"importQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interviewId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"importQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questionIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"interviewId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interviewId"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<ImportQuestionsMutation, ImportQuestionsMutationVariables>;
export const DeclineInterviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"declineInterview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"declineInterviewInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeclineInterviewInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declineInterview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"declineInterviewInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"declineInterviewInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeclineInterviewMutation, DeclineInterviewMutationVariables>;
export const SetNotificationReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetNotificationRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setNotificationRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"recipientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipientId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}}]}}]}}]} as unknown as DocumentNode<SetNotificationReadMutation, SetNotificationReadMutationVariables>;
export const CreatePositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPositionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePositionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPositionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPositionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreatePositionMutation, CreatePositionMutationVariables>;
export const UpdatePositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePositionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePositionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updatePositionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePositionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdatePositionMutation, UpdatePositionMutationVariables>;
export const PublishPositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}}]}}]}}]} as unknown as DocumentNode<PublishPositionMutation, PublishPositionMutationVariables>;
export const ApplyPositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"applyToPositionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ApplyToPositionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyToPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"applyToPositionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"applyToPositionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeslots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}}]}}]}}]}}]} as unknown as DocumentNode<ApplyPositionMutation, ApplyPositionMutationVariables>;
export const AddSkillToPositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSkillToPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skillName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSkillToPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"skillName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skillName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requiredSkills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddSkillToPositionMutation, AddSkillToPositionMutationVariables>;
export const RemoveSkillFromPositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSkillFromPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skillId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSkillFromPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"skillId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skillId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requiredSkills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveSkillFromPositionMutation, RemoveSkillFromPositionMutationVariables>;
export const CreateQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createQuestionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createQuestionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createQuestionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const UpdateQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateQuestionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateQuestionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateQuestionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]} as unknown as DocumentNode<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const RemoveQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<RemoveQuestionsMutation, RemoveQuestionsMutationVariables>;
export const CreateTimeslotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTimeslot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTimeslotInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTimeslotInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTimeslot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTimeslotInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTimeslotInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"candidateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"applicationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"applicationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTimeslotMutation, CreateTimeslotMutationVariables>;
export const DeleteTimeslotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTimeslot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTimeslot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"candidateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<DeleteTimeslotMutation, DeleteTimeslotMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resetPasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"candidateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"declineMessage"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upcomingInterview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"meetingLink"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRateType"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRate"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"requiredSkills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hiringSteps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"positionTitle"}},{"kind":"Field","name":{"kind":"Name","value":"yearsOfExperience"}},{"kind":"Field","name":{"kind":"Name","value":"salaryExpectation"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRateType"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetApplicationQuery, GetApplicationQueryVariables>;
export const GetApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetApplications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getApplications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"candidateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"candidateId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetApplicationsQuery, GetApplicationsQueryVariables>;
export const RefreshDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"expSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"candidateId"}},{"kind":"Field","name":{"kind":"Name","value":"recruiterId"}},{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"positionTitle"}},{"kind":"Field","name":{"kind":"Name","value":"yearsOfExperience"}},{"kind":"Field","name":{"kind":"Name","value":"salaryExpectation"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRateType"}},{"kind":"Field","name":{"kind":"Name","value":"about"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RefreshQuery, RefreshQueryVariables>;
export const GetCandidateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCandidateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCandidateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"positionTitle"}},{"kind":"Field","name":{"kind":"Name","value":"yearsOfExperience"}},{"kind":"Field","name":{"kind":"Name","value":"salaryExpectation"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRateType"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"resumeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetCandidateProfileQuery, GetCandidateProfileQueryVariables>;
export const GetProposalStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProposalStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"positionUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProposalStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"positionUuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"positionUuid"}}}]}]}}]} as unknown as DocumentNode<GetProposalStatusQuery, GetProposalStatusQueryVariables>;
export const SearchCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchCompanies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchCompanies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SearchCompaniesQuery, SearchCompaniesQueryVariables>;
export const GetInterviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInterviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getInterviewsWhereInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetInterviewsWhereInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInterviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getInterviewsWhereInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getInterviewsWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"meetingLink"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"hiringStepId"}},{"kind":"Field","name":{"kind":"Name","value":"applicationId"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}}]}}]}}]} as unknown as DocumentNode<GetInterviewsQuery, GetInterviewsQueryVariables>;
export const GetInterviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInterview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInterview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"meetingLink"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"candidateId"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"recruiterId"}},{"kind":"Field","name":{"kind":"Name","value":"declineReason"}},{"kind":"Field","name":{"kind":"Name","value":"declinedBy"}},{"kind":"Field","name":{"kind":"Name","value":"hiringStepId"}},{"kind":"Field","name":{"kind":"Name","value":"application"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]}}]} as unknown as DocumentNode<GetInterviewQuery, GetInterviewQueryVariables>;
export const GetNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"redirectPath"}},{"kind":"Field","name":{"kind":"Name","value":"recipientId"}}]}}]}}]} as unknown as DocumentNode<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetPositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isRemoteWorldWide"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRate"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRateType"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"hiringSteps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requiredSkills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"suggestedCandidates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"positionTitle"}},{"kind":"Field","name":{"kind":"Name","value":"yearsOfExperience"}},{"kind":"Field","name":{"kind":"Name","value":"salaryExpectation"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRateType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"applications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"positionTitle"}},{"kind":"Field","name":{"kind":"Name","value":"yearsOfExperience"}},{"kind":"Field","name":{"kind":"Name","value":"salaryExpectation"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRateType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationStatus"}}]}}]}}]} as unknown as DocumentNode<GetPositionQuery, GetPositionQueryVariables>;
export const GetPositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PositionWhereInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllPositions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isRemoteWorldWide"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRate"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRateType"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetPositionsQuery, GetPositionsQueryVariables>;
export const GetQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recruiterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"recruiterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recruiterId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"points"}}]}}]}}]} as unknown as DocumentNode<GetQuestionsQuery, GetQuestionsQueryVariables>;
export const SearchSkillsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchSkills"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchSkills"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SearchSkillsQuery, SearchSkillsQueryVariables>;
export const GetCalendarDayTimeslotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCalendarDayTimeslots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TimeslotsWhereInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCalendarDayTimeslots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}}]}}]}}]} as unknown as DocumentNode<GetCalendarDayTimeslotsQuery, GetCalendarDayTimeslotsQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"candidateId"}},{"kind":"Field","name":{"kind":"Name","value":"recruiterId"}},{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"positionTitle"}},{"kind":"Field","name":{"kind":"Name","value":"yearsOfExperience"}},{"kind":"Field","name":{"kind":"Name","value":"salaryExpectation"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRateType"}},{"kind":"Field","name":{"kind":"Name","value":"about"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"middlename"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"candidateId"}},{"kind":"Field","name":{"kind":"Name","value":"recruiterId"}},{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"positionTitle"}},{"kind":"Field","name":{"kind":"Name","value":"yearsOfExperience"}},{"kind":"Field","name":{"kind":"Name","value":"salaryExpectation"}},{"kind":"Field","name":{"kind":"Name","value":"salaryRateType"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"resumeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recruiter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;