import { useEffect, useRef, useState } from 'react';
import getUrl from 'lib/getUrl';
import styled from 'styled-components';
import editFiles from 'api/editFiles';
import getCurrentTime from 'lib/getCurrentTime';
import addTime from 'lib/addTime';
import dateToString from 'lib/dateToString';
import Select from 'react-select';
import { useAtom } from 'jotai';
import { fileDbAtom, timeLimitOptionsAtom } from 'atoms';
import onDelete from 'components/Viewer/onDelete';

const ImagesViewer = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const url = useRef(getUrl()); // current app url
  const docId = fileDb.docId;
  const src = fileDb.url;
  const limit = fileDb.limit;
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [modeToggle, setModeToggle] = useState(false);
  const [resetToggle, setResetToggle] = useState(false);

  const initValues = () => {
    setModeToggle(false);
    setResetToggle(false);
  };
  const onModeToggle = () => {
    setModeToggle(!modeToggle);
  };
  const onResetToggle = () => {
    setResetToggle(!resetToggle);
  };

  const onTurnOffLimitMode = async () => {
    await editFiles({
      docId: docId,
      limit: false,
      timeLimit: '', // 값 초기화함
    }).catch(() => {
      alert('수정중 오류 발생');
    });
    initValues();
  };
  const onModeSelect = async (e: any) => {
    const { value } = e; // value = sec
    if (value) {
      const currentTime = getCurrentTime();
      const timeLimit = dateToString(
        addTime({ currentTime: currentTime, sec: value })
      ); // time limit
      await editFiles({
        docId: docId,
        limit: true,
        timeLimit: timeLimit,
      }).catch(error => {
        alert('수정중 오류 발생');
      });
      initValues();
    }
  };

  // 기능을 작동시키는 버튼만 존재. 버튼의 component는 따로 구현
  return (
    <>
      <Img
        src={src}
        onError={() => {
          // (0): 세션 초과시 or public url 접근 오류시
          console.log('세션 초과됨');
        }}
      />
      <button onClick={() => onDelete(docId)}>delete file</button>
      {limit ? (
        // limit mode
        modeToggle ? (
          <>
            {resetToggle ? (
              //  time limit 시간 설정하기 (같음)
              <Select onChange={onModeSelect} options={timeLimitOptions} />
            ) : (
              <>
                <button onClick={onResetToggle}>
                  limit mode 값 재설정하기
                </button>
                <button onClick={onTurnOffLimitMode}>limit mode 끄기</button>
              </>
            )}
          </>
        ) : (
          <button onClick={onModeToggle}>limit mode 재설정하기</button>
        )
      ) : // normal mode
      modeToggle ? (
        //  time limit 시간 설정하기 (같음)
        <Select onChange={onModeSelect} options={timeLimitOptions} />
      ) : (
        <button onClick={onModeToggle}>limit mode 켜기</button>
      )}
    </>
  );
};

const Img = styled.img`
  width: 300px;
  height: 300px;
`;

export default ImagesViewer;
