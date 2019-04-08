import isMatch from 'lodash/isMatch';
import validateMockData from 'remotedev-app/lib/utils/validateMockData';

const invalidMockMessage = '[DEVTOOL] Invalid mock data.';
const validMockMessage =
  '[DEVTOOL] Mock actions applied! Your app may not run as expected.';
const duplicatedMockMessage =
  '[DEVTOOL] More than one mock action found! Only apply the first one.';

export default class MockManager {
  constructor() {
    this.mockData = [];
  }

  applyMock(mockData) {
    const isValidMockData = validateMockData(mockData);
    if (!isValidMockData) return console.warn(invalidMockMessage);
    console.warn(validMockMessage);
    this.mockData = mockData;
  }

  mockAction(action) {
    const mappedActions = this.mockData.filter(([fromAction]) =>
      isMatch(action, fromAction),
    );
    if (mappedActions.length < 1) return action;
    if (mappedActions.length > 1) console.warn(duplicatedMockMessage);
    return mappedActions[0][1];
  }
}
