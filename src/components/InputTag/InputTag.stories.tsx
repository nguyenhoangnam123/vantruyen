import InputTag from 'components/InputTag/InputTag';
import React from 'react';
import nameof from 'ts-nameof.macro';

export default {
  title: nameof(InputTag),
};

export function Default() {
  const [tags, setTags] = React.useState<string[]>(['Đen', 'Đỏ', 'Vàng']);

  return (
    <InputTag tags={tags} onChange={setTags}/>
  );
}
