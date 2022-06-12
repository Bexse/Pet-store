export interface User {
  email: {
    type: String;
    required: [true, 'Please add an email'];
    unique: true;
  };
  password: {
    type: String;
    required: [true, 'Please add a password'];
  };
  role: {
    type: String;
    required: [true, 'Please add breeder or buyer role'];
  };
}
