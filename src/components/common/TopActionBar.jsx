import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material'
import React, { useState } from 'react'
import { palette } from '../../styles/palette'
import edit from '../../assets/action-bar/edit.svg'
import save from '../../assets/action-bar/save.svg'
import deleteButton from '../../assets/action-bar/delete.svg'
import close from '../../assets/action-bar/close.svg'
import SmallModal from './SmallModal'
import EditModal from '../modal-content/EditModal'
import SaveModal from '../modal-content/SaveModal'
import DeleteModal from '../modal-content/DeleteModal'
import CloseModal from '../modal-content/CloseModal'
import {
  useApiResponseDataStore,
  useScenarioTitle,
  useStepsStore
} from '../../store/store'
import TooltipComponent from './TooltipComponent'

const TopActionBar = () => {
  const [openModalId, setOpenModalId] = useState(null)
  const { apiResponse } = useApiResponseDataStore()
  const { title } = useScenarioTitle()
  const { mainStep, subStep, stepsData, setMainStep, setSubStep, active } =
    useStepsStore()

  const lScreen = useMediaQuery('(max-width:1919px)')

  const handleOpen = (modalId, step) => {
    setOpenModalId(modalId)
    setMainStep(0)
    setSubStep(step - 1)
  }
  const handleClose = () => setOpenModalId(null)

  const actionsButtons = [
    {
      title: 'Edit Title',
      icon: edit,
      modalId: 'editTitle',
      step: 2
    },
    {
      title: 'Save Scenario',
      icon: save,
      modalId: 'saveTitle',
      step: 3
    },
    {
      title: 'Delete Scenario',
      icon: deleteButton,
      modalId: 'deleteTitle',
      step: 4
    },
    {
      title: 'Close Scenario',
      icon: close,
      modalId: 'closeTitle',
      step: 5
    }
  ]

  return (
    <Grid
      position={'absolute'}
      display={'flex'}
      justifyContent={'space-between'}
      p={'9px 80px 12px 24px'}
      color={palette.common.black}
      bgcolor={palette.gray.menu.green}
      borderRadius={'0px 5px 5px 0px'}
      width={lScreen ? '96vw' : '97vw'}
      zIndex={2}
    >
      <Grid>
        <Typography fontWeight={700} fontSize={'1.8em'} ml={5}>
          {title}
        </Typography>
      </Grid>
      <Grid paddingRight={9}>
        {actionsButtons.map((button, index) => {
          return (
            <React.Fragment key={index}>
              {active &&
              stepsData[mainStep] &&
              stepsData[mainStep].label === 'Filters' &&
              stepsData[mainStep].subSteps[button.step - 1] &&
              stepsData[mainStep].subSteps[button.step - 1].step ===
                subStep + 1 ? (
                <TooltipComponent
                  data={stepsData[mainStep].subSteps[button.step - 1].tooltip}
                  placement='bottom'
                >
                  <IconButton
                    onClick={() => handleOpen(button.modalId, button.step)}
                  >
                    <Box component={'img'} src={button.icon} />
                  </IconButton>
                </TooltipComponent>
              ) : (
                <Tooltip title={button.title}>
                  <IconButton
                    onClick={() => handleOpen(button.modalId, button.step)}
                  >
                    <Box component={'img'} src={button.icon} />
                  </IconButton>
                </Tooltip>
              )}
            </React.Fragment>
          )
        })}
      </Grid>
      {openModalId && (
        <SmallModal
          modalId='editTitle'
          openModalId={openModalId}
          handleClose={handleClose}
        >
          <EditModal isEdit={true} handleClose={handleClose} />
        </SmallModal>
      )}
      {openModalId && (
        <SmallModal
          modalId='saveTitle'
          openModalId={openModalId}
          handleClose={handleClose}
        >
          <SaveModal handleClose={handleClose} />
        </SmallModal>
      )}
      {openModalId && (
        <SmallModal
          modalId='deleteTitle'
          openModalId={openModalId}
          handleClose={handleClose}
        >
          <DeleteModal handleClose={handleClose} />
        </SmallModal>
      )}
      {openModalId && (
        <SmallModal
          modalId='closeTitle'
          openModalId={openModalId}
          handleClose={handleClose}
        >
          <CloseModal handleClose={handleClose} />
        </SmallModal>
      )}
    </Grid>
  )
}

export default TopActionBar
