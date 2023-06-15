namespace App {
  export function validate(validatable: Validation): boolean {
    let isValidate = true;
    if (validatable.required) {
      isValidate =
        isValidate && validatable.value.toString().trim().length !== 0;
    }
    if (validatable.minLenght != null && typeof validatable.value == "string") {
      isValidate =
        isValidate && validatable.value.trim().length >= validatable.minLenght;
    }
    if (validatable.maxLenght != null && typeof validatable.value == "string") {
      isValidate =
        isValidate && validatable.value.trim().length <= validatable.maxLenght;
    }
    if (validatable.min != null && typeof validatable.value == "number") {
      isValidate = isValidate && validatable.value > validatable.min;
    }
    if (validatable.max != null && typeof validatable.value == "number") {
      isValidate = isValidate && validatable.value < validatable.max;
    }
    return isValidate;
  }
}
