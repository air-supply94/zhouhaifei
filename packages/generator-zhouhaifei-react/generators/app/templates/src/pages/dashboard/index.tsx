import React from 'react';
import { Card } from 'antd';
import styles from './index.less';
import mock from 'mockjs';
import { request } from '../../utils';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

mock.mock('/api/test', 'get', {
  'list|100': [
    {
      name: '@city',
      'value|1-100': 50,
      'type|0-2': 1,
    },
  ],
});

class Store {
  @observable public age = 0;

  @action public setAge = () => {
    this.age++;
  };
}

const store = new Store();

export default observer(() => {
  React.useEffect(() => {
    request({ url: '/api/test' })
      .then((data) => {
        console.log(data);
      });

    request({ url: '/api/iac/role/user/perms' })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div
      className={styles.container}
      onClick={store.setAge}
    >
      <Card size="small">
        hello
        {store.age}
      </Card>
    </div>
  );
});
