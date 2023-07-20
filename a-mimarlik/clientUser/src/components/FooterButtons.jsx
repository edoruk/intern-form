import { useState } from "react"
import { CircularProgress, Alert } from "@mui/material"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons"

export default function FooterButtons({
  page,
  setPage,
  formData,
  setAnimateDir,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleClick(formData) {
    if (page === 2) {
      try {
        setIsLoading(true)
        await axios.post("http://localhost:4000/api/interns", formData)
        console.log("succesfully submitted", formData)
        setSuccess(true)
      } catch (error) {
        setError(error)
      }
    }
    setIsLoading(false)
    setAnimateDir(1)
    setPage((currentPage) => currentPage + 1)
  }

  return (
    <>
      {!success ? (
        !error ? (
          !isLoading ? (
            <section
              id="footer"
              className="w-[80%] pb-8 flex justify-center items-center gap-[30%] pt-20 md:fixed md:bottom-8 "
            >
              <button
                className={`flex flex-row-reverse items-center justify-center gap-[1px] ${
                  page === 0 && "invisible"
                }`}
                onClick={() => {
                  setAnimateDir(-1)
                  setPage((currentPage) => currentPage - 1)
                }}
              >
                <p className="text-[25px] font-[200]">Prev</p>
                <FontAwesomeIcon icon={faChevronLeft} className="text-[3rem]" />
              </button>
              <button
                className="flex flex-row items-center justify-center gap-[1px]"
                onClick={
                  () => {
                    handleClick(formData)
                  }

                  //   isValidEmail(formData.email)

                  // : null
                }
              >
                <p className="text-[25px] font-[200]">
                  {page == 2 ? "Submit" : "Next"}
                </p>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-[3rem]"
                />
              </button>
            </section>
          ) : (
            <CircularProgress />
          )
        ) : (
          <Alert severity="error">
            An error has occured! Please try again...
          </Alert>
        )
      ) : (
        <Alert severity="success">Successully uploaded!</Alert>
      )}
    </>
  )
}
