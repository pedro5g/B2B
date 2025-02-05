import { config } from '@/shared/config';
import { app } from './app';
import { prisma } from '@/shared/lib/prisma';
import { ExitStatus } from '@/shared/enums/exit-code';

const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

const server = app.listen(config.PORT, async (error) => {
  if (error) {
    console.error(`Error when to start app, error: ${error}`);
    process.exit(ExitStatus.FAILURE);
  }
  try {
    await prisma.$connect();
    console.log(`Server is running on PORT ${config.PORT} 🚀`);
  } catch (err) {
    console.error(`Error when to start app, error: ${err}`);
    process.exit(ExitStatus.FAILURE);
  }
});

exitSignals.forEach((signal) => {
  process.on(signal, () => {
    console.info(`Event ${signal} received, server is exiting...`);
    server.close(async (error) => {
      if (error) {
        console.error(`Error when closing, error: ${error}`);
      }
      console.info('Start closing the database connection...');
      await prisma.$disconnect();
      console.log('Server exited successfully!');
      process.exit(ExitStatus.SUCCESS);
    });
  });
});
