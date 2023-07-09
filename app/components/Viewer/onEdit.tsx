import { updateFilesDesc } from 'api';

const onEdit = async ({ docId, content }) => {
  await updateFilesDesc({ docId, content }).catch(() => {
    alert('설명 수정중 오류 발생');
  });
};

export default onEdit;
