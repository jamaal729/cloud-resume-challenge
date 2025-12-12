
## Azure Version

### Bicep and Ansible
For IAC, uses Azure Bicep and Ansible for Deployment and CloudFlare for static website hosting

## Install Azure Bicep

```sh
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Install Ansible
```sh
pipx install --include-deps ansible
```

## Login to azure
```sh
az login
```

### Ansible vaults for secrets
```sh
cd azure
ansible-vault create playbooks/vaults/prod.yml
ansible-vault edit playbooks/vaults/prod.yml
ansible-vault view playbooks/vaults/prod.yml
```
