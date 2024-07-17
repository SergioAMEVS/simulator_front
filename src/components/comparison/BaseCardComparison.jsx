import { Box, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { palette } from '../../styles/palette'
import PropTypes from 'prop-types'
// import add from '../../assets/comparison/addComparison.svg'
import close from '../../assets/comparison/closeComparison.svg'
// import folder from '../../assets/comparison/folderComparison.svg'
import save from '../../assets/comparison/saveComparison.svg'

import SmallModal from '../common/SmallModal'
import SaveModalComparison from '../modal-content/SaveModalComparison'

const BaseCardComparison = ({
  children,
  comparisonScenarioTitle,
  handleCloseScenario,
  isDataReset,
  editingScenario
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSaveClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {!comparisonScenarioTitle || isDataReset ? (
        <Grid
          bgcolor={palette.cisco.PrimaryMain}
          padding={'12px 32px'}
          borderRadius={'12px 12px 0px 0px'}
        >
          <Typography
            color={palette.common.white}
            fontWeight={700}
            fontSize={'24px'}
            textAlign={'center'}
          >
            New Scenario
          </Typography>
        </Grid>
      ) : (
        <Grid
          bgcolor={palette.cisco.PrimaryMain}
          padding={'12px 32px'}
          borderRadius={'12px 12px 0px 0px'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Grid>
            <Typography
              color={palette.common.white}
              fontWeight={700}
              fontSize={'24px'}
              textTransform={'capitalize'}
            >
              {comparisonScenarioTitle}
            </Typography>
          </Grid>

          <Grid display={'flex'}>
            <Grid>
              <IconButton onClick={handleSaveClick}>
                <Box
                  component={'img'}
                  src={save}
                  alt='name'
                  height={'24px'}
                  width={'24px'}
                />
              </IconButton>
            </Grid>
            {isModalOpen && (
              <SmallModal
                modalId='saveTitle'
                openModalId={'saveTitle'}
                handleClose={handleModalClose}
              >
                <SaveModalComparison
                  handleClose={handleModalClose}
                  editingScenario={editingScenario}
                />
              </SmallModal>
            )}

            <Grid>
              <IconButton onClick={handleCloseScenario}>
                <Box
                  component={'img'}
                  src={close}
                  alt='name'
                  height={'24px'}
                  width={'24px'}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid bgcolor={palette.common.white} height={'100%'}>
        {children}
      </Grid>
      <Grid
        bgcolor={palette.cisco.PrimaryMain}
        height={'8px'}
        borderRadius={'0px 0px 12px 12px'}
      />
    </>
  )
}

export default React.memo(BaseCardComparison)

BaseCardComparison.propTypes = {
  children: PropTypes.node,
  comparisonScenarioTitle: PropTypes.string,
  handleSaveScenario: PropTypes.func,
  handleCloseScenario: PropTypes.func,
  isDataReset: PropTypes.bool,
  editingScenario: PropTypes.number
}
