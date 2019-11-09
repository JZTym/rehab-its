export const {
  INVALID_USER_OR_PASS = 'Invalid username and/or password',
  NOT_AUTHENTICATED = 'You are not authenticated!',
  DATESTRING_NOT_VALID = 'Not a valid date string!',

  USER_ALREADY_EXISTS = 'Username already exists!',

  PATIENT_ALREADY_EXISTS = 'Patient already exists! Use updatePatient to update the patient instead',
  PATIENT_DOESNT_EXIST = 'Patient doesn\'t exist!',
  PATIENT_NOTHING_TO_UPDATE = 'There are not patient properties to update',

  ITEM_ALREADY_EXISTS = 'Item already exists! Use updateItem to update the item instead.',
  ITEM_DOESNT_EXIST = 'Item doesn\'t exist!',
  ITEM_NOTHING_TO_UPDATE = 'There are no item properties to update',

  TRANSACTION_NO_CATEGORY = 'Category is not defined!',
  TRANSACTION_NO_ITEM = 'Transactions of type CLINIC needs an Item ID!',
  TRANSACTION_NO_PRICE = 'Transactions that are NOT CLINIC types need a unit price!',
  TRANSACTION_NO_DURATION_DATE = 'TREATMENT period must have a start and end date!',
  TRANSACTION_INVALID_CATEGORY = 'Category is invalid!',
  TRANSACTION_INVALID_ITEM = 'Item ID is invalid',
  TRANSACTION_NOT_FOUND = 'Transaction not found!',
  TRANSACTION_NO_DOCTOR_NAME = 'Please enter name of doctor doing the TREATMENT!'
} = String
