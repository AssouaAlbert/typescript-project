namespace App {
  export interface Validation {
    value: string | number;
    required?: boolean;
    minLenght?: number;
    maxLenght?: number;
    min?: number;
    max?: number;
  }
}