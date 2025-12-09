@description('Azure region for the storage account (AFD is global).')
param location string

@description('Storage account name (3–24, lowercase letters + digits).')
param storage_account_name string

resource sa 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storage_account_name
  location: location
  kind: 'StorageV2'
  sku: { name: 'Standard_LRS' }
  properties: {
    supportsHttpsTrafficOnly: true
    allowBlobPublicAccess: false  // Set to false to comply with policy
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: sa
  name: 'default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource webContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: blobService
  name: '$web'
  properties: {
    publicAccess: 'None'  // Changed from 'Blob' to 'None'
  }
}
