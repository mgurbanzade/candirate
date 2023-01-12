import cx from 'classnames';
import { Tooltip } from 'flowbite-react';
import { Application } from '@gql/types/graphql';
import {
  LockClosedIcon,
  LockOpenIcon,
  CheckIcon,
} from '@heroicons/react/20/solid';

type Props = {
  application: Application;
};

const getStatusIcon = (application: Application, step: any) => {
  if (
    application.status === 'INVITED' &&
    (application.currentStep?.id as number) > step.id
  ) {
    return CheckIcon;
  }
  if (
    application.status === 'INVITED' &&
    (application.currentStep?.id as number) === step.id
  ) {
    return LockOpenIcon;
  }
  return LockClosedIcon;
};

const getStatusItems = (application: Application) => {
  const steps = (application?.position?.hiringSteps?.length as number) + 1;
  const progressUnit = 100 / steps;
  return [
    {
      id: 'applied',
      title: 'Applied',
      icon: CheckIcon,
      progressPercent: 0,
    },
    ...(application?.position?.hiringSteps?.map((step) => ({
      id: step?.order,
      title: step?.title,
      icon: getStatusIcon(application, step),
      progressPercent: progressUnit * (step?.order as number),
    })) || []),
    {
      id: 'hired',
      title: 'Hired',
      icon: LockClosedIcon,
      progressPercent: 100,
    },
  ];
};

const ApplicationStatus = ({ application }: Props) => {
  const { currentStep } = application;
  const statusItems = getStatusItems(application);
  const progressPercent = statusItems.find(
    (item) => item.id === currentStep?.order,
  )?.progressPercent;

  return (
    <div className="flex items-center p-8">
      <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700 relative">
        <div className="flex items-center justify-between top-0 bottom-0 m-auto absolute w-full">
          {statusItems.map((step) => {
            return (
              <Tooltip
                key={step.id}
                className="tooltip-step"
                content={step.title}
              >
                <div
                  className={cx(
                    'w-8 h-8 rounded-full bg-white border border-orange-500 shadow-sm',
                    {
                      'bg-green-500 !border-white':
                        step.id === 'applied' ||
                        (currentStep?.order as number) > (step?.id as number),
                      '!border-green-500':
                        application.status === 'INVITED' &&
                        step.id === currentStep?.order,
                    },
                  )}
                  key={step.id}
                >
                  <div className="relative" style={{ height: '29px' }}>
                    <step.icon
                      className={cx(
                        'w-4 h-4 text-orange-500 absolute left-0 right-0 top-0 bottom-0 m-auto',
                        {
                          '!text-white':
                            step.id === 'applied' ||
                            (step.id as number) <
                              (currentStep?.order as number),
                          '!text-green-500': currentStep?.order === step.id,
                        },
                      )}
                    />
                  </div>
                </div>
              </Tooltip>
            );
          })}
        </div>
        <div
          className="h-4 bg-green-500 rounded-full"
          style={{
            width:
              application.status === 'APPLIED'
                ? `${12.5}%`
                : `${progressPercent as number}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
