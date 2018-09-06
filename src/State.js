import { random, sample } from "lodash"
import { computed, decorate, observable } from "mobx"

const State = decorate(
  class State {
    correct = []
    min = 1
    max = 10
    operators = ["+"]
    total = 10

    get remaining() {
      return this.total - this.correct.length
    }

    get statements() {
      return [...new Array(this.total)].map((_, i) => {
        const left = random(this.min, this.max)
        const operator = sample(this.operators)
        const right = random(this.min, this.max)

        return `${left} ${operator} ${right}`
      })
    }
  },
  {
    correct: observable,
    min: observable,
    max: observable,
    operators: observable,
    remaining: computed,
    total: observable,
    statements: computed
  }
)

export const state = new State()

export default State
