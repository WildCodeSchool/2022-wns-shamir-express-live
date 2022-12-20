import createServer from "./tools/server";

const port = 5002;

const start = async (): Promise<void> => {
  const server = await createServer();
  try {
    const { url }: { url: string } = await server.listen({ port });
    console.log(`Server ready at ${url}`);
  } catch (e) {
    console.error("Error starting the server");
  }
};

void start();
