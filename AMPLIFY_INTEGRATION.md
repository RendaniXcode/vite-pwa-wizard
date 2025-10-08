# AWS Amplify Integration Guide

## Overview
This document outlines the integration plan for deploying the Egg Sales Management app using AWS Amplify with CDK, Cognito, AppSync, and DynamoDB.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AWS Amplify Hosting                      │
│                    (React Frontend App)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      AWS Cognito                             │
│              (User Authentication & Management)              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      AWS AppSync                             │
│                  (GraphQL API Gateway)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Amazon DynamoDB                         │
│            (NoSQL Database - Sales, Customers, Orders)       │
└─────────────────────────────────────────────────────────────┘
```

## Phase 1: AWS Infrastructure Setup (CDK)

### 1.1 CDK Stack Components

Create the following resources using AWS CDK:

#### Cognito User Pool
- User pool for authentication
- Email verification
- Password policies
- MFA configuration (optional)
- Custom attributes for user profiles

#### AppSync GraphQL API
- GraphQL schema definition
- Resolvers for DynamoDB operations
- Authorization rules (Cognito User Pools)
- Subscription support for real-time updates

#### DynamoDB Tables

**Customers Table**
```typescript
{
  PK: string,           // "CUSTOMER#{customerId}"
  SK: string,           // "METADATA"
  customerId: string,
  name: string,
  phone: string,
  email?: string,
  businessType: string,
  address?: string,
  creditLimit: number,
  outstandingBalance: number,
  totalPurchases: number,
  lastPurchaseDate?: string,
  createdAt: string,
  notes?: string,
  GSI1PK: string,      // "CUSTOMER"
  GSI1SK: string       // createdAt for sorting
}
```

**Sales Table**
```typescript
{
  PK: string,           // "SALE#{saleId}"
  SK: string,           // "METADATA"
  saleId: string,
  customerId: string,
  customerName: string,
  customerPhone: string,
  productVariantId: string,
  productName: string,
  quantity: number,
  pricePerDozen: number,
  total: number,
  paymentMethod: "cash" | "credit",
  location: {
    province: string,
    metro: string,
    neighborhood: string
  },
  date: string,
  notes?: string,
  GSI1PK: string,      // "CUSTOMER#{customerId}"
  GSI1SK: string,      // date for customer's sales history
  GSI2PK: string,      // "SALE"
  GSI2SK: string       // date for all sales
}
```

**Orders Table**
```typescript
{
  PK: string,           // "ORDER#{orderId}"
  SK: string,           // "METADATA"
  orderId: string,
  farmerName: string,
  quantity: number,
  notes?: string,
  status: "pending" | "confirmed" | "delivered",
  date: string,
  GSI1PK: string,      // "ORDER"
  GSI1SK: string       // date for sorting
}
```

**User Roles Table**
```typescript
{
  PK: string,           // "USER#{userId}"
  SK: string,           // "ROLE#{role}"
  userId: string,
  role: "admin" | "user",
  createdAt: string
}
```

### 1.2 CDK Deployment Commands

```bash
# Initialize CDK project
cdk init app --language typescript

# Deploy infrastructure
cdk deploy

# Output: Cognito User Pool ID, AppSync API URL, API Key
```

## Phase 2: Frontend Integration

### 2.1 Install AWS Amplify Dependencies

```bash
npm install aws-amplify @aws-amplify/ui-react
```

### 2.2 Amplify Configuration

Create `src/aws-config.ts`:

```typescript
import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.VITE_AWS_USER_POOL_ID || '',
      userPoolClientId: process.env.VITE_AWS_USER_POOL_CLIENT_ID || '',
      identityPoolId: process.env.VITE_AWS_IDENTITY_POOL_ID || '',
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
          required: true,
        },
        given_name: {
          required: true,
        },
        family_name: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: process.env.VITE_AWS_APPSYNC_ENDPOINT || '',
      region: process.env.VITE_AWS_REGION || 'us-east-1',
      defaultAuthMode: 'userPool',
    },
  },
};

Amplify.configure(awsConfig);

