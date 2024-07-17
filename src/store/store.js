import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFiltersDataStore = create((set) => ({
  filters: null,
  saveFiltersData: (newData) => set({ filters: newData }),
  resetFilters: () => set({ filters: null })
}))
export const useFiltersDataStoreComparison1 = create((set) => ({
  filters1: null,
  saveFiltersData1: (newData) => set({ filters1: newData })
}))
export const useFiltersDataStoreComparison2 = create((set) => ({
  filters2: null,
  saveFiltersData2: (newData) => set({ filters2: newData })
}))
export const useFiltersDataStoreComparison3 = create((set) => ({
  filters3: null,
  saveFiltersData3: (newData) => set({ filters3: newData })
}))

export const useApiResponseDataStore = create(
  persist(
    (set) => ({
      apiResponse: null,
      isLoading: true,
      saveApiResponseData: (newData) =>
        set((state) => ({
          apiResponse: { ...state.apiResponse, ...newData }
        })),
      setIsLoading: () =>
        set(() => ({
          isLoading: false
        })),
      updateTitle: (newTitle) =>
        set((state) => {
          if (state.apiResponse) {
            return { apiResponse: { ...state.apiResponse, title: newTitle } }
          } else {
            return { apiResponse: { title: newTitle } }
          }
        }),
      resetApiResponse: () =>
        set(() => ({
          apiResponse: null
        }))
    }),
    {
      name: 'apiResponseDataStore'
    }
  )
)

export const useSelectedScenarioFilters = create(
  persist(
    (set) => ({
      selectedScenarioFilters: null,
      saveSelectedScenarioFilters: (newData) =>
        set({ selectedScenarioFilters: newData }),
      resetSelectedScenarioFilters: () => set({ selectedScenarioFilters: null })
    }),
    {
      name: 'filterSelected'
    }
  )
)

export const useSelectedScenario = create((set) => ({
  selectedScenario: null,
  saveSelectedScenario: (newData) => set({ selectedScenario: newData })
}))

export const useScenarioTitle = create(
  persist(
    (set) => ({
      title: '',
      saveTitle: (newTitle) => set({ title: newTitle }),
      resetScenarioTitle: () => set({ title: '' })
    }),
    {
      name: 'scenarioTitle'
    }
  )
)

// Title comparison 3 scenario's store
// TODO: Refactor logic

export const useComparisonScenarioTitle1 = create(
  persist(
    (set) => ({
      comparisonScenarioTitle1: '',
      saveComparisonScenarioTitle1: (newTitle) =>
        set({ comparisonScenarioTitle1: newTitle }),
      comparisonResponse1: null,
      savecomparisonResponseData1: (newData) =>
        set((state) => ({
          comparisonResponse1: { ...state.comparisonResponse1, ...newData }
        })),
      updateTitle: (newTitle) =>
        set((state) => {
          if (state.comparisonResponse1) {
            return {
              comparisonResponse1: {
                ...state.comparisonResponse1,
                title: newTitle
              }
            }
          } else {
            return { comparisonResponse1: { title: newTitle } }
          }
        }),
      resetApiResponse1: () =>
        set(() => ({
          comparisonResponse1: null,
          comparisonScenarioTitle1: ''
        }))
    }),
    {
      name: 'scenario-one-comparison'
    }
  )
)

export const useComparisonScenarioTitle2 = create(
  persist(
    (set) => ({
      comparisonScenarioTitle2: '',
      saveComparisonScenarioTitle2: (newTitle) =>
        set({ comparisonScenarioTitle2: newTitle }),
      comparisonResponse2: null,
      savecomparisonResponseData2: (newData) =>
        set((state) => ({
          comparisonResponse2: { ...state.comparisonResponse2, ...newData }
        })),
      updateTitle: (newTitle) =>
        set((state) => {
          if (state.comparisonResponse2) {
            return {
              comparisonResponse2: {
                ...state.comparisonResponse2,
                title: newTitle
              }
            }
          } else {
            return { comparisonResponse2: { title: newTitle } }
          }
        }),
      resetApiResponse2: () =>
        set(() => ({
          comparisonResponse2: null,
          comparisonScenarioTitle2: ''
        }))
    }),
    {
      name: 'scenario-two-comparison'
    }
  )
)

export const useComparisonScenarioTitle3 = create(
  persist(
    (set) => ({
      comparisonScenarioTitle3: '',
      saveComparisonScenarioTitle3: (newTitle) =>
        set({ comparisonScenarioTitle3: newTitle }),
      comparisonResponse3: null,
      savecomparisonResponseData3: (newData) =>
        set((state) => ({
          comparisonResponse3: { ...state.comparisonResponse3, ...newData }
        })),
      updateTitle: (newTitle) =>
        set((state) => {
          if (state.comparisonResponse3) {
            return {
              comparisonResponse3: {
                ...state.comparisonResponse3,
                title: newTitle
              }
            }
          } else {
            return { comparisonResponse3: { title: newTitle } }
          }
        }),
      resetApiResponse3: () =>
        set(() => ({
          comparisonResponse3: null,
          comparisonScenarioTitle3: ''
        }))
    }),
    {
      name: 'scenario-three-comparison'
    }
  )
)

export const useCurrentEditingScenario = create((set) => ({
  currentEditingScenario: null,
  setCurrentEditingScenario: (scenarioNumber) => {
    set({ currentEditingScenario: scenarioNumber })
  }
}))

export const useCheckboxStore = create((set) => ({
  checkbox: false,
  setCheckbox: (checked) => set({ checkbox: Boolean(checked) })
}))

