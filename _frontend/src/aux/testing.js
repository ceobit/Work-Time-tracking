export const findByTestAtr = (component, attr) => {
  return component.find(`[data-test='${attr}']`);
};