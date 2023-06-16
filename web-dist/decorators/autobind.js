export default function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    /** Do not change the value of the method */
    const newDescriptor = {
        configurable: true,
        get() {
            const boundFxn = originalMethod.bind(this);
            return boundFxn;
        },
    };
    return newDescriptor;
}
//# sourceMappingURL=autobind.js.map