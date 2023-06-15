export default function autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
): any {
  const originalMethod = descriptor.value;
  /** Do not change the value of the method */
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFxn = originalMethod.bind(this);
      return boundFxn;
    },
  };
  return newDescriptor;
}
