import React, { FC, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiX } from "react-icons/fi";
import { inputSearchValidationSchema } from "../../utils/validationSchema";
import { InputSearchParams } from "../../types";

type SearchFormProps = {
  onSubmit: (_data: InputSearchParams) => void; // eslint-disable-line no-unused-vars
};

const SearchForm: FC<SearchFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState, reset, setValue } = useForm<InputSearchParams>({
    mode: "onChange",
    resolver: zodResolver(inputSearchValidationSchema),
  });

  const { ref, ...inputProps } = register("search");

  const handleReset = () => {
    reset();
  };

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!searchInputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setValue("search", place.name || "");
    });

    return () => {
      if (searchInputRef.current)
        window.google.maps.event.clearInstanceListeners(searchInputRef.current);
    };
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center">
        <div className="relative">
          <input
            type="text"
            ref={(e) => {
              ref(e);
              searchInputRef.current = e;
            }}
            placeholder="検索"
            className="input input-bordered w-full max-w-xs"
            {...inputProps}
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
