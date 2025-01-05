import React, { useState } from "react";
import FormSection from "./FormSection";
import ResumePreview from "./ResumePreview";
import { ResumeContext } from "../context/ResumeContext";
import Layout from "../Reuse/Layout";

const CreateResume = () => {
    const [resumeInfo, setResumeInfo] = useState({})
    
  return (
    <ResumeContext.Provider value={{resumeInfo,setResumeInfo}}>
    <Layout >

    <div className="min-h-screen bg-gray-50 pt-20 p-5 border-b-2 border-red-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormSection/>
        <ResumePreview/>
      </div>
    </div>

    </Layout>
    </ResumeContext.Provider>

  );
};

export default CreateResume;
