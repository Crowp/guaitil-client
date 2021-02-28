import { useEffect, useState } from 'react';
import { faMapMarkedAlt, faStore, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const onlyMemberSteps = [{ icon: 'user', title: 'Personal' }];
const memberWithLocalSteps = [
  ...onlyMemberSteps,
  { icon: faStore, title: 'Local' },
  { icon: faMapMarkedAlt, title: 'Dirección' },
  { icon: faCloudUploadAlt, title: 'Multimedia' }
];

const useMemberSteps = ({ hasLocal, isUpdate }) => {
  const [steps, setSteps] = useState(memberWithLocalSteps);

  useEffect(() => {
    if (hasLocal) {
      setSteps(memberWithLocalSteps);
    } else {
      setSteps(onlyMemberSteps);
    }
  }, [hasLocal]);

  useEffect(() => {
    if (isUpdate) {
      setSteps(onlyMemberSteps);
    }
  }, [isUpdate]);

  return steps;
};

export default useMemberSteps;
