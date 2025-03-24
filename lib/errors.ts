// Base App Error
export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

// The error that is thrown when the subscription has expired
export class ErrorSubscriptionExpired extends AppError {
  constructor(message = "Subscription has expired") {
    super(message);
  }
}

export class ErrorAccountNotConnected extends AppError {
  constructor(message = "No account connected") {
    super(message);
  }
}
