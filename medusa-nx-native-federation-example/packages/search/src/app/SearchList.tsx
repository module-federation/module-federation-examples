import React from 'react';
import { Row, Col } from 'antd';
import { initFederation, loadRemoteModule } from '@softarc/native-federation';
import { loadRemoteEntryVersionsMemo } from 'native-federation-plugin/lib';

let TextField: React.ComponentType<any>;
let Button: React.ComponentType<any>;

(async () => {
  const getRemoteVersions = loadRemoteEntryVersionsMemo('remotes.json');

  TextField = React.lazy(async () => {
    const remotes = await getRemoteVersions();
    const module = await loadRemoteModule({
      remoteName: 'dsl',
      exposedModule: './TextField',
      remoteEntry: remotes['dsl'] || 'http://localhost:3002/remoteEntry.json'
    });

    return module;
  });

  Button = React.lazy(async () => {
    const remotes = await getRemoteVersions();
    const module = await loadRemoteModule({
      remoteName: 'dsl',
      exposedModule: './Button',
      remoteEntry: remotes['dsl'] || 'http://localhost:3002/remoteEntry.json'
    });

    return module;
  });

  await initFederation();
})();

const SearchList = () => (
  <div>
    <Row gutter={6}>
      <Col span={20}>
        <React.Suspense fallback={<span />}>
          <TextField />
        </React.Suspense>
      </Col>
      <Col span={4}>
        <React.Suspense fallback={<span />}>
          <Button>Search</Button>
        </React.Suspense>
      </Col>
    </Row>
  </div>
);

export default SearchList;
