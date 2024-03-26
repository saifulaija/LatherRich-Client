import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { answerOne, answerTwo,answerThree,answerFour } from './tab.const';




const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'আপনারা কি পণ্যের গুণগত মান নিশ্চিত করার জন্য কোন পদক্ষেপ গ্রহণ করেন?',
    children: <p className='text-blance text-textprimary font-mono'>{answerOne}</p>,
  },
  {
    key: '2',
    label: ' আপনাদের ডেলিভারি পদ্ধতি সম্পর্কে সহজে জানতে চাইলে আপনি কী করবেন?',
    children: <p className='text-blance text-textprimary font-mono'>{answerTwo}</p>,
  },
  {
    key: '3',
    label: 'আপনাদের ওয়েবসাইট থেকে কিভাবে অর্ডার করতে পারি?',
    children: <p className='text-blance text-textprimary font-mono'>{answerThree}</p>,
  },
  {
    key: '4',
    label: 'আমি পণ্যে অসন্তোষজনক হলে কি করতে পারি?',
    children: <p className='text-blance text-textprimary font-mono'>{answerFour}</p>,
  },
];

const Faq: React.FC = () => <Collapse accordion items={items} />;

export default Faq;