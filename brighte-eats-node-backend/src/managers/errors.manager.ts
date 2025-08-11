export function createDuplicateNameError(name: string) {
  return {
    type: "DuplicateNameError",
    message: `The Name '${name}' already exists.`,
  };
}