/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { Context } from "./../context"


declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  Gender: "FEMALE" | "MALE"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Consumption: { // root type
    id?: string | null; // ID
    time: NexusGenScalars['DateTime']; // DateTime!
  }
  Drink: { // root type
    id: string; // String!
    name?: string | null; // String
    percentage?: number | null; // Float
    volume?: number | null; // Float
  }
  Mutation: {};
  Participant: { // root type
    joinedDate: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: {};
  Session: { // root type
    code?: string | null; // String
    id?: string | null; // ID
    name?: string | null; // String
  }
  Subscription: {};
  User: { // root type
    birthDate: NexusGenScalars['DateTime']; // DateTime!
    gender?: NexusGenEnums['Gender'] | null; // Gender
    height?: number | null; // Float
    id?: string | null; // ID
    name?: string | null; // String
    weight?: number | null; // Float
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Consumption: { // field return type
    drink: NexusGenRootTypes['Drink'] | null; // Drink
    id: string | null; // ID
    time: NexusGenScalars['DateTime']; // DateTime!
  }
  Drink: { // field return type
    id: string; // String!
    name: string | null; // String
    percentage: number | null; // Float
    volume: number | null; // Float
  }
  Mutation: { // field return type
    createUser: NexusGenRootTypes['User'] | null; // User
  }
  Participant: { // field return type
    consumptions: Array<NexusGenRootTypes['Consumption'] | null> | null; // [Consumption]
    joinedDate: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User'] | null; // User
  }
  Query: { // field return type
    allConsumptions: Array<NexusGenRootTypes['Consumption'] | null> | null; // [Consumption]
    allDrinks: Array<NexusGenRootTypes['Drink'] | null> | null; // [Drink]
    allSessions: Array<NexusGenRootTypes['Session'] | null> | null; // [Session]
    allUsers: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    findDrink: NexusGenRootTypes['Drink'] | null; // Drink
    findUser: NexusGenRootTypes['User'] | null; // User
  }
  Session: { // field return type
    code: string | null; // String
    id: string | null; // ID
    name: string | null; // String
    owner: NexusGenRootTypes['User'] | null; // User
    participants: Array<NexusGenRootTypes['Participant'] | null> | null; // [Participant]
  }
  Subscription: { // field return type
    newUser: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    birthDate: NexusGenScalars['DateTime']; // DateTime!
    gender: NexusGenEnums['Gender'] | null; // Gender
    height: number | null; // Float
    id: string | null; // ID
    name: string | null; // String
    weight: number | null; // Float
  }
}

export interface NexusGenFieldTypeNames {
  Consumption: { // field return type name
    drink: 'Drink'
    id: 'ID'
    time: 'DateTime'
  }
  Drink: { // field return type name
    id: 'String'
    name: 'String'
    percentage: 'Float'
    volume: 'Float'
  }
  Mutation: { // field return type name
    createUser: 'User'
  }
  Participant: { // field return type name
    consumptions: 'Consumption'
    joinedDate: 'DateTime'
    user: 'User'
  }
  Query: { // field return type name
    allConsumptions: 'Consumption'
    allDrinks: 'Drink'
    allSessions: 'Session'
    allUsers: 'User'
    findDrink: 'Drink'
    findUser: 'User'
  }
  Session: { // field return type name
    code: 'String'
    id: 'ID'
    name: 'String'
    owner: 'User'
    participants: 'Participant'
  }
  Subscription: { // field return type name
    newUser: 'User'
  }
  User: { // field return type name
    birthDate: 'DateTime'
    gender: 'Gender'
    height: 'Float'
    id: 'ID'
    name: 'String'
    weight: 'Float'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      birthDate: string; // String!
      gender: NexusGenEnums['Gender']; // Gender!
      height: number; // Float!
      name: string; // String!
      weight: number; // Float!
    }
  }
  Query: {
    findDrink: { // args
      drinkId: number; // Int!
    }
    findUser: { // args
      uuid: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}