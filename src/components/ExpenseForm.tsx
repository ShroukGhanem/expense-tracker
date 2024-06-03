import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Item } from "./Item";

interface Props {
  onSubmitItem: (item: Item) => void;
}

const ExpenseForm = ({ onSubmitItem }: Props) => {
  const schema = z.object({
    desc: z.string().min(3, "Description must be at least 3 chars"),
    amount: z
      .number({ invalid_type_error: "Amount is required" })
      .min(1, "Amount must be at least 1$"),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) =>
    onSubmitItem({ description: data.desc, amount: data.amount });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">
          Description
        </label>
        <input
          {...register("desc")}
          id="desc"
          type="text"
          className="form-control"
        />
        {errors.desc && <p className="text-danger">{errors.desc.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
