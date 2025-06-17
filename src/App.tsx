import InvestmentCalculator from './pages/InvestmentCalculator'
import RetirementCalculator from './pages/RetirementCalculator'
import BusinessFinancingCalculator from './pages/BusinessFinancingCalculator'
import CreditScoreCalculator from './pages/CreditScoreCalculator'
import PersonalCreditCalculator from './pages/PersonalCreditCalculator'
import SavingsGoalCalculator from './pages/SavingsGoalCalculator'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <Navbar />
          <Box maxW="1200px" mx="auto" px={4} py={8}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/investment-calculator" element={<InvestmentCalculator />} />
              <Route path="/savings-goal-calculator" element={<SavingsGoalCalculator />} />
              <Route path="/personal-credit-calculator" element={<PersonalCreditCalculator />} />
              <Route path="/credit-score-calculator" element={<CreditScoreCalculator />} />
              <Route path="/business-financing-calculator" element={<BusinessFinancingCalculator />} />
              <Route path="/retirement-calculator" element={<RetirementCalculator />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App
