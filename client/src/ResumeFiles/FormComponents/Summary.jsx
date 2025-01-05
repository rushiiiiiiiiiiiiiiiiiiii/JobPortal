import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';

const Summary = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeContext);

    const handeldata = (e) => {
        const { name, value } = e.target;
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        });
    };
    // console.log(resumeInfo.summary)

    const sub = (e) => {
  e.preventDefault();
  axios
    .post('http://localhost:3001/summarydetail', { summary: resumeInfo.summary }) // Send only the summary
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

    return (
        <div>
            <h2 className="text-xl font-bold text-purple-700 mb-4">Summary Detail</h2>
            <p className="text-gray-600 mb-5">Add summary for your job title</p>
            <label className="block text-gray-600">Add Summary</label>

            <form className="space-y-4" onSubmit={sub}>
            <div className="flex justify-between items-end">
                       
                        <textarea
                            type="text"
                            name="summary"
                            onChange={handeldata}
                            required
                            defaultValue={resumeInfo?.summary}
                            className="w-full h-40 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        ></textarea>
                    </div>
<div className='mt-2 flex justify-end'>
                    {/* <button
                        type="button"
                        className="w- bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                    >
                        Save
                    </button> */}
                    </div>

            </form>
    </div >
  );
};

export default Summary;
