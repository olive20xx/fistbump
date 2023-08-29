import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Cycle = {
  __typename?: 'Cycle';
  endDate?: Maybe<Scalars['Date']['output']>;
  nominationDeadline?: Maybe<Scalars['Date']['output']>;
  peersPerTarget?: Maybe<Scalars['Int']['output']>;
  reportDeadline?: Maybe<Scalars['Date']['output']>;
  reviewDeadline?: Maybe<Scalars['Date']['output']>;
  startDate?: Maybe<Scalars['Date']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Grade = {
  __typename?: 'Grade';
  comment?: Maybe<Scalars['String']['output']>;
  maxRating?: Maybe<Scalars['Int']['output']>;
  metric?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
};

export type GradeInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  maxRating?: InputMaybe<Scalars['Int']['input']>;
  metric?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  updateReport?: Maybe<Report>;
  updateUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<UserInput>;
};


export type MutationUpdateReportArgs = {
  cycleId: Scalars['String']['input'];
  input?: InputMaybe<ReportInput>;
  targetId: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UserInput>;
};

export type Query = {
  __typename?: 'Query';
  getCurrentCycle?: Maybe<Cycle>;
  getReport?: Maybe<Report>;
  getUser?: Maybe<User>;
  getUserByEmail?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  hello?: Maybe<Scalars['String']['output']>;
};


export type QueryGetReportArgs = {
  cycleId: Scalars['String']['input'];
  targetId: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserByEmailArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Report = {
  __typename?: 'Report';
  _id?: Maybe<ReportId>;
  reviews?: Maybe<Reviews>;
  status?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
};

export type ReportId = {
  __typename?: 'ReportID';
  cycleId?: Maybe<Scalars['String']['output']>;
  targetId?: Maybe<Scalars['String']['output']>;
};

export type ReportIdInput = {
  cycleId?: InputMaybe<Scalars['String']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
};

export type ReportInput = {
  _id?: InputMaybe<ReportIdInput>;
  reviews?: InputMaybe<ReviewsInput>;
  status?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
};

export type Review = {
  __typename?: 'Review';
  grades?: Maybe<Array<Maybe<Grade>>>;
  isDeclined?: Maybe<Scalars['Boolean']['output']>;
  reviewerId?: Maybe<Scalars['String']['output']>;
  submitted?: Maybe<Scalars['Boolean']['output']>;
};

export type ReviewInput = {
  grades?: InputMaybe<Array<InputMaybe<GradeInput>>>;
  isDeclined?: InputMaybe<Scalars['Boolean']['input']>;
  reviewerId?: InputMaybe<Scalars['String']['input']>;
  submitted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Reviews = {
  __typename?: 'Reviews';
  manager?: Maybe<Review>;
  peers?: Maybe<Array<Maybe<Review>>>;
  self?: Maybe<Review>;
};

export type ReviewsInput = {
  manager?: InputMaybe<ReviewInput>;
  peers?: InputMaybe<Array<InputMaybe<ReviewInput>>>;
  self?: InputMaybe<ReviewInput>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  hashedPw?: Maybe<Scalars['String']['output']>;
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  teamName?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  companyName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName?: InputMaybe<Scalars['String']['input']>;
  hashedPw?: InputMaybe<Scalars['String']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  photo?: InputMaybe<Scalars['String']['input']>;
  teamName?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Cycle: ResolverTypeWrapper<Cycle>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Grade: ResolverTypeWrapper<Grade>;
  GradeInput: GradeInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Report: ResolverTypeWrapper<Report>;
  ReportID: ResolverTypeWrapper<ReportId>;
  ReportIdInput: ReportIdInput;
  ReportInput: ReportInput;
  Review: ResolverTypeWrapper<Review>;
  ReviewInput: ReviewInput;
  Reviews: ResolverTypeWrapper<Reviews>;
  ReviewsInput: ReviewsInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Cycle: Cycle;
  Date: Scalars['Date']['output'];
  Grade: Grade;
  GradeInput: GradeInput;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  Report: Report;
  ReportID: ReportId;
  ReportIdInput: ReportIdInput;
  ReportInput: ReportInput;
  Review: Review;
  ReviewInput: ReviewInput;
  Reviews: Reviews;
  ReviewsInput: ReviewsInput;
  String: Scalars['String']['output'];
  User: User;
  UserInput: UserInput;
}>;

export type CycleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cycle'] = ResolversParentTypes['Cycle']> = ResolversObject<{
  endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  nominationDeadline?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  peersPerTarget?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reportDeadline?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  reviewDeadline?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GradeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Grade'] = ResolversParentTypes['Grade']> = ResolversObject<{
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxRating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  metric?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  updateReport?: Resolver<Maybe<ResolversTypes['Report']>, ParentType, ContextType, RequireFields<MutationUpdateReportArgs, 'cycleId' | 'targetId'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getCurrentCycle?: Resolver<Maybe<ResolversTypes['Cycle']>, ParentType, ContextType>;
  getReport?: Resolver<Maybe<ResolversTypes['Report']>, ParentType, ContextType, RequireFields<QueryGetReportArgs, 'cycleId' | 'targetId'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUserArgs>>;
  getUserByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUserByEmailArgs>>;
  getUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['Report'] = ResolversParentTypes['Report']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['ReportID']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<ResolversTypes['Reviews']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReportIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReportID'] = ResolversParentTypes['ReportID']> = ResolversObject<{
  cycleId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  grades?: Resolver<Maybe<Array<Maybe<ResolversTypes['Grade']>>>, ParentType, ContextType>;
  isDeclined?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  reviewerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  submitted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReviewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reviews'] = ResolversParentTypes['Reviews']> = ResolversObject<{
  manager?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType>;
  peers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Review']>>>, ParentType, ContextType>;
  self?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hashedPw?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  photo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  teamName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Cycle?: CycleResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Grade?: GradeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Report?: ReportResolvers<ContextType>;
  ReportID?: ReportIdResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Reviews?: ReviewsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

