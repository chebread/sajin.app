import { deleteFiles } from 'api';

const onDelete = async (docId: string) => {
  console.log('delete file');
  await deleteFiles(docId).catch(() => {
    alert('파일 삭제중 오류 발생');
  });
};

export default onDelete;
