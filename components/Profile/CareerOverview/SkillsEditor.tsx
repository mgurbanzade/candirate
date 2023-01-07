import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  ADD_SKILL_TO_CANDIDATE_MUTATION,
  REMOVE_SKILL_FROM_CANDIDATE_MUTATION,
} from '@gql/mutations/candidates';

import {
  ADD_SKILL_TO_POSITION_MUTATION,
  REMOVE_SKILL_FROM_POSITION_MUTATION,
} from '@gql/mutations/positions';
import Tags from '@components/Tags';
import { Skill } from '@gql/types/graphql';

type SkillsEditorProps = {
  skills: Skill[] | any;
  candidateId?: number | null | undefined;
  positionId?: number | null | undefined;
  refetchPosition?: () => void;
  refetchProfile?: () => void;
};

const SkillsEditor = ({
  skills,
  positionId,
  candidateId,
  refetchPosition,
  refetchProfile,
}: SkillsEditorProps) => {
  const [addSkillToCandidate] = useMutation(ADD_SKILL_TO_CANDIDATE_MUTATION);
  const [addSkillToPosition] = useMutation(ADD_SKILL_TO_POSITION_MUTATION);
  const [removeSkillFromPosition] = useMutation(
    REMOVE_SKILL_FROM_POSITION_MUTATION,
  );
  const [removeSkillFromCandidate] = useMutation(
    REMOVE_SKILL_FROM_CANDIDATE_MUTATION,
  );

  const [editorSkills, setEditorSkills] = useState(skills);
  const [inputVal, setInputVal] = useState('');

  const onRemoveSkill = async (skillId: number) => {
    if (!candidateId && !positionId) return;

    const refetchFunc = candidateId ? refetchProfile : refetchPosition;
    const mutationCallback = candidateId
      ? removeSkillFromCandidate
      : removeSkillFromPosition;

    const dynamicFields = {
      [candidateId ? 'candidateId' : 'positionId']: candidateId || positionId,
    };

    try {
      const { errors } = await mutationCallback({
        variables: {
          ...(dynamicFields as any),
          skillId,
        },
      });

      if (!errors?.length) {
        setEditorSkills(editorSkills.filter((s: Skill) => s.id !== skillId));
        (refetchFunc as any)();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyup = async (e: any) => {
    if (!candidateId && !positionId) return;
    const { value } = e.target;
    const refetchFunc = candidateId ? refetchProfile : refetchPosition;

    const mutationCallback = candidateId
      ? addSkillToCandidate
      : addSkillToPosition;

    const dynamicFields = {
      [candidateId ? 'candidateId' : 'positionId']: candidateId || positionId,
    };

    if (e.code === 'Comma') {
      const valueWithoutComma = value.slice(0, -1);
      if (editorSkills.find((s: Skill) => s.name === valueWithoutComma)) {
        return setInputVal('');
      }

      try {
        const { data } = await mutationCallback({
          variables: {
            ...(dynamicFields as any),
            skillName: valueWithoutComma,
          },
        });

        const dbSkillId = candidateId
          ? (data as any).addSkillToCandidate.skills?.find(
              (sk: Skill) => sk.name === valueWithoutComma,
            )?.id
          : (data as any).addSkillToPosition?.requiredSkills?.find(
              (sk: Skill) => sk.name === valueWithoutComma,
            )?.id;

        if (dbSkillId) {
          setEditorSkills([
            ...editorSkills,
            {
              id: dbSkillId,
              name: valueWithoutComma,
            },
          ]);

          setInputVal('');
          (refetchFunc as any)();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <Tags tags={editorSkills} onRemove={onRemoveSkill} isDraggable />
      <input
        type="text"
        placeholder='Add skills, separate by comma e.g. "React, JavaScript, Node.js"'
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyUp={handleKeyup}
        className="border-0 outline outline-none focus:border-transparent focus:ring-0 placeholder-gray-400 text-gray-600 text-sm"
      />
    </div>
  );
};

export default SkillsEditor;
