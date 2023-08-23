import { Cycle } from './reducer'

export enum CycleActionTypes {
  CREATE_NEW_CYCLE,
  INTERRUPT_CYCLE,
  FINISH_CYCLE,
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: CycleActionTypes.CREATE_NEW_CYCLE,
    payload: { cycle: newCycle },
  }
}

export function interruptCycleAction() {
  return {
    type: CycleActionTypes.INTERRUPT_CYCLE,
  }
}

export function finishCycleAction() {
  return {
    type: CycleActionTypes.FINISH_CYCLE,
  }
}
