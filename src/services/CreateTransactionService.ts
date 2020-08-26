import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: Request): Transaction {
    if (data.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance()

      if (balance.total < data.value) {
        throw Error('You don\'t have credit for this transaction')
      }
    }

    return this.transactionsRepository.create(data)
  }
}

export default CreateTransactionService;
