import Uploading from './panels/Uploading';
import Uploader from './panels/Uploader';
import { useAtom } from 'jotai';
import {
  docIdAtom,
  fileAtom,
  isFileAtom,
  isSelectedAtom,
  limitAtom,
  timeLimitAtom,
} from 'atoms';
import Uploaded from './panels/Uploaded';
import SelectModes from './panels/SelectModes';

// 업로드의 중심부

const Home = () => {
  const [, setFile] = useAtom(fileAtom);
  const [isFile, setIsFile] = useAtom(isFileAtom);
  const [docId, setDocId] = useAtom(docIdAtom);
  const [, setLimit] = useAtom(limitAtom);
  const [, setTimeLimit] = useAtom(timeLimitAtom);
  const [isSelected, setIsSelected] = useAtom(isSelectedAtom);

  // 모든 전역 상태를 초기화하여 uploader로 갈 수 있게 하게끔 한다
  const initAtoms = () => {
    setFile('');
    setIsFile(false);
    setDocId('');
    setLimit(false);
    setTimeLimit('');
    setIsSelected(false);
  };

  return !isFile ? (
    // 1) 입력된 파일이 없을때
    <Uploader />
  ) : // 파일이 입력됨
  docId === '' ? (
    !isSelected ? (
      // 2) 모드 선택
      <SelectModes />
    ) : (
      // 3) 업로딩중 + 파일 업로드 및 로딩 같이 수행
      // => 파일 업로드중 오류 발생시 / 으로 가며, 아직 빈 값인 docId 빼고 모든 값들을 초기화 하여 / 으로 접속될 수 있도록 함
      <Uploading init={initAtoms} />
    )
  ) : (
    // 4) 업로딩 완료
    // => atoms를 모두 초기화하여 다시 / 올때 docId이 빈 값이 아닐때 redirect가 되지 않도록 함
    <Uploaded init={initAtoms} />
  );
};

export default Home;
