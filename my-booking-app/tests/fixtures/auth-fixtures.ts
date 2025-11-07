import { test as base } from '@playwright/test';
import { TestDataGenerator } from '@/tests/utils/test-data';

type AuthFixtures = {
  existingUser: {
    name: string;
    email: string;
    password: string;
  };
};

export const test = base.extend<AuthFixtures>({
  // Creates a user in database and provides credentials
  existingUser: async ({ page }, use) => {
    const userData = TestDataGenerator.generateUserData();
    
    // Create user via API call to signup endpoint
    await page.request.post('/api/auth/signup', {
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password
      }
    });
    
    await use(userData);
    
    // Cleanup: Delete user after test (optional)
    // await page.request.delete(`/api/users/${userData.email}`);
  }
});

export { expect } from '@playwright/test';