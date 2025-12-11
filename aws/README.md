## AWS Version

### CloudFormation and Ansible
For IAC, CloudFormation is an aws service and straightforward to use, deployed using ansible

### Install Ansible
```sh
pipx install --include-deps boto3 botocore
pipx install --include-deps ansible
ansible-galaxy collection install amazon.aws
```

### Ansible vaults for secrets
```sh
cd aws
ansible-vault create playbooks/vaults/prod.yml
ansible-vault edit playbooks/vaults/prod.yml
ansible-vault view playbooks/vaults/prod.yml
```

### Install sam cli
```sh
curl -L https://github.com/aws/aws-sam-cli/releases/latest/download/install.sh -o install-sam.sh
sudo bash install-sam.sh --update
sam --version
```
