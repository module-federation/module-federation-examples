import { DashboardExecutorSchema } from './schema';
import executor from './executor';

const options: DashboardExecutorSchema = {};

describe('Dashboard Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});