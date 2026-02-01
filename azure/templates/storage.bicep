targetScope = 'subscription'

@description('Azure region for the storage account (AFD is global).')
param location string

@description('Resource group name to create.')
param resource_group_name string

@description('Storage account name (3–24, lowercase letters + digits).')
param storage_account_name string

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resource_group_name
  location: location
}

module storageModule './storage-module.bicep' = {
  name: 'storageDeployment'
  scope: rg
  params: {
    location: location
    storage_account_name: storage_account_name
  }
}

output storageAccountName string = storageModule.outputs.storageAccountName
output resourceGroupName string = rg.name
