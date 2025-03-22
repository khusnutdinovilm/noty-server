class ApiError extends Error {
  public status: number;
  public errors?: unknown[];

  constructor(status: number, message: string, errors?: unknown[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string, errors = [] as unknown[]) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static Forribiden() {
    return new ApiError(403, "Недостаточно прав");
  }
}

export default ApiError;
