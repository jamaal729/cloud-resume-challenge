## Using CloudFormation and Ansible
For IAC, CloudFormation is an aws service and straightforward to use
Deploy the CloudFormation workflow using ansible

## Install Ansible

```sh
pipx install boto3 botocore
pipx install --include-deps ansible
ansible-galaxy collection install amazon.aws
```


pipx install --include-deps boto3 botocore

```sh
cd aws
ansible-vault create playbooks/vaults/prod.yml
ansible-vault edit playbooks/vaults/prod.yml
ansible-vault view playbooks/vaults/prod.yml
```
