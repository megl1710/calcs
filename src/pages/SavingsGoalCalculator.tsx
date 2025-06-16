import { useState } from 'react'
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  useToast,
  Card,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
} from '@chakra-ui/react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const SavingsGoalCalculator = () => {
  const [goalType, setGoalType] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [currentSavings, setCurrentSavings] = useState('')
  const [results, setResults] = useState<any>(null)
  const toast = useToast()

  const goalTypes = [
    { value: 'casa', label: 'Casa' },
    { value: 'auto', label: 'Auto' },
    { value: 'educacion', label: 'Educación' },
    { value: 'emergencias', label: 'Fondo de emergencias' },
    { value: 'vacaciones', label: 'Vacaciones' },
    { value: 'otro', label: 'Otro' },
  ]

  const calculateSavings = () => {
    const target = parseFloat(targetAmount)
    const current = parseFloat(currentSavings)
    const targetDateObj = new Date(targetDate)
    const today = new Date()
    const monthsRemaining = (targetDateObj.getFullYear() - today.getFullYear()) * 12 + 
      (targetDateObj.getMonth() - today.getMonth())

    if (monthsRemaining <= 0) {
      toast({
        title: 'Error',
        description: 'La fecha objetivo debe ser futura',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const remainingAmount = target - current
    const monthlySavings = remainingAmount / monthsRemaining
    const progress = (current / target) * 100

    // Generate monthly data for chart
    const monthlyData = []
    for (let i = 0; i <= monthsRemaining; i++) {
      const amount = current + (monthlySavings * i)
      monthlyData.push({
        month: i,
        amount: Math.round(amount * 100) / 100,
      })
    }

    setResults({
      monthlySavings,
      remainingAmount,
      progress,
      monthsRemaining,
      monthlyData,
    })
  }

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={4}>
            Calculadora de Metas de Ahorro
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Planifica tus metas financieras y visualiza tu progreso
          </Text>
        </Box>

        <Card>
          <CardBody>
            <VStack spacing={6}>
              <FormControl>
                <FormLabel>Tipo de meta</FormLabel>
                <Select value={goalType} onChange={(e) => setGoalType(e.target.value)} placeholder="Selecciona el tipo de meta">
                  {goalTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Monto objetivo</FormLabel>
                <Input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="Ingresa el monto objetivo"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Fecha objetivo</FormLabel>
                <Input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Ahorro actual</FormLabel>
                <Input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  placeholder="Ingresa tu ahorro actual"
                />
              </FormControl>

              <Button colorScheme="blue" onClick={calculateSavings} width="full">
                Calcular
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {results && (
          <Card>
            <CardBody>
              <VStack spacing={6}>
                <Box width="full">
                  <Text mb={2}>Progreso hacia tu meta</Text>
                  <Progress value={results.progress} colorScheme="blue" size="lg" borderRadius="md" />
                  <Text mt={2} textAlign="right" color="gray.600">
                    {results.progress.toFixed(1)}%
                  </Text>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} width="full">
                  <Stat>
                    <StatLabel>Ahorro mensual requerido</StatLabel>
                    <StatNumber>${results.monthlySavings.toFixed(2)}</StatNumber>
                    <StatHelpText>Mensual</StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Monto restante</StatLabel>
                    <StatNumber>${results.remainingAmount.toFixed(2)}</StatNumber>
                    <StatHelpText>Por ahorrar</StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Meses restantes</StatLabel>
                    <StatNumber>{results.monthsRemaining}</StatNumber>
                    <StatHelpText>Hasta la meta</StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>Ahorro actual</StatLabel>
                    <StatNumber>${currentSavings}</StatNumber>
                    <StatHelpText>Acumulado</StatHelpText>
                  </Stat>
                </SimpleGrid>

                <Box width="full" height="300px">
                  <ResponsiveContainer>
                    <LineChart data={results.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" label={{ value: 'Meses', position: 'insideBottom', offset: -5 }} />
                      <YAxis
                        label={{ value: 'Monto ($)', angle: -90, position: 'insideLeft' }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Ahorro']}
                        labelFormatter={(label) => `Mes ${label}`}
                      />
                      <Line type="monotone" dataKey="amount" stroke="#3182CE" name="Ahorro" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Box>
  )
}

export default SavingsGoalCalculator