export default awsConfig;
```

### 2.3 Environment Variables

Create `.env.local`:

```bash
VITE_AWS_REGION=us-east-1
VITE_AWS_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_AWS_USER_POOL_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_AWS_IDENTITY_POOL_ID=us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
VITE_AWS_APPSYNC_ENDPOINT=https://XXXXXXXXXXXXXXXXXXXXX.appsync-api.us-east-1.amazonaws.com/graphql
```

## Phase 3: Authentication Migration

### 3.1 Replace LocalStorage Auth with Cognito

#### Update Login Component

```typescript
import { signIn } from 'aws-amplify/auth';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password: password,
    });
    
    if (isSignedIn) {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate("/dashboard");
    }
  } catch (error) {
    toast({
      title: "Login failed",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
```

#### Update Register Component

```typescript
import { signUp } from 'aws-amplify/auth';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          email: email,
          given_name: firstName,
          family_name: lastName,
        },
      },
    });
    
    if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
      navigate('/verify-email', { state: { email, type: 'verification' } });
    }
  } catch (error) {
    toast({
      title: "Registration failed",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
```

#### Update Email Verification

```typescript
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const { isSignUpComplete } = await confirmSignUp({
      username: email,
      confirmationCode: otp,
    });
    
    if (isSignUpComplete) {
      toast({
        title: "Email verified",
        description: "You can now log in to your account.",
      });
      navigate('/login');
    }
  } catch (error) {
    toast({
      title: "Verification failed",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
```

### 3.2 Protected Routes

Create `src/components/auth/ProtectedRoute.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  const checkAuth = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };
  
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}
```

## Phase 4: GraphQL Integration

### 4.1 GraphQL Schema

Create AppSync schema:

```graphql
type Customer @aws_cognito_user_pools {
  id: ID!
  name: String!
  phone: String!
  email: String
  businessType: String!
  address: String
  creditLimit: Float!
  outstandingBalance: Float!
  totalPurchases: Float!
  lastPurchaseDate: AWSDateTime
  createdAt: AWSDateTime!
  notes: String
}

type Sale @aws_cognito_user_pools {
  id: ID!
  customerId: ID!
  customerName: String!
  customerPhone: String!
  productVariantId: String!
  productName: String!
  quantity: Int!
  pricePerDozen: Float!
  total: Float!
  paymentMethod: PaymentMethod!
  location: Location!
  date: AWSDateTime!
  notes: String
}

type Order @aws_cognito_user_pools {
  id: ID!
  farmerName: String!
  quantity: Int!
  notes: String
  status: OrderStatus!
  date: AWSDateTime!
}

enum PaymentMethod {
  cash
  credit
}

enum OrderStatus {
  pending
  confirmed
  delivered
}

type Location {
  province: String!
  metro: String!
  neighborhood: String!
}

input CreateCustomerInput {
  name: String!
  phone: String!
  email: String
  businessType: String!
  address: String
  creditLimit: Float!
  notes: String
}

input CreateSaleInput {
  customerId: ID!
  productVariantId: String!
  quantity: Int!
  pricePerDozen: Float!
  paymentMethod: PaymentMethod!
  location: LocationInput!
  notes: String
}

input LocationInput {
  province: String!
  metro: String!
  neighborhood: String!
}

input CreateOrderInput {
  farmerName: String!
  quantity: Int!
  notes: String
  status: OrderStatus!
}

type Query {
  getCustomer(id: ID!): Customer
  listCustomers(limit: Int, nextToken: String): CustomerConnection
  getSale(id: ID!): Sale
  listSales(limit: Int, nextToken: String): SaleConnection
  listSalesByCustomer(customerId: ID!, limit: Int, nextToken: String): SaleConnection
  getOrder(id: ID!): Order
  listOrders(limit: Int, nextToken: String): OrderConnection
}

type Mutation {
  createCustomer(input: CreateCustomerInput!): Customer
  updateCustomer(id: ID!, input: CreateCustomerInput!): Customer
  deleteCustomer(id: ID!): Customer
  createSale(input: CreateSaleInput!): Sale
  createOrder(input: CreateOrderInput!): Order
  updateOrderStatus(id: ID!, status: OrderStatus!): Order
}

type CustomerConnection {
  items: [Customer]
  nextToken: String
}

type SaleConnection {
  items: [Sale]
  nextToken: String
}

type OrderConnection {
  items: [Order]
  nextToken: String
}
```

### 4.2 GraphQL Queries and Mutations

Create `src/graphql/queries.ts`:

```typescript
export const listCustomers = /* GraphQL */ `
  query ListCustomers($limit: Int, $nextToken: String) {
    listCustomers(limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
        email
        businessType
        address
        creditLimit
        outstandingBalance
        totalPurchases
        lastPurchaseDate
        createdAt
        notes
      }
      nextToken
    }
  }
`;

export const createSale = /* GraphQL */ `
  mutation CreateSale($input: CreateSaleInput!) {
    createSale(input: $input) {
      id
      customerId
      customerName
      customerPhone
      productVariantId
      productName
      quantity
      pricePerDozen
      total
      paymentMethod
      location {
        province
        metro
        neighborhood
      }
      date
      notes
    }
  }
`;
```

### 4.3 API Client Hook

Create `src/hooks/useGraphQL.ts`:

```typescript
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

export const useGraphQL = () => {
  const query = async (query: string, variables?: any) => {
    try {
      const result = await client.graphql({
        query,
        variables,
      });
      return result.data;
    } catch (error) {
      console.error('GraphQL query error:', error);
      throw error;
    }
  };

  const mutate = async (mutation: string, variables?: any) => {
    try {
      const result = await client.graphql({
        query: mutation,
        variables,
      });
      return result.data;
    } catch (error) {
      console.error('GraphQL mutation error:', error);
      throw error;
    }
  };

  return { query, mutate };
};
```

## Phase 5: Data Migration

### 5.1 LocalStorage to DynamoDB Migration Script

Create a migration utility to move existing data:

```typescript
// src/utils/migration.ts
import { useGraphQL } from '@/hooks/useGraphQL';

export const migrateLocalStorageData = async () => {
  const { mutate } = useGraphQL();
  
  // Migrate customers
  const customers = JSON.parse(localStorage.getItem('customers') || '[]');
  for (const customer of customers) {
    await mutate(createCustomer, { input: customer });
  }
  
  // Migrate sales
  const sales = JSON.parse(localStorage.getItem('sales') || '[]');
  for (const sale of sales) {
    await mutate(createSale, { input: sale });
  }
  
  // Migrate orders
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  for (const order of orders) {
    await mutate(createOrder, { input: order });
  }
};
```

## Phase 6: Deployment

### 6.1 Amplify Hosting Setup

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your GitHub/GitLab/Bitbucket repository
   - Select branch for deployment

2. **Build Settings**

Create `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

3. **Environment Variables**
   - Add all VITE_AWS_* variables in Amplify Console
   - Configure custom domain (optional)

### 6.2 CI/CD Pipeline

Amplify automatically:
- Builds on every push to connected branch
- Runs tests (if configured)
- Deploys to staging/production
- Provides preview URLs for PRs

## Testing Checklist

- [ ] User registration with email verification
- [ ] User login and session management
- [ ] Password reset flow
- [ ] Create/Read/Update/Delete customers
- [ ] Record sales transactions
- [ ] Create and manage orders
- [ ] View sales history and analytics
- [ ] Test offline functionality (if applicable)
- [ ] Verify RLS policies in AppSync
- [ ] Load testing for concurrent users

## Security Considerations

1. **Cognito**
   - Enable MFA for admin users
   - Configure password policies
   - Set up account recovery

2. **AppSync**
   - Implement proper authorization rules
   - Use Cognito User Pools for authentication
   - Enable CloudWatch logging

3. **DynamoDB**
   - Enable point-in-time recovery
   - Set up backups
   - Monitor read/write capacity

## Cost Optimization

1. **DynamoDB**
   - Use on-demand billing for unpredictable workloads
   - Implement TTL for temporary data
   - Optimize GSI usage

2. **AppSync**
   - Cache frequently accessed queries
   - Batch operations when possible

3. **Amplify Hosting**
   - Enable CloudFront compression
   - Optimize asset delivery

## Next Steps

1. Set up AWS account and IAM users
2. Initialize CDK project and define infrastructure
3. Deploy CDK stack to AWS
4. Install Amplify dependencies in frontend
5. Configure Amplify with AWS resources
6. Migrate authentication to Cognito
7. Implement GraphQL queries/mutations
8. Test thoroughly
9. Deploy to Amplify Hosting
10. Monitor and optimize

## Support Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [AWS AppSync Documentation](https://docs.aws.amazon.com/appsync/)
- [Amazon Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)
