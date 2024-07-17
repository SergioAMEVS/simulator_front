import { Grid, Modal, useMediaQuery } from '@mui/material'
import sidebarBg from '../../assets/sidebarBg.jpg'
import sidebarBgCollapsed from '../../assets/sidebarBgCollapsed.jpg'
import SidebarButton from './SidebarButton'
import React, { useEffect, useState } from 'react'
import { buttons } from '../../data/sidebarButtons'
import SidebarSubButton from './SidebarSubButton'
import WarningModal from '../modal-content/WarningModal'
import { useNavigate } from 'react-router-dom'
import {
  useApiResponseDataStore,
  useComparisonScenarioTitle1,
  useComparisonScenarioTitle2,
  useComparisonScenarioTitle3,
  useIsLoadScenario,
  useIsLoadScenario1,
  useModalStore,
  useMouseOverStore,
  useScenarioId,
  useScenarioId2,
  useScenarioId3,
  useScenarioTitle,
  useSelectedScenarioFilters,
  useStepsStore
} from '../../store/store'
import LoadingComponent from './LoadingComponent'

const sidebarContainer = {
  // backgroundImage: `url(${sidebarBg})`,
  backgroundImage: `linear-gradient(to top, #005568, #018297)`,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  paddingTop: '65px',
  width: '187px'
}

const sidebarCollapsedContainer = {
  // backgroundImage: `url(${sidebarBgCollapsed})`,
  backgroundImage: `linear-gradient(to top, #005568, #018297)`,
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  paddingTop: '65px',
  width: '60px'
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  padding: '36px'
}

