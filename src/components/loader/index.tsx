import { Spin } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';

import './style.scss'

const Loader = () => (
  <Content className="loader-container">
    <Spin size="large" />
  </Content>
)

export default Loader;
