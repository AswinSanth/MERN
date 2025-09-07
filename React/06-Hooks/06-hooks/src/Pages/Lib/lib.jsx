import './lib.css';
import { Button, Rate } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Lib = () => {
  const [star, setStar] = useState(0);
  return (
    <div className="lib">
      <h2>Lib</h2>
      <Button type="primary" icon={<ArrowDownOutlined />}>
        Download
      </Button>
      <Rate
        allowHalf
        onChange={star => {
          setStar(star);
        }}
      />
      <h1>{star}</h1>
    </div>
  );
};
export default Lib;