const Sidebar = React.memo(function Sidebar() {
  const [selectedButton, setSelectedButton] = useState('Pricing')
  const [openModal, setOpenModal] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const onMouseover = useMouseOverStore((state) => state.onMouseover)
  const setOnMouseover = useMouseOverStore((state) => state.setOnMouseover)
  const lScreen = useMediaQuery('(max-width:1919px)')
  const { apiResponse, resetApiResponse } = useApiResponseDataStore()
  const { resetSelectedScenarioFilters } = useSelectedScenarioFilters()
  const { resetScenarioTitle } = useScenarioTitle()
  const { setActive } = useStepsStore()
  const { resetApiResponse1 } = useComparisonScenarioTitle1()
  const { resetApiResponse2 } = useComparisonScenarioTitle2()
  const { resetApiResponse3 } = useComparisonScenarioTitle3()
  const { resetSaveScanrioId } = useScenarioId()
  const { setIsLoadScenario } = useIsLoadScenario()
  const { resetSaveScanrioId2 } = useScenarioId2()
  const { resetSaveScanrioId3 } = useScenarioId3()
  const { setIsLoadScenario1 } = useIsLoadScenario1()
  const { setOpenModal: setOpenModalStore } = useModalStore()

  const isApiResponseEmpty =
    !apiResponse?.barChart || apiResponse?.barChart === 0

  const navigate = useNavigate()

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => {
    setOpenModal(false)
  }

  const handleMouseEnter = () => {
    setOnMouseover(true)
  }

  const handleMouseLeave = () => {
    setOnMouseover(false)
  }

  const handleButtonClick = (button) => {
    if (button.title === 'Home') {
      setOnMouseover(false)
      setSelectedButton(button.title)
      setActive(false)
      setOpenModal(false)
      resetApiResponse()
      resetSelectedScenarioFilters()
      resetScenarioTitle()
      resetApiResponse1()
      resetApiResponse2()
      resetApiResponse3()
      resetSaveScanrioId()
      resetSaveScanrioId2()
      resetSaveScanrioId3()
      setIsLoadScenario(false)
      setIsLoadScenario1(false)
    } else if (button.title === 'Comparison View') {
      setOnMouseover(false)
      setSelectedButton(button.title)
      setActive(false)
      setOpenModal(false)
      resetApiResponse()
      resetSelectedScenarioFilters()
      resetScenarioTitle()
      resetApiResponse1()
      resetApiResponse2()
      resetApiResponse3()
      resetSaveScanrioId()
      resetSaveScanrioId2()
      resetSaveScanrioId3()
      setIsLoadScenario(false)
      setIsLoadScenario1(false)
      setOpenModalStore(false)
    } else if (button.title === 'Glossary' && !isApiResponseEmpty) {
      setSelectedButton(button.title)
      handleOpen()
    } else {
      setSelectedButton(button.title)
    }
  }

  const goToUrl = () => {
    navigate(import.meta.env.VITE_BASE_URL2 + 'glossary')
    setOpenModal(false)
    setOnMouseover(false)
    setSelectedButton('Glossary')
    resetApiResponse()
    resetSelectedScenarioFilters()
    resetScenarioTitle()
  }

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = resolve
        img.src = src
      })
    }

    const buttonImages = buttons
      .flatMap((button) => [
        button.iconWhite,
        button.iconBlue,
        button.iconDisabled,
        ...(button.subButtons?.flatMap((subButton) => [
          subButton.iconWhite,
          subButton.iconBlue,
          subButton.iconDisabled
        ]) || [])
      ])
      .filter(Boolean)

    Promise.all([
      loadImage(sidebarBg),
      loadImage(sidebarBgCollapsed),
      ...buttonImages.map(loadImage)
    ]).then(() => setImagesLoaded(true))
  }, [])

  if (!imagesLoaded) {
    return <LoadingComponent />
  }

  return (
    <Grid
      style={onMouseover ? sidebarContainer : sidebarCollapsedContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      height={lScreen ? 'calc(100vh - 77px)' : 'calc(100vh - 78px)'}
      position={'absolute'}
      zIndex={3}
    >
      {buttons.map((button, index) => {
        const isSubButtonSelected = button.subButtons?.some(
          (subButton) => subButton.title === selectedButton
        )
        const isLast = index === buttons.length - 1
        const isFirst = index === 0
        const isButtonDisabled =
          (isApiResponseEmpty && button.title === 'Detailed View') ||
          button.title === 'Comparison'

        return (
          <React.Fragment key={button.title}>
            <SidebarButton
              onClickSelected={() => {
                handleButtonClick(button)
              }}
              isSelected={
                selectedButton === button.title || isSubButtonSelected
              }
              title={onMouseover ? button.title : button.abbreviatedTitle}
              url={button.url}
              isFirst={isFirst}
              isLast={isLast}
              icon={
                !onMouseover &&
                (selectedButton === button.title
                  ? button.iconBlue
                  : button.iconWhite)
              }
              disabled={isButtonDisabled}
              handleOpen={handleOpen}
              isApiResponseEmpty={isApiResponseEmpty}
            />
            {button.subButtons &&
              onMouseover &&
              button.subButtons.map((subButton, index) => {
                return (
                  <Grid
                    key={index}
                    display={'flex'}
                    justifyContent={'center'}
                    p={'10px'}
                  >
                    <SidebarSubButton
                      key={subButton.title}
                      onClickSelected={() => {
                        setSelectedButton(subButton.title)
                      }}
                      isSelected={selectedButton === subButton.title}
                      title={subButton.title}
                      url={subButton.url}
                      icon={
                        isButtonDisabled
                          ? subButton.iconDisabled
                          : selectedButton === subButton.title
                            ? subButton.iconBlue
                            : subButton.iconWhite
                      }
                      disabled={isButtonDisabled}
                    />
                  </Grid>
                )
              })}
          </React.Fragment>
        )
      })}
      {openModal && (
        <Modal open={openModal} onClose={handleClose}>
          <Grid sx={style}>
            <WarningModal handleClose={handleClose} leave={goToUrl} />
          </Grid>
        </Modal>
      )}
    </Grid>
  )
})

export default Sidebar
