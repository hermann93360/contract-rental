import {FormType} from "./FormType";

export class BookForm{
  constructor(
    public form: FormType
  ) {
  }

  public static init() {
    return new BookForm(FormType.START);
  }
  public go(type: FormType) {
    this.form = type;
  }
}
