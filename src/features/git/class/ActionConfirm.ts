export class ActionConfirm {
  constructor(public message: string) {
    this.message = message;
    this.name = "ActionConfirm";
  }

  name: string;
}
