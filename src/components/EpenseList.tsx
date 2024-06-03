import { Item } from "./Item";

interface Props {
  items: Item[];
  onDeleteItem: (id: number) => void;
}

const EpenseList = ({ items, onDeleteItem }: Props) => {
  return (
    <table className="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <p>No items</p>
        ) : (
          items.map((item) => (
            <tr id={item.description}>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDeleteItem(item.id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default EpenseList;
