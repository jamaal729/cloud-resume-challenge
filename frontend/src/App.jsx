import React from 'react';
import ResumeData from './data/ResumeData';
import HeaderBlock from './components/HeaderBlock';
import SectionsBlock from './components/SectionsBlock';
import FooterBlock from './components/FooterBlock';

function App() {
  return (
    <>
      <div className="page">
        <HeaderBlock data={ResumeData} />
        <SectionsBlock data={ResumeData} />
        <br />
        <FooterBlock data={ResumeData} />
      </div>
    </>
  );
}

export default App;
