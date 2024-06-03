import { produce } from "immer";
import { useState } from "react";
import "./App.css";
import ExpenseList from "./components/EpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { Item } from "./components/Item";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const onAddItem = (item: Item) => {
    const updatedItems = produce(items, (draft) => {
      item.id = items.length;
      draft.push(item);
    });

    console.log(updatedItems);
    setItems(updatedItems);
  };

  const onDeleteItem = (id: number) => {
    const updatedItems = produce(items, (draft) => {
      const index = draft.map((item) => item.id).indexOf(id);
      draft.splice(index, 1);
    });

    setItems(updatedItems);
  };

  return (
    <>
      <ExpenseForm onSubmitItem={onAddItem}></ExpenseForm>
      <ExpenseList items={items} onDeleteItem={onDeleteItem}></ExpenseList>
    </>
  );
}

export default App;
