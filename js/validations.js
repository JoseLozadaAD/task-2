class Validations {
  static fields = [];

  constructor(value, field, error) {
    this.value = value;
    this.field = field;
    this.error = error;
  }

  static init(...fields) {
    fields.forEach((field) => {
      field.error = `${field.name} is required`;
      this.fields.push(field);
    });
  }

  static getValues() {
    const values = this.fields.map((field) => ({
      [field.name]: field.value,
    }));

    return values.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  }

  build() {
    this.field.error = '';
    this.error.classList.add('hidden');

    return false;
  }

  isRequired() {
    if (this.value === '') {
      this.field.error = `${this.field.name} is required`;
      this.setError();

      return true;
    }

    return this;
  }

  isGreaterThan(max) {
    if (this.value > max) {
      this.field.error = `${this.field.name} must not be greater than ${max}`;
      this.setError();

      return true;
    }

    return this;
  }

  isLessThan(min) {
    if (this.value < min) {
      this.field.error = `${this.field.name} must be greater than ${min}`;
      this.setError();

      return true;
    }

    return this;
  }

  isEmail() {
    if (!this.value.includes('@')) {
      this.field.error = `Invalid ${this.field.name}`;
      this.setError();

      return true;
    }

    return this;
  }

  isNumber() {
    if (isNaN(this.value)) {
      this.field.error = `${this.field.name} must be a number`;
      this.setError();

      return true;
    }

    return this;
  }

  setError() {
    this.error.textContent = this.field.error;
    this.error.classList.remove('hidden');
  }
}

export default Validations;
