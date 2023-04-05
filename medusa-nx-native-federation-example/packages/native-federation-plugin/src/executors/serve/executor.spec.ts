import { VersionExecutorSchema } from './schema';
import executor from './executor';

const options: VersionExecutorSchema = {};

describe('Version Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});