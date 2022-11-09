import { Fragment, useEffect, useState } from 'react';
import cx from 'classnames';
import { Controller } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import { useMutation } from '@apollo/client';
import { CREATE_COMPANY_MUTATION } from '@gql/mutations/companies';

type OptionType = {
  id: number | string;
  name: string;
  __typename?: string;
};

type InputAutocompleteProps = {
  control: any;
  fieldName: string;
  options: OptionType[];
  onSearchHandler: (value: any) => void;
  setValue: any;
  defaultValue?: string;
  defaultId?: number | string;
  wrapperClassnames?: string;
  dropdownClassnames?: string;
  label?: string;
};

const InputAutocomplete = ({
  fieldName,
  options,
  control,
  defaultValue,
  defaultId,
  onSearchHandler,
  setValue,
  dropdownClassnames,
}: InputAutocompleteProps) => {
  const [selected, setSelected] = useState(
    { id: defaultId, name: defaultValue } || { id: null, name: null },
  );
  const [searchValue, setSearchValue] = useState(defaultValue || '');
  const [open, setOpen] = useState(!!options.length);
  const [createCompany] = useMutation(CREATE_COMPANY_MUTATION, {
    onCompleted: (data) => {
      if (!data?.createCompany.id || !data?.createCompany.name) return;
      setValue('companyId', data.createCompany.id);
      setSelected({
        id: data.createCompany.id,
        name: data.createCompany.name,
      });
      setSearchValue(data.createCompany.name);
    },
  });

  const optionsToRender = options.length
    ? options
    : [{ id: 'create', name: `Create '${searchValue}'` }];

  useEffect(() => {
    if (selected.name !== searchValue)
      setOpen(!!optionsToRender.length && !!searchValue.length);
  }, [searchValue]);

  return (
    <Controller
      control={control}
      defaultValue={selected.id}
      name={fieldName}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <Listbox value={selected} onChange={(value) => onChange(value.id)}>
          <div className="relative">
            <input
              type="text"
              id={fieldName}
              name={fieldName}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onChange(e.target.value);
                onSearchHandler(e.target.value);
              }}
              className="block w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="ex: Amazon"
              required
            />

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${dropdownClassnames}`}
              >
                {optionsToRender.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    onClick={() => {
                      if (option.id === 'create') {
                        createCompany({
                          variables: {
                            createCompanyInput: {
                              name: searchValue,
                            },
                          },
                        });
                      }
                      setSelected(option);
                      setSearchValue(option.name);
                      setOpen(false);
                    }}
                    className="relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white hover:cursor-pointer"
                    value={option}
                  >
                    {({ selected }) => (
                      <span
                        className={cx('block truncate', {
                          'font-semibold': selected,
                          'font-normal': !selected,
                        })}
                      >
                        {option.name}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    />
  );
};

export default InputAutocomplete;
