export interface TestMessage {
  message: string;
}

export const generateTestMessage = (): TestMessage => {
  return {
    message: `Hello, world! ${Math.random()}`,
  };
};
