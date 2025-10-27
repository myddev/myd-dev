import { useState } from 'react';
import { Button, Card, Space } from 'antd';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>골든 허니 테마 테스트</h1>
      <Space wrap>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="link">Link Button</Button>
      </Space>

      <Card title="테스트 카드" style={{ marginTop: 20 }}>
        <p>
          이 카드의 배경색(<code>colorBgContainer</code>)과 텍스트 색상(
          <code>colorTextBase</code>)은 모두 테마 토큰을 따릅니다.
        </p>
      </Card>
    </>
  );
}

export default App;
