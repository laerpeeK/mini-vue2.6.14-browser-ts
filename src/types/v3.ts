// using literal strings instead of numbers so that it's easier to inspect
// debugger events
export const enum TrackOpTypes {
  GET = 'get',
  TOUCH = 'touch'
}

export const enum TriggerOpTypes {
  SET = 'set',
  ADD = 'add',
  DELETE = 'delete',
  ARRAY_MUTATION = 'array mutation'
}

export type DebuggerEventExtraInfo = {
  target: object
  type: TrackOpTypes | TriggerOpTypes
  key?: any
  newValue?: any
  oldValue?: any
}

export type DebuggerEvent = {
  /**
   * @internal
   */
  effct: any
} & DebuggerEventExtraInfo

export interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}