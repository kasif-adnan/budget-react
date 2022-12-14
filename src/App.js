import { Container } from 'semantic-ui-react';
import './App.css';
import MainHeader from './components/MainHeader';
import NewEntryForm from './components/NewEntryForm';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import { useEffect, useState } from 'react';
import EntryLines from './components/EntryLines';
import ModalEdit from './components/ModalEdit';
import {useSelector} from 'react-redux';

function App() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [entry, setEntry] = useState();
  const entries = useSelector(state => state.entries);
  const {isOpen, id} = useSelector(state => state.modals);

  useEffect(() => {
    const index = entries.findIndex(entry => entry.id === id)
    setEntry(entries[index]);
  }, [isOpen, id]);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    entries.map(entry => {
      if(entry.isExpense){
        totalExpense += Number(entry.value)
      } else {
        totalIncome += Number(entry.value)
      }
    });
    setTotal(totalIncome - totalExpense);
    setExpenseTotal(totalExpense);
    setIncomeTotal(totalIncome);
  }, [entries])

  return (
    <Container>

      <MainHeader title="Budget" type="h1" />

      <DisplayBalance title='Your Balance' value={total} size='small' />

      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal}/>

      <MainHeader title="History" type="h3" />

      <EntryLines
        entries={entries}
      />
      
      <MainHeader title="Add new transaction" type="h3" />
      <NewEntryForm />
      
      <ModalEdit isOpen={isOpen} {...entry}/>

    </Container>
  );
}

export default App;
