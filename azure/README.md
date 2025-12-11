
## Azure Version

### Bicep and Ansible
For IAC, uses Azure Bicep and ansible

## Login to azure and select subscription / directory

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

### Ansible vaults for secrets
```sh
cd azure
ansible-vault create playbooks/vaults/prod.yml
ansible-vault edit playbooks/vaults/prod.yml
ansible-vault view playbooks/vaults/prod.yml
```