export const useDisabledButtons = create((set) => ({
  disabledButtons: true,
  setDisabledButons: (value) => set({ disabledButtons: Boolean(value) })
}))

export const useScenarioId = create((set) => ({
  scenarioId: null,
  saveScenarioId: (newId) => set({ scenarioId: newId }),
  resetSaveScanrioId: () => set({ scenarioId: null })
}))
export const useScenarioId2 = create((set) => ({
  scenarioId2: null,
  saveScenarioId2: (newId) => set({ scenarioId2: newId }),
  resetSaveScanrioId2: () => set({ scenarioId2: null })
}))
export const useScenarioId3 = create((set) => ({
  scenarioId3: null,
  saveScenarioId3: (newId) => set({ scenarioId3: newId }),
  resetSaveScanrioId3: () => set({ scenarioId3: null })
}))

export const useModalStore = create((set) => ({
  openModal: false,
  setOpenModal: (value) => set(() => ({ openModal: value }))
}))

export const useToggleStore = create((set) => ({
  expanded: false,
  isHidden: false,
  toggle: () => set((state) => ({ expanded: !state.expanded })),
  toggleHidden: () => set((state) => ({ isHidden: !state.isHidden }))
}))

export const useMouseOverStore = create((set) => ({
  onMouseover: false,
  setOnMouseover: (value) => set({ onMouseover: value })
}))

export const useSelectedCountry = create((set) => ({
  isButtonEnabled: false,
  enableButton: () => set({ isButtonEnabled: true }),
  disableButton: () => set({ isButtonEnabled: false })
}))

export const useStepsStore = create((set) => ({
  mainStep: 0,
  subStep: 0,
  active: false,
  setActive: (value) => set({ active: value }),
  finish: () => {
    set({ mainStep: 0, subStep: 0, active: false })
  },
  stepsData: [
    {
      label: 'Filters',
      url: `${import.meta.env.VITE_BASE_URL2}pricing`,
      subSteps: [
        {
          step: 1,
          tooltip:
            'Select the different combinations using the below filters for results on selected data cuts'
        },
        { step: 2, tooltip: 'Edit scenario name' },
        { step: 3, tooltip: 'Save the scenario with any filter configuration' },
        { step: 4, tooltip: 'Drop the scenario which is not needed' },
        { step: 5, tooltip: 'Close scenario' },
        {
          step: 6,
          tooltip: 'Dynamic sample size based on the filter configuration'
        },
        {
          step: 7,
          tooltip:
            'Price sensitivity chart gets displayed once the  filters are selected'
        },

        {
          step: 8,
          tooltip:
            'A Van Westendorp Price Sensitivity Meter measures how much a customer is willing to pay for a product or service. It can help businesses set acceptable prices that align with what customers are willing to pay.'
        },
        {
          step: 9,
          tooltip:
            'Upper Bound - is represented by the intersection of the ‘Too Expensive’ and ‘Acceptably Cheap’ lines. Beyond this price, it is perceived that price outweighs the benefits derived'
        },
        {
          step: 10,
          tooltip:
            'Lower Bound - is represented by the intersection of the ‘Too Cheap’ and ‘Acceptably Expensive’ lines. Below this price, sales would be lost due to questionable quality / low confidence in the product'
        },
        {
          step: 11,
          tooltip:
            'Optimal Price Point is represented by the intersection of the ‘Too Cheap’ and ‘Too Expensive’ lines. This is the price at which the percentage of customers who believe it is too expensive equals those who feel that the quality is questionable'
        },
        {
          step: 12,
          tooltip:
            'The optimal price is the inflection point post which we see the demand to start declining'
        },
        {
          step: 13,
          tooltip:
            'Demand curve represents how the demand for a service varies with changes in its price.'
        },
        {
          step: 14,
          tooltip:
            'Value Association by the Business personas with respect to each outcome that respondents answered in the survey'
        },
        {
          step: 15,
          tooltip:
            'Value Association by the Technology personas with respect to each outcome that respondents answered in the survey'
        }
      ]
    },
    {
      label: 'Profiling',
      url: `${import.meta.env.VITE_BASE_URL2}profiling`,
      subSteps: [
        {
          step: 16,
          tooltip:
            'View the profile of respondents based on the filter configuration'
        }
      ]
    }
  ],
  setMainStep: (mainStep) => set((state) => ({ mainStep })),
  setSubStep: (subStep) => set((state) => ({ subStep })),
  setStepsData: (stepsData) => set((state) => ({ stepsData }))
}))

export const useFilterNumber = create((set) => ({
  filterSelectedNumber: 0,
  setFilterSelectedNumber: (value) => set({ filterSelectedNumber: value })
}))

export const useDeleteScenario = create((set) => ({
  deleteScenario: false,
  setDeleteScenario: (value) => set({ deleteScenario: value })
}))

export const useCreatedScenario = create((set) => ({
  createdScenario: false,
  setCreatedScenario: (value) => set({ createdScenario: value })
}))

export const useIsLoadScenario = create((set) => ({
  isLoadScenario: false,
  setIsLoadScenario: (value) => set({ isLoadScenario: value })
}))

export const useIsLoadScenario1 = create((set) => ({
  isLoadScenario1: false,
  setIsLoadScenario1: (value) => set({ isLoadScenario1: value })
}))

export const useIsLoadScenario2 = create((set) => ({
  isLoadScenario2: false,
  setIsLoadScenario2: (value) => set({ isLoadScenario2: value })
}))

export const useIsLoadScenario3 = create((set) => ({
  isLoadScenario3: false,
  setIsLoadScenario3: (value) => set({ isLoadScenario3: value })
}))
