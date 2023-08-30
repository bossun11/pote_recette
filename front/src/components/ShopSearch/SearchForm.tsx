import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiX } from "react-icons/fi";
import { inputSearchValidationSchema } from "../../utils/validationSchema";
import { InputSearchParams } from "../../types";

type SearchFormProps = {
  onSubmit: (_data: InputSearchParams) => void; // eslint-disable-line no-unused-vars
};

const SearchForm: FC<SearchFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState, reset } = useForm<InputSearchParams>({
    mode: "onChange",
    resolver: zodResolver(inputSearchValidationSchema),
  });

  const handleReset = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="検索"
            className="input input-bordered w-full max-w-xs"
            {...register("search")}
          />
          {formState.isValid && (
            <FiX
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={handleReset}
            />
          )}
        </div>
        <input
          data-theme="valentine"
          className="btn btn-neutral ml-3"
          type="submit"
          value="検索"
          disabled={!formState.isValid}
        />
      </div>
    </form>
  );
};

export default SearchForm;
