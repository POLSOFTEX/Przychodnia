import {
  VacationsStateT,
  VacationsActionTypes,
  VacationsDataT,
  VacationsCategoryT,
  VacationRequestT,
  LeftVacationsDaysT,
  UserLeftVacationDays,
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialVacationsState: VacationsStateT = {
  allVacations: [],
  allPastVacations: [],
  userVacations: [],
  userPastVacations: [],
  userVacationRequests: [],
  userLeftVacationsDays: [],
  allUsersLeftVacationDays: [],
  categories: [],
  isLoading: false,
  isLoadingUserVacations: false,
  isLoadingUserVacationRequests: false,
  isLoadingAddUserVacationRequest: false,
  isLoadingAddCategory: false,
};

export const vacationsReducer = (
  state: VacationsStateT = initialVacationsState,
  action: Action<TypeConstant> &
    PayloadAction<
      TypeConstant,
      VacationsDataT[] &
        VacationsCategoryT[] &
        VacationsCategoryT &
        VacationRequestT[] &
        VacationRequestT &
        LeftVacationsDaysT[] &
        UserLeftVacationDays[]
    >
): VacationsStateT => {
  switch (action.type) {
    case VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS: {
      return { ...state, isLoading: true };
    }
    case VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_SUCCESS: {
      return { ...state, isLoading: false, allVacations: action.payload };
    }
    case VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_ERROR: {
      return { ...state, isLoading: false };
    }
    case VacationsActionTypes.FETCH_ALL_PAST_VACATIONS: {
      return { ...state, isLoading: true };
    }
    case VacationsActionTypes.FETCH_ALL_PAST_VACATIONS_SUCCESS: {
      return { ...state, isLoading: false, allPastVacations: action.payload };
    }
    case VacationsActionTypes.FETCH_ALL_PAST_VACATIONS_ERROR: {
      return { ...state, isLoading: false };
    }
    case VacationsActionTypes.GET_VACATIONS_CATEGORIES: {
      return { ...state, isLoading: true };
    }
    case VacationsActionTypes.GET_VACATIONS_CATEGORIES_SUCCESS: {
      return { ...state, isLoading: false, categories: action.payload };
    }
    case VacationsActionTypes.GET_VACATIONS_CATEGORIES_ERROR: {
      return { ...state, isLoading: false };
    }
    case VacationsActionTypes.ADD_VACATION_CATEGORY: {
      return { ...state, isLoadingAddCategory: true };
    }
    case VacationsActionTypes.ADD_VACATION_CATEGORY_SUCCESS: {
      return {
        ...state,
        isLoadingAddCategory: false,
        categories: [...state.categories, action.payload],
      };
    }
    case VacationsActionTypes.ADD_VACATION_CATEGORY_ERROR: {
      return { ...state, isLoadingAddCategory: false };
    }
    case VacationsActionTypes.GET_USER_VACATIONS: {
      return { ...state, isLoadingUserVacations: true };
    }
    case VacationsActionTypes.GET_USER_VACATIONS_SUCCESS: {
      return {
        ...state,
        isLoadingUserVacations: false,
        userVacations: action.payload,
      };
    }
    case VacationsActionTypes.GET_USER_VACATIONS_ERROR: {
      return { ...state, isLoadingUserVacations: false };
    }
    case VacationsActionTypes.GET_USER_PAST_VACATIONS: {
      return { ...state, isLoadingUserVacations: true };
    }
    case VacationsActionTypes.GET_USER_PAST_VACATIONS_SUCCESS: {
      return {
        ...state,
        isLoadingUserVacations: false,
        userPastVacations: action.payload,
      };
    }
    case VacationsActionTypes.GET_USER_PAST_VACATIONS_ERROR: {
      return { ...state, isLoadingUserVacations: false };
    }
    case VacationsActionTypes.CREATE_USER_VACATION_REQUEST: {
      return { ...state, isLoadingAddUserVacationRequest: true };
    }
    case VacationsActionTypes.CREATE_USER_VACATION_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoadingAddUserVacationRequest: false,
        userVacationRequests: [...state.userVacationRequests, action.payload],
      };
    }
    case VacationsActionTypes.CREATE_USER_VACATION_REQUEST_ERROR: {
      return { ...state, isLoadingAddUserVacationRequest: false };
    }
    case VacationsActionTypes.GET_USER_VACATION_REQUESTS: {
      return { ...state, isLoadingUserVacationRequests: true };
    }
    case VacationsActionTypes.GET_USER_VACATION_REQUESTS_SUCCESS: {
      return {
        ...state,
        isLoadingUserVacationRequests: false,
        userVacationRequests: action.payload,
      };
    }
    case VacationsActionTypes.GET_USER_VACATION_REQUESTS_ERROR: {
      return { ...state, isLoadingUserVacationRequests: false };
    }
    case VacationsActionTypes.GET_USER_LEFT_VACATIONS_DAYS: {
      return { ...state };
    }
    case VacationsActionTypes.GET_USER_LEFT_VACATIONS_DAYS_SUCCESS: {
      return {
        ...state,
        userLeftVacationsDays: action.payload,
      };
    }
    case VacationsActionTypes.GET_USER_LEFT_VACATIONS_DAYS_ERROR: {
      return { ...state };
    }
    case VacationsActionTypes.GET_VACATIONS_LEFT_ALL: {
      return { ...state };
    }
    case VacationsActionTypes.GET_VACATIONS_LEFT_ALL_SUCCESS: {
      return {
        ...state,
        allUsersLeftVacationDays: action.payload,
      };
    }
    case VacationsActionTypes.GET_VACATIONS_LEFT_ALL_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
};
