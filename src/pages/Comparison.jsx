import { Grid, useMediaQuery } from '@mui/material'
import BgTabs from '../components/common/BgTabs'
import ComparisonScenario from '../components/comparison/ComparisonScenario'
import {
  useApiResponseDataStore,
  useComparisonScenarioTitle1,
  useComparisonScenarioTitle2,
  useComparisonScenarioTitle3,
  useCurrentEditingScenario,
  useFiltersDataStoreComparison1,
  useFiltersDataStoreComparison2,
  useFiltersDataStoreComparison3,
  useIsLoadScenario1,
  useModalStore,
  useScenarioId,
  useScenarioId2,
  useScenarioId3,
  useSelectedScenarioFilters
} from '../store/store'
import useApi from '../hooks/useCallApi'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  createLineStyleChartComparison,
  createLinechartComparison
} from '../helpers/chart-convert-data-comparison'

// import { useApiResponseDataStore } from '../store/store'

const Comparison = () => {
  const xl = useMediaQuery('(max-width:1919px)')
  const [isDataReset1, setIsDataReset1] = useState(false)
  const [isDataReset2, setIsDataReset2] = useState(false)
  const [isDataReset3, setIsDataReset3] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [isLoading3, setIsLoading3] = useState(false)
  // const [editingScenario, setEditingScenario] = useState(null)

  const {
    comparisonScenarioTitle1,
    savecomparisonResponseData1,
    comparisonResponse1,
    resetApiResponse1
  } = useComparisonScenarioTitle1()
  const {
    comparisonScenarioTitle2,
    savecomparisonResponseData2,
    comparisonResponse2,
    resetApiResponse2
  } = useComparisonScenarioTitle2()
  const {
    comparisonScenarioTitle3,
    savecomparisonResponseData3,
    comparisonResponse3,
    resetApiResponse3
  } = useComparisonScenarioTitle3()

  const prevFilters1 = useRef()
  const prevFilters2 = useRef()
  const prevFilters3 = useRef()

  // Charts Filters
  const { filters1 } = useFiltersDataStoreComparison1()
  const { filters2 } = useFiltersDataStoreComparison2()
  const { filters3 } = useFiltersDataStoreComparison3()

  // Charts API Call
  const { post: postData } = useApi('apply')
  const { post: postDataScenario2 } = useApi('apply')
  const { post: postDataScenario3 } = useApi('apply')

  const { setCurrentEditingScenario } = useCurrentEditingScenario()
  const { resetSelectedScenarioFilters } = useSelectedScenarioFilters()
  const { resetApiResponse } = useApiResponseDataStore()

  const { setOpenModal } = useModalStore()
  const { resetSaveScanrioId } = useScenarioId()
  const { resetSaveScanrioId2 } = useScenarioId2()
  const { resetSaveScanrioId3 } = useScenarioId3()

  const handleOpenModal = useCallback(
    (scenarioNumber) => {
      setOpenModal(true)
      setCurrentEditingScenario(scenarioNumber)
      resetSelectedScenarioFilters()
      resetApiResponse()

      switch (scenarioNumber) {
        case 1:
          resetSaveScanrioId()
          break
        case 2:
          resetSaveScanrioId2()
          break
        case 3:
          resetSaveScanrioId3()
          break
        default:
          console.log('No scenario')
      }
    },
    [setOpenModal]
  )

  const handleCloseModal = useCallback(() => {
    setOpenModal(false)
  }, [])

  const handleOpenScenarioAPI = async () => {
    setIsLoading(true)
    prevFilters1.current = filters1
    try {
      const response = await postData(filters1)
      savecomparisonResponseData1(response)
    } catch (error) {
      console.error('Error :', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenScenario2API = async () => {
    setIsLoading2(true)
    prevFilters2.current = filters2
    try {
      const response = await postDataScenario2(filters2)
      savecomparisonResponseData2(response)
    } catch (error) {
      console.error('Error :', error)
    } finally {
      setIsLoading2(false)
    }
  }

  const handleOpenScenario3API = async () => {
    setIsLoading3(true)
    prevFilters3.current = filters3
    try {
      const response = await postDataScenario3(filters3)
      savecomparisonResponseData3(response)
    } catch (error) {
      console.error('Error :', error)
    } finally {
      setIsLoading3(false)
    }
  }
  // EXAMPLE IF IS NECESARY TO BLOCK THE BUTTON TO DO AGAIN THE QUERY
  // const handleOpenScenario3API = async () => {
  //   if (JSON.stringify(prevFilters3.current) !== JSON.stringify(filters3)) {
  //     setIsLoading3(true)
  //     prevFilters3.current = filters3
  //     try {
  //       const response = await postDataScenario3(filters3)
  //       savecomparisonResponseData3(response)
  //     } catch (error) {
  //       console.error('Error :', error)
  //     } finally {
  //       setIsLoading3(false)
  //     }
  //   }
  // }

  const lineChartData = useMemo(() => {
    if (comparisonResponse1) {
      return createLinechartComparison(comparisonResponse1?.multiLineChart)
    }
    return null
  }, [comparisonResponse1])

  const lineStyleChartData = useMemo(() => {
    if (comparisonResponse1) {
      return createLineStyleChartComparison(comparisonResponse1?.lineChart)
    }
    return null
  }, [comparisonResponse1])

  const multiLineChartData2 = useMemo(() => {
    if (comparisonResponse2) {
      return createLinechartComparison(comparisonResponse2?.multiLineChart)
    }
    return null
  }, [comparisonResponse2])

  const lineStyleChartData2 = useMemo(() => {
    if (comparisonResponse2) {
      return createLineStyleChartComparison(comparisonResponse2?.lineChart)
    }
    return null
  }, [comparisonResponse2])

  const multiLineChartData3 = useMemo(() => {
    if (comparisonResponse3) {
      return createLinechartComparison(comparisonResponse3?.multiLineChart)
    }
    return null
  }, [comparisonResponse3])

  const lineStyleChartData3 = useMemo(() => {
    if (comparisonResponse3) {
      return createLineStyleChartComparison(comparisonResponse3?.lineChart)
    }
    return null
  }, [comparisonResponse3])

  const handleSaveScenario = async (scenario) => {
    let filters

    switch (scenario) {
      case 1:
        filters = filters1
        break
      case 2:
        filters = filters2
        break
      case 3:
        filters = filters3
        break
      default:
        console.log('No scenario')
    }
  }

  const { setIsLoadScenario1 } = useIsLoadScenario1()

  const handleCloseScenario = (scenario) => {
    switch (scenario) {
      case 1:
        resetApiResponse1()
        setIsDataReset1(true)
        setTimeout(() => setIsDataReset1(false), 1000)
        resetSaveScanrioId()
        setIsLoadScenario1(false)
        break
      case 2:
        resetApiResponse2()
        setIsDataReset2(true)
        setTimeout(() => setIsDataReset2(false), 1000)
        resetSaveScanrioId2()
        setIsLoadScenario1(false)

        break
      case 3:
        resetApiResponse3()
        setIsDataReset3(true)
        setTimeout(() => setIsDataReset3(false), 1000)
        resetSaveScanrioId3()
        setIsLoadScenario1(false)

        break
      default:
        console.log('No scenario')
    }
  }

  return (
    <Grid display={'flex'}>
      <BgTabs>
        <Grid display={'flex'} gap={5} padding={'80px 60px 20px 60px'}>
          <Grid flex={2}>
            <ComparisonScenario
              comparisonScenarioTitle={comparisonScenarioTitle1}
              handleOpenModal={() => handleOpenModal(1)}
              handleCloseModal={handleCloseModal}
              handleSaveScenario={() => handleSaveScenario(1)}
              handleOpenScenarioAPI={handleOpenScenarioAPI}
              handleCloseScenario={() => handleCloseScenario(1)}
              multiLineChartData={lineChartData}
              lineChartData={lineStyleChartData}
              barChart={comparisonResponse1?.barChart}
              sampleSize={comparisonResponse1?.size}
              isDataReset={isDataReset1}
              isLoading={isLoading}
              editingScenario={1}
              kpiData={comparisonResponse1?.multiLineChart?.kpi}
            />
          </Grid>
          <Grid flex={2}>
            <ComparisonScenario
              comparisonScenarioTitle={comparisonScenarioTitle2}
              handleOpenModal={() => handleOpenModal(2)}
              handleCloseModal={handleCloseModal}
              handleSaveScenario={() => handleSaveScenario(2)}
              handleOpenScenarioAPI={handleOpenScenario2API}
              handleCloseScenario={() => handleCloseScenario(2)}
              multiLineChartData={multiLineChartData2}
              lineChartData={lineStyleChartData2}
              barChart={comparisonResponse2?.barChart}
              sampleSize={comparisonResponse2?.size}
              isDataReset={isDataReset2}
              isLoading={isLoading2}
              editingScenario={2}
              kpiData={comparisonResponse2?.multiLineChart?.kpi}
            />
          </Grid>
          {!xl && (
            <Grid flex={xl ? 1 : 2}>
              <ComparisonScenario
                comparisonScenarioTitle={comparisonScenarioTitle3}
                handleOpenModal={() => handleOpenModal(3)}
                handleSaveScenario={() => handleSaveScenario(3)}
                handleCloseModal={handleCloseModal}
                handleOpenScenarioAPI={handleOpenScenario3API}
                handleCloseScenario={() => handleCloseScenario(3)}
                multiLineChartData={multiLineChartData3}
                lineChartData={lineStyleChartData3}
                barChart={comparisonResponse3?.barChart}
                sampleSize={comparisonResponse3?.size}
                isDataReset={isDataReset3}
                isLoading={isLoading3}
                editingScenario={3}
                kpiData={comparisonResponse3?.multiLineChart?.kpi}
              />
            </Grid>
          )}
        </Grid>
      </BgTabs>
    </Grid>
  )
}

export default React.memo(Comparison)
