import { inBrowser } from './env'
export let mark
export let measure

if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance
  if (
    perf &&
    // @ts-ignore
    perf.mark &&
    // @ts-ignore
    perf.measure &&
    // @ts-ignore
    perf.clearMarks &&
    // @ts-ignore
    perf.clearMeasures
  ) {
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      // perf.clearMeasures(name)
    }
  }
}