
export enum RabbitMQ {
  UserQueue = 'users',
}

export enum UserMsg {
  CREATE = 'CREATE_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  VALID_USER = 'VALID_USER',
  SEED = 'SEED_USERS',
  STATUS = 'STATUS',
}

export enum Roles {
  User = 'USER',
  Admin = 'ADMIN',
  Sales = 'SALES',
  Inventory = 'INVENTORY',
  Finance = 'FINANCE',
  HR = 'HR',
  Invoice = 'INVOICE',
}
