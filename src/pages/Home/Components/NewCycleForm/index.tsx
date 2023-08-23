import { useContext } from 'react'
import { FormContainer, MinutesAmountInput, TaskInput } from './styes'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle, cycles } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="">Vou trabalhar em</label>
      <TaskInput
        list="task-sugestions"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-sugestions">
        {cycles.map((cycle) => {
          return <option key={cycle.id} value={cycle.task} />
        })}
      </datalist>

      <label htmlFor="">durante</label>
      <MinutesAmountInput
        type="number"
        step={1}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
