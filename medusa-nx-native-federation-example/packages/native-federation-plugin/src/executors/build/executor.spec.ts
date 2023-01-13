import { NFPBuildExecutorOptions } from './schema';
import executor from './executor';

const options: NFPBuildExecutorOptions = {
  baseUrl: 'http://localhost:3000/',
};

describe('Build Executor', () => {
  it('can run', async () => {
    const output = await executor(options, null);
    expect(output.success).toBe(true);
  });
});
