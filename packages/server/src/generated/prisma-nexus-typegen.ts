import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    first?: boolean
    last?: boolean
    before?: boolean
    after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Session: Prisma.Session
  Participant: Prisma.Participant
  Consumption: Prisma.Consumption
  Drink: Prisma.Drink
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'password' | 'name' | 'birthDate' | 'weight' | 'gender' | 'Session' | 'Participant'
      ordering: 'id' | 'email' | 'password' | 'name' | 'birthDate' | 'weight' | 'gender'
    }
    sessions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'code' | 'owner' | 'ownerId' | 'participants'
      ordering: 'id' | 'name' | 'code' | 'ownerId'
    }
    participants: {
      filtering: 'AND' | 'OR' | 'NOT' | 'userId' | 'sessionId' | 'joinedDate' | 'user' | 'session' | 'Consumption'
      ordering: 'userId' | 'sessionId' | 'joinedDate'
    }
    consumptions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'time' | 'participant' | 'participantUserId' | 'participantSessionId' | 'drink' | 'drinkId'
      ordering: 'id' | 'time' | 'participantUserId' | 'participantSessionId' | 'drinkId'
    }
    drinks: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'percentage' | 'volume' | 'consumption'
      ordering: 'id' | 'name' | 'percentage' | 'volume'
    }
  },
  User: {
    Session: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'code' | 'owner' | 'ownerId' | 'participants'
      ordering: 'id' | 'name' | 'code' | 'ownerId'
    }
    Participant: {
      filtering: 'AND' | 'OR' | 'NOT' | 'userId' | 'sessionId' | 'joinedDate' | 'user' | 'session' | 'Consumption'
      ordering: 'userId' | 'sessionId' | 'joinedDate'
    }
  }
  Session: {
    participants: {
      filtering: 'AND' | 'OR' | 'NOT' | 'userId' | 'sessionId' | 'joinedDate' | 'user' | 'session' | 'Consumption'
      ordering: 'userId' | 'sessionId' | 'joinedDate'
    }
  }
  Participant: {
    Consumption: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'time' | 'participant' | 'participantUserId' | 'participantSessionId' | 'drink' | 'drinkId'
      ordering: 'id' | 'time' | 'participantUserId' | 'participantSessionId' | 'drinkId'
    }
  }
  Consumption: {

  }
  Drink: {
    consumption: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'time' | 'participant' | 'participantUserId' | 'participantSessionId' | 'drink' | 'drinkId'
      ordering: 'id' | 'time' | 'participantUserId' | 'participantSessionId' | 'drinkId'
    }
  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    session: 'Session'
    sessions: 'Session'
    participant: 'Participant'
    participants: 'Participant'
    consumption: 'Consumption'
    consumptions: 'Consumption'
    drink: 'Drink'
    drinks: 'Drink'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'AffectedRowsOutput'
    deleteOneUser: 'User'
    deleteManyUser: 'AffectedRowsOutput'
    upsertOneUser: 'User'
    createOneSession: 'Session'
    updateOneSession: 'Session'
    updateManySession: 'AffectedRowsOutput'
    deleteOneSession: 'Session'
    deleteManySession: 'AffectedRowsOutput'
    upsertOneSession: 'Session'
    createOneParticipant: 'Participant'
    updateOneParticipant: 'Participant'
    updateManyParticipant: 'AffectedRowsOutput'
    deleteOneParticipant: 'Participant'
    deleteManyParticipant: 'AffectedRowsOutput'
    upsertOneParticipant: 'Participant'
    createOneConsumption: 'Consumption'
    updateOneConsumption: 'Consumption'
    updateManyConsumption: 'AffectedRowsOutput'
    deleteOneConsumption: 'Consumption'
    deleteManyConsumption: 'AffectedRowsOutput'
    upsertOneConsumption: 'Consumption'
    createOneDrink: 'Drink'
    updateOneDrink: 'Drink'
    updateManyDrink: 'AffectedRowsOutput'
    deleteOneDrink: 'Drink'
    deleteManyDrink: 'AffectedRowsOutput'
    upsertOneDrink: 'Drink'
  },
  User: {
    id: 'String'
    email: 'String'
    password: 'String'
    name: 'String'
    birthDate: 'DateTime'
    weight: 'Float'
    gender: 'Gender'
    Session: 'Session'
    Participant: 'Participant'
  }
  Session: {
    id: 'String'
    name: 'String'
    code: 'String'
    owner: 'User'
    ownerId: 'String'
    participants: 'Participant'
  }
  Participant: {
    userId: 'String'
    sessionId: 'String'
    joinedDate: 'DateTime'
    user: 'User'
    session: 'Session'
    Consumption: 'Consumption'
  }
  Consumption: {
    id: 'String'
    time: 'DateTime'
    participant: 'Participant'
    participantUserId: 'String'
    participantSessionId: 'String'
    drink: 'Drink'
    drinkId: 'String'
  }
  Drink: {
    id: 'String'
    name: 'String'
    percentage: 'Float'
    volume: 'Float'
    consumption: 'Consumption'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Session: Typegen.NexusPrismaFields<'Session'>
  Participant: Typegen.NexusPrismaFields<'Participant'>
  Consumption: Typegen.NexusPrismaFields<'Consumption'>
  Drink: Typegen.NexusPrismaFields<'Drink'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  