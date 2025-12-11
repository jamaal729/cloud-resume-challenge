@description('Azure region for resources')
param location string = resourceGroup().location

@description('Function App name')
param functionAppName string

@description('Storage account name for Function App')
param storageAccountName string

@description('Cosmos DB account name')
param cosmosDbAccountName string

@description('Cosmos DB database name')
param cosmosDatabaseName string = 'viewCounterDb'

@description('Cosmos DB container name')
param cosmosContainerName string = 'counter'

// Reference existing Cosmos DB account
resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2023-03-15' existing = {
  name: cosmosDbAccountName
}

// Storage account for Function App
resource functionStorage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  kind: 'StorageV2'
  sku: { name: 'Standard_LRS' }
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
  }
}

// App Service Plan (Consumption)
resource hostingPlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: '${functionAppName}-plan'
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
  properties: {}
}

// Function App
resource functionApp 'Microsoft.Web/sites@2022-09-01' = {
  name: functionAppName
  location: location
  kind: 'functionapp,linux'
  properties: {
    serverFarmId: hostingPlan.id
    siteConfig: {
      appSettings: [
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${functionStorage.name};AccountKey=${functionStorage.listKeys().keys[0].value};EndpointSuffix=core.windows.net'
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~4'
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'python'
        }
        {
          name: 'COSMOS_ENDPOINT'
          value: cosmosAccount.properties.documentEndpoint
        }
        {
          name: 'COSMOS_KEY'
          value: cosmosAccount.listKeys().primaryMasterKey
        }
        {
          name: 'COSMOS_DB_NAME'
          value: cosmosDatabaseName
        }
        {
          name: 'COSMOS_CONTAINER'
          value: cosmosContainerName
        }
        {
          name: 'COUNTER_PK'
          value: 'global'
        }
      ]
      cors: {
        allowedOrigins: ['*']
        supportCredentials: false
      }
    }
    httpsOnly: true
  }
}

output functionAppName string = functionApp.name
output functionAppUrl string = 'https://${functionApp.properties.defaultHostName}'
