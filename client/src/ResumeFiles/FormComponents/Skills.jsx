import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ResumeContext } from '../../context/ResumeContext';
import { useNavigate, useParams } from 'react-router-dom';

const Skills = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [skillInput, setSkillInput] = useState('');
  const [error, setError] = useState('');
  const { resumeId } = useParams()
  const navigate = useNavigate()
  console.log(resumeId)
  const handleAddSkill = () => {
    if (!skillInput.trim()) {
      setError('Skill cannot be empty');
      return;
    }
    if (resumeInfo.skills && resumeInfo.skills.includes(skillInput.trim())) {
      setError('Skill already exists');
      return;
    }

    const updatedSkills = [...(resumeInfo.skills || []), skillInput.trim()];
    setResumeInfo({ ...resumeInfo, skills: updatedSkills });
    setSkillInput('');
    setError('');
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = resumeInfo.skills.filter((_, i) => i !== index);
    setResumeInfo({ ...resumeInfo, skills: updatedSkills });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Replace the URL with your actual API endpoint
  //     const response = await axios.post('//save-skills', {
  //       skills: resumeInfo.skills,
  //     });
  //     console.log('Skills saved:', response.data);
  //     alert('Skills saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving skills:', error);
  //     alert('Failed to save skills.');
  //   }
  // };
  console.log(resumeInfo)
  const all = {
    ...resumeInfo,
    resumeId,
  }
  const sub = (e) => {
    console.log("Clicked")
    e.preventDefault();
    axios
      .post('http://localhost:3001/persnoldetail', all)
      .then((res) => {
        navigate(`/finalresume/${res.data._id}`)
        console.log(res.data)
      })
      .catch((err) => console.log(err));


  }
  return (
    <div className="max-w-lg mx-auto p-6 bg-white  rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Professional Skills</h2>
      <p className="text-gray-600 mb-6">Add skills to showcase in your resume.</p>
      <form className="space-y-4" >
        <div>
          <label className="block text-gray-600 font-medium mb-2">Add Skills</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name='skills'
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Enter a skill (e.g., JavaScript)"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Add
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Skills</h3>
          {resumeInfo.skills && resumeInfo.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {resumeInfo.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full shadow-sm"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-red-500 hover:text-red-600 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          onClick={sub}
          className="w-full  bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        >
          Save Resume
        </button>
      </form>
    </div>
  );
};

export default Skills;
