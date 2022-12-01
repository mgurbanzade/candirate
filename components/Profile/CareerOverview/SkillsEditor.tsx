import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  ADD_SKILL_TO_CANDIDATE_MUTATION,
  REMOVE_SKILL_FROM_CANDIDATE_MUTATION,
} from '@gql/mutations/candidates';
import Tags from '@components/Tags';
import { Skill } from '@gql/types/graphql';

type SkillsEditorProps = {
  skills: Skill[] | any;
  candidateId: number | null | undefined;
};

const SkillsEditor = ({ skills, candidateId }: SkillsEditorProps) => {
  const [addSkillToCandidate] = useMutation(ADD_SKILL_TO_CANDIDATE_MUTATION);
  const [removeSkillFromCandidate] = useMutation(
    REMOVE_SKILL_FROM_CANDIDATE_MUTATION,
  );

  const [editorSkills, setEditorSkills] = useState(skills);
  const [inputVal, setInputVal] = useState('');
  const onRemoveSkill = async (skillId: number) => {
    if (!candidateId) return;
    try {
      const { errors } = await removeSkillFromCandidate({
        variables: {
          candidateId,
          skillId,
        },
      });

      if (!errors?.length) {
        setEditorSkills(editorSkills.filter((s: Skill) => s.id !== skillId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyup = async (e: any) => {
    if (!candidateId) return;
    const { value } = e.target;

    if (e.code === 'Comma') {
      const valueWithoutComma = value.slice(0, -1);
      if (editorSkills.find((s: Skill) => s.name === valueWithoutComma)) {
        return setInputVal('');
      }

      try {
        const { data } = await addSkillToCandidate({
          variables: {
            skillName: valueWithoutComma,
            candidateId,
          },
        });

        if (data?.addSkillToCandidate.skills?.[0]?.id) {
          setEditorSkills([
            ...editorSkills,
            {
              id: data?.addSkillToCandidate.skills[0].id,
              name: valueWithoutComma,
            },
          ]);

          setInputVal('');
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
