const client = require("./elasticsearch/client");

async function generateApiKeys(opts) {
  const body = await client.security.createApiKey({
    body: {
      name: "test",
      role_descriptors: {
        test_example_writer: {
          cluster: ["monitor"],
          index: [
            {
              names: ["test"],
              privileges: ["create_index", "write", "read", "manage"],
            },
          ],
        },
      },
    },
  });
  return Buffer.from(`${body.id}: ${body.api_key}`).toString("base64");
}

generateApiKeys()
  .then((res) => console.log(res))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
