import faker, { random } from "faker"
import { computed, decorate, observable } from "mobx"

import { version } from "../package.json"

const seed = parseInt(version.replace(/\D/g, "0"), 10)

const State = decorate(
  class State {
    correct = []
    min = 1
    max = 10
    operators = ["+"]
    total = 6

    get remaining() {
      return this.total - this.correct.length
    }

    get statements() {
      const { min, max } = this

      // Ensure results are deterministic
      faker.seed(seed)

      return [...new Array(this.total)].map((_, i) => {
        const left = random.number({ min, max })
        const operator = random.arrayElement(this.operators)
        const right = random.number({ min, max })

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
