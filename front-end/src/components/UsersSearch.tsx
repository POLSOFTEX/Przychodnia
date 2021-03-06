import React, { useState, FormEvent, useEffect, createRef } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import { UserT } from "../state/ducks/user/types";
import useDebounce from "../utils/hooks/useDebounce";

type searchUsersPropsT = {
  readonly arr: UserT[];
  readonly value: string;
};

/**
 * Search users by firstName + lastName based on the given value
 * @param searchedArr array of users
 * @param value searched value
 * @returns
 */
const searchUsers = async ({
  arr,
  value
}: searchUsersPropsT): Promise<UserT[]> => {
  const searchedVal = value.toLowerCase();
  return new Promise((res, rej) => {
    const filteredRes: UserT[] = arr!.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

      return fullName.indexOf(searchedVal) !== -1;
    });
    res(filteredRes);
  });
};

type SearchPropsT = {
  readonly onSearch: (selectedUser: UserT) => void;
  readonly users?: UserT[];
};

const UsersSearch: React.FC<SearchPropsT> = ({ onSearch, users }) => {
  const [searchVal, setSearchVal] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserT[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserT | undefined>();

  // USERS

  const debouncedSearchVal = useDebounce(searchVal, 300);

  // Handle searching with debounce effect
  useEffect(() => {
    if (debouncedSearchVal && users) {
      searchUsers({ arr: users, value: debouncedSearchVal }).then((result) => {
        setFilteredUsers(result);
      });
    } else {
      setFilteredUsers([]);
    }
  }, [debouncedSearchVal]);

  // Handle setting selected user and passing it to parent
  useEffect(() => {
    if (selectedUser) {
      onSearch(selectedUser);
    }
  }, [selectedUser, onSearch]);

  const handleSearchInput = (e: FormEvent<FormControl & HTMLInputElement>) => {
    e.preventDefault();
    setSearchVal(e.currentTarget.value);
  };

  const handleSelectedUser = (e: React.MouseEvent<HTMLOptionElement>) => {
    e.preventDefault();
    setSearchVal(e.currentTarget.innerText);

    const selectedUserId = e.currentTarget.value.toString();
    const selUser = filteredUsers.find(
      (user) => user.idUser === selectedUserId
    );

    if (selUser) {
      setSelectedUser(selUser);
      setSearchVal("");
      setFilteredUsers([]);
    }
  };

  const canShowList = (): boolean => {
    return filteredUsers.length > 0;
  };

  let showList = canShowList() ? "list-active" : "";

  return (
    <form className="search-default" autoComplete="off">
      <FormGroup className="position-relative">
        <FormControl
          type="text"
          value={searchVal}
          placeholder="Szukaj pracowników..."
          onChange={handleSearchInput}
          list="search-list"
        />
        <datalist className={`list ${showList}`}>
          {filteredUsers.map((user, key) => (
            <option
              key={key}
              onClick={handleSelectedUser}
              value={user.idUser}
              className="list-option"
            >{`${user.firstName} ${user.lastName}`}</option>
          ))}
        </datalist>
      </FormGroup>
    </form>
  );
};

export default UsersSearch;
