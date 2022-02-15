import React from 'react'
import { Box, Modal } from '@mui/material'
import { useEffect } from 'react'

export function ViewDetailsModal({ open, handleClose, currApp }) {
  useEffect(() => {
    dateConvertion()
  }, [])

  const style = {
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  }
  

  const dateConvertion = (time) => {
    const newTime = new Date(time)
    const Year = newTime.getFullYear()
    const Month = newTime.getMonth() + 1
    const Day = newTime.getDate()
    const fullYear = `${Day}/${Month}/${Year}`
    return fullYear
  }
  const currAppInfo = () => {
    let size = Object.keys(currApp).length

    if (!size) return
    if (currApp.drugs.length) {
      return `Date: ${dateConvertion(currApp.date)}\nDescription: ${
        currApp.description
      } 
         Drugs: ${currApp.drugs.map((drug) => drug.title)}\nReferrals: ${
        currApp.referrals ? currApp.referrals.title : 'No referrals'
      }`
    } else {
      return `Date: ${dateConvertion(currApp.date)}\nDescription: ${
        currApp.description
      }\nDrugs: No Drugs to show`
    }
  }

  if (!currApp) return
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="add-treatment">
          <div>
            <div className="modal-header">
              <div>{dateConvertion(Date.now())}</div>
              <button onClick={handleClose}>X</button>
            </div>
            <div className="modal-info-continer doc-pat flex column justify-center align-center">
              <div className="main-view-details-content">
                <input
                  className="view-details-input"
                  type="text"
                  disabled
                  value={currApp.title}
                />

                <textarea
                  className="view-details-textarea"
                  value={currAppInfo()}
                  disabled
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
