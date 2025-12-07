import React from 'react';
import ResumeData from './data/ResumeData';
import HeaderBlock from './components/HeaderBlock';
import SectionsBlock from './components/SectionsBlock';
import CounterBlock from './components/CounterBlock';

function App() {
  return (
    <>
      <div className="page">
        <HeaderBlock data={ResumeData} />
        <SectionsBlock data={ResumeData} />
        <br />
        <CounterBlock />
      </div>
    </>
  );
}

export default App;
