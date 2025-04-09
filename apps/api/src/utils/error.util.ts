/**
 * Catches errors from a promise and returns them in a typed manner.
 * @template T - The type of the resolved value of the promise.
 * @template E - The type of the error to catch, extending the Error constructor.
 * @param {Promise<T>} promise - The promise to handle.
 * @param {E[]} errorsToCatch - An optional array of error constructors to catch.
 * @returns {Promise<[InstanceType<E>] | [undefined, T]>} A promise that resolves to a tuple.
 * The first element is either an instance of the caught error or undefined if no error was caught.
 * The second element is the resolved value of the promise if no error was caught.
 */
export const catchErrorTyped = async <T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[],
): Promise<[InstanceType<E>] | [undefined, T]> => {
  return promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((error) => {
      if (errorsToCatch === undefined) {
        return [error]
      }

      if (errorsToCatch.some((errorType) => error instanceof errorType)) {
        return [error]
      }

      throw error
    })
}
