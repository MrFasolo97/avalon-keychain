export enum ActionType {
  TEST_MSG = 'TEST_MSG',
  SET_MK = 'SET_MK',

  // ACCOUNT ACTIONS
  GET_ACCOUNTS = 'GET_ACCOUNTS',
  ADD_ACCOUNT = 'ADD_ACCOUNT',
  SET_ACCOUNTS = 'SET_ACCOUNTS',
  RESET_ACCOUNT = 'RESET_ACCOUNT',

  // ACTIVE ACCOUNT ACTIONS
  SET_ACTIVE_ACCOUNT = 'ACTIVE_ACCOUNT',
  SET_ACTIVE_ACCOUNT_RC = 'ACTIVE_ACCOUNT_RC',
  FORGET_ACCOUNT = 'FORGET_ACCOUNT',
  FORGET_ACCOUNTS = 'FORGET_ACCOUNTS',

  // ERROR ACTIONS
  SET_MESSAGE = 'SET_MESSAGE',

  // NAVIGATION ACTIONS
  NAVIGATE_TO = 'NAVIGATE_TO',
  NAVIGATE_TO_WITH_PARAMS = 'NAVIGATE_TO_WITH_PARAMS',
  GO_BACK = 'GO_BACK',
  RESET_NAV = 'RESET_NAV',

  // ACTIVE RPC ACTIONS
  SET_ACTIVE_RPC = 'SET_ACTIVE_RPC',
  ADD_CUSTOM_RPC = 'ADD_CUSTOM_RPC',
}
