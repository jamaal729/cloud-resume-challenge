## Azure Version

### Bicep and Ansible
For IAC, uses Azure Bicep and Ansible for Deployment and CloudFlare for static website hosting

## Login to azure
```sh
az login
```

## Install Azure Bicep
```sh
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Install Ansible
```sh
pipx install --include-deps ansible
```

### Ansible vault for secrets
```sh
cd azure
ansible-vault create playbooks/vaults/prod.yml
ansible-vault edit playbooks/vaults/prod.yml
ansible-vault view playbooks/vaults/prod.yml
```

### Main Cloud Deployment Steps
 - Obtained domain from NameCheap
 - Configured CloudFlare for static site hosting
 - Deployed infrastructure to Azure Blob Storage 
 - Uploaded site assets to Blob Storage and configured static website settings
 - Set up CosmosDB instance to persist page visit counts
 - Implemented Python Azure function for updating page visit counts
