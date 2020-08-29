import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: CreateTransaction): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type of transition invalid!');
    }

    const { income, outcome, total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw Error('Output greater than the total available!');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return transaction;
  }
}

export default CreateTransactionService;
