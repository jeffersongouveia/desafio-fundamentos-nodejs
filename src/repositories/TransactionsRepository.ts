import Transaction from '../models/Transaction'

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

interface ListTransactions {
  transactions: Transaction[]
  balance: Balance
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): ListTransactions {
    return {
      balance: this.getBalance(),
      transactions: [...this.transactions],
    }
  }

  public getBalance(): Balance {
    const sumIncome = this.transactions.reduce((sum, item) => {
      sum += item.type === 'income' ? Number(item.value) : 0
      return sum
    }, 0)
    const sumOutcome = this.transactions.reduce((sum, item) => {
      sum += item.type === 'outcome' ? Number(item.value) : 0
      return sum
    }, 0)

    return {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    }
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(data)
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository
