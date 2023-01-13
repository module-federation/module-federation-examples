import { NFPServeExecutorOptions } from './schema';
import executor from './executor';

const options: NFPServeExecutorOptions = {
  buildTarget: 'remote:build',
  port: 4200,
};

describe('Serve Executor', () => {
  it('can run', async () => {
    const output = await executor(options, null);
    expect(output.success).toBe(true);
  });
});
