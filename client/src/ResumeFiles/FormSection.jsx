import React, { useState } from 'react'
import PersnolDetails from './FormComponents/PersnolDetails'
import Summary from './FormComponents/Summary'
import Experience from './FormComponents/Experience'
import Education from './FormComponents/Education'
import Skills from './FormComponents/Skills'
import ResumeName from './FormComponents/ResumeName'

const FormSection = () => {
  const [next, setNext] = useState(1)
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className='right-0 text-right gap-2'>
        {next > 1 && <button
          type="button" onClick={() => setNext(next - 1)}
          className=" bg-purple-500 mr-2 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        >
          Prev
        </button>
        }
        <button type="button" onClick={() => setNext(next + 1)}
          className=" bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">Next
        </button>
      </div>

      {/* Resume Name form */}
      {next == 1 ? <ResumeName /> : null}

      {/* persnol detaill form */}
      {next == 2 ? <PersnolDetails /> : null}

      {/* Summary */}
      {next == 3 ? <Summary /> : null}

      {/* Professional Experience */}
      {next == 4 ? <Experience /> : null}

      {/* Educatinal */}
      {next == 5 ? <Education /> : null}

      {/* Skills */}
      {next == 6 ? <Skills /> : null}

    </div>

  )
}

export default FormSection
