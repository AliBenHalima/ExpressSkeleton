const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const schema = require("../graphql/schemas");

 const UseGQL = (app) => {
    app.use(
        "/graphql",
        graphqlHTTP({
          schema: buildSchema(schema),
          rootValue: {
            events: () => {
              return ["A", "B"];
            },
            createEvent: (args) => {
              const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
              });
      
              return event
                .save()
                .then((res) => {
                  console.log("result's are ", res);
                  return res;
                })
                .catch((e) => {
                  console.log(e);
                  throw e;
                });
            },
            graphiql: true,
          },
        })
      );
      
}
module.exports= {UseGQL}