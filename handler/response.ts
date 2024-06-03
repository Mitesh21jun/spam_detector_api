export default class ApiResponse {
  success: boolean | null;
  data: [] | object | null;
  error: unknown;
  message?: string;

  constructor(success: boolean, data: any, error?: any, message?: string) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.message = message;
  }
}
