import homewhite from '../assets/sidebar/homewhite.svg'
import homeblue from '../assets/sidebar/homeblue.svg'
import pricingWhite from '../assets/sidebar/pricingwhite.svg'
import pricingBlue from '../assets/sidebar/pricingblue.svg'
import profilingWhite from '../assets/sidebar/profilingwhite.svg'
import profilingBlue from '../assets/sidebar/profilingblue.svg'
import help from '../assets/sidebar/help.svg'
import helpBlue from '../assets/sidebar/helpblue.svg'
import pricingDisabled from '../assets/sidebar/pricingDisabled.svg'
import profilingDisabled from '../assets/sidebar/profilingDisabled.svg'

export const buttons = [
  {
    title: 'Home',
    iconWhite: homewhite,
    iconBlue: homeblue,
    url: import.meta.env.VITE_BASE_URL2 + 'home'
  },
  {
    title: 'Detailed View',
    abbreviatedTitle: 'DV',
    subButtons: [
      {
        title: 'Pricing',
        iconWhite: pricingWhite,
        iconBlue: pricingBlue,
        iconDisabled: pricingDisabled,
        url: import.meta.env.VITE_BASE_URL2 + 'pricing'
      },
      {
        title: 'Profiling',
        iconWhite: profilingWhite,
        iconBlue: profilingBlue,
        iconDisabled: profilingDisabled,
        url: import.meta.env.VITE_BASE_URL2 + 'profiling'
      }
    ],
    url: import.meta.env.VITE_BASE_URL2 + 'pricing'
  },
  {
    title: 'Comparison View',
    abbreviatedTitle: 'CV',
    url: import.meta.env.VITE_BASE_URL2 + 'comparison'
  },
  {
    title: 'Service Preferred',
    abbreviatedTitle: 'SP',
    url: import.meta.env.VITE_BASE_URL2 + 'service-preferred'
  },
  {
    title: 'Glossary',
    iconWhite: help,
    iconBlue: helpBlue,
    url: import.meta.env.VITE_BASE_URL2 + 'glossary'
  }
]
