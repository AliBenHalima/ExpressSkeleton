module.exports= `
type RootQuery {
    events: [String!]!
}

type  RootMutation{
    createEvent(eventInput :EventInput) : Event
}

type Event {
    _id:ID!
    title : String!
    description : String!
    price : Float!
    
}

input EventInput {
    title : String!
    description : String!
    price : Float!
    
}

schema {
    query : RootQuery
    mutation : RootMutation 
}
`;
