import cx from 'classnames';
import { CheckIcon as CheckMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { planFeatures } from './planFeatures';

const OnboardingSidebar = () => {
  const router = useRouter();
  const { type } = router.query;
  const title =
    type === 'r'
      ? 'Recruiter'
      : type === 'c'
      ? 'Candidate'
      : 'Interviewing made simple for recruiters and candidates';
  const featuresKey =
    type === 'r' ? 'recruiter' : type === 'c' ? 'candidate' : null;
  const features = featuresKey ? planFeatures[featuresKey] : [];
  const isRecruiter = type === 'r';
  const typeNotDefined = type !== 'r' && type !== 'c';
  return (
    <div
      className={cx('block text-white rounded-lg', {
        'bg-primary-500': !typeNotDefined,
      })}
    >
      <h2
        className={cx('mb-5 text-2xl font-semibold', {
          'text-3xl': typeNotDefined,
        })}
      >
        {title}
      </h2>
      {isRecruiter && (
        <p className="mb-4 font-light text-primary-100 sm:text-lg">
          30-day free trial
        </p>
      )}
      <ul role="list" className="space-y-4 text-left">
        {features.map((feature) => (
          <li key={feature} className="flex items-center space-x-3">
            <CheckMarkIcon className="flex-shrink-0 w-5 h-5 text-green-300" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnboardingSidebar;
