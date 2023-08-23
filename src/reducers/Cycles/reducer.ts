import { produce } from 'immer'
import { CycleActionTypes } from './Actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

interface ActionState {
  type: CycleActionTypes
  payload?: {
    cycle: Cycle
  }
}

export function CycleReducer(state: CyclesState, action: ActionState) {
  switch (action.type) {
    case CycleActionTypes.CREATE_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload!.cycle)
        draft.activeCycleId = action.payload!.cycle.id
      })

    case CycleActionTypes.INTERRUPT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex === -1) {
        return state
      }
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }

    case CycleActionTypes.FINISH_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex === -1) {
        return state
      }
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }

    default:
      return state
  }
}
