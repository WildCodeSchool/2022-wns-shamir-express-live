import { gql } from "apollo-server";

export default gql`
  type Wilder {
    name: String
    grades: [Grade]
  }

  type Skill {
    name: String
  }

  type Grade {
    votes: Int
    skill: Skill
  }

  type Query {
    getAllWilders: [Wilder]
  }

  type Mutation {
    createSkill(name: String): Skill
  }
`;
