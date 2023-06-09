import { RelativePos } from 'layouts/properties';
import { FullScreen } from 'layouts/Screens';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { entries } from 'idb-keyval';

// (0): 내가 업로드하면 그 파일의 docId를 Local storage에 차근차근 업로드될때마다 저장하여 홈에서 내가 만들 파일 (/f) 에서 local storage를 불러와서 파일들을
// => 접근할 수 있도록 함. limit 이라면 local storage에도 limit이라고 저장되며 자물쇠 표시가 파일 옆에 떠 있음
// (0): doc id 만 저장하며 a tag로 map 하여 /v/(docid) 로 맵핑 해준다
// (0): local storage에 아무런 doc id가 없으면 파일이 없습니다 뜨게 하기
// (0): => null files를 쓰지만 error message를 달리하기 (고려)

// (0): 모든 값 가져오고 모든 값중 변경되는 것을 읽는다
// 변경: local storage가 아닌 indexeddb를 사용하며 안되는 브라우저는 접근 막기

// storage의 key는 docId, value는 url로 한다. 라이브러리는 localForage 사용하기

const MyFiles = () => {
  const [buckets, setBuckets] = useState<any>([]);

  useEffect(() => {
    const onLoad = async () => {
      // get datas in db
      let keys = [];
      let values = [];
      const datas = await entries();
      for (const i of datas.keys()) {
        const key = datas[i][0];
        const value = datas[i][1];
        keys = [...keys, key];
        values = [...values, value];
      }
      const buckets = {
        keys,
        values,
      };
      setBuckets(buckets);
    };
    onLoad().catch(error => {
      console.log(error);
    });
  }, []);

  console.log(buckets);

  return (
    <Container>
      <h1>My files</h1>
      <div>
        {Object.entries(buckets).map((data, index) => (
          <div></div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled(FullScreen)`
  ${RelativePos}
`;

export default MyFiles;
