## AWS Version

### CloudFormation and Ansible
For IAC, the CloudFormation aws service is straightforward to use, and deployed using ansible

### Install Ansible
```sh
pipx install --include-deps boto3 botocore
pipx install --include-deps ansible
ansible-galaxy collection install amazon.aws
```

### Ansible vault for secrets
```sh
cd aws
ansible-vault create playbooks/vaults/prod.yml
ansible-vault edit playbooks/vaults/prod.yml
ansible-vault view playbooks/vaults/prod.yml
```

### Install aws sam cli
```sh
curl -L https://github.com/aws/aws-sam-cli/releases/latest/download/install.sh -o install-sam.sh
sudo bash install-sam.sh --update
sam --version
```

### Install aws cli
```sh
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Main Cloud Deployment Steps
 - Obtained domain from NameCheap
 - Configured domain with nameservers from Route 53 hosted zone
 - Deployed infrastructure to AWS S3 Bucket 
 - Uploaded site assets to S3 Bucket and configured static website settings 
 - Set up DynamoDB instance to persist page visit counts
 - Implemented Python lambda function for updating page visit counts
