import React from 'react'

interface Props {
    page : string;
  }

const Form = ({page}:Props) => {
  return (
    <>
        {page === "distribution" && 
            <div>

            </div>
        }

        {page === "agents" && 
            <div>

            </div>
        }

        {page === "companies" && 
            <div>

            </div>
        }
    </>
  )
}

export default Form
