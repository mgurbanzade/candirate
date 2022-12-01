import { Skill } from '@gql/types/graphql';
import dynamic from 'next/dynamic';
import Tag from './Tag';
import { Maybe } from '@gql/types/graphql';

const DraggableArea = dynamic(
  () => import('react-draggable-tags').then((mod) => mod.DraggableArea),
  {
    ssr: false,
  },
);

type Tag = {
  id: number;
  name: string;
};

type Props = {
  tags: Tag[] | Maybe<Skill>[];
  isDraggable: boolean;
  onRemove?: (tag: any) => void;
};

const Tags = ({ tags, onRemove, isDraggable }: Props) => {
  if (!tags.length) return null;
  const content = isDraggable ? (
    <DraggableArea
      tags={tags}
      render={({ tag }) => (
        <Tag
          key={(tag as Tag).id}
          data={tag as Tag}
          onRemove={onRemove}
          withRemoveBtn
        />
      )}
      onChange={(tags) => console.log(tags)}
    />
  ) : (
    <div>
      {tags.map((tag) => (
        <Tag key={(tag as Tag).id} data={tag as Tag} />
      ))}
    </div>
  );
  return <div className="tags">{content}</div>;
};

export default Tags;
