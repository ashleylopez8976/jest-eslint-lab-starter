const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {
  test('capitalizes the first letter of each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  test('returns an empty string for an empty input', () => {
    expect(capitalizeWords('')).toBe('');
  });

  test('capitalizes words separated by special characters', () => {
    expect(capitalizeWords('hello-world')).toBe('Hello-World');
  });

  test('capitalizes a single word', () => {
    expect(capitalizeWords('javascript')).toBe('Javascript');
  });
});

describe('filterActiveUsers', () => {
  test('returns only active users from a mixed array', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Bob', isActive: false },
      { name: 'Carol', isActive: true },
    ];

    expect(filterActiveUsers(users)).toEqual([
      { name: 'Alice', isActive: true },
      { name: 'Carol', isActive: true },
    ]);
  });

  test('returns an empty array when all users are inactive', () => {
    const users = [
      { name: 'Alice', isActive: false },
      { name: 'Bob', isActive: false },
    ];

    expect(filterActiveUsers(users)).toEqual([]);
  });

  test('returns an empty array when given an empty array', () => {
    expect(filterActiveUsers([])).toEqual([]);
  });
});

describe('logAction', () => {
  test('generates the correct log string for valid inputs', () => {
    const result = logAction('login', 'Alice');

    expect(result).toMatch(
      /^User Alice performed login at \d{4}-\d{2}-\d{2}T.*Z$/,
    );
  });

  test('handles a missing action', () => {
    const result = logAction(undefined, 'Alice');

    expect(result).toContain('User Alice performed undefined at');
  });

  test('handles a missing username', () => {
    const result = logAction('login');

    expect(result).toContain('User undefined performed login at');
  });

  test('handles empty strings as inputs', () => {
    const result = logAction('', '');

    expect(result).toContain('User  performed  at');
  });
});
