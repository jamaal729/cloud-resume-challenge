## GCP Version

### Terraform / Cloudflare
For IAC, uses Terraform for Deployment and CloudFlare for static website hosting

## Install Terraform (Ubuntu)

Here are the steps required to [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)

```sh
$ sudo apt-get update && sudo apt-get install -y gnupg software-properties-common

$ wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null

$ gpg --no-default-keyring \
--keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
--fingerprint

$ echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(grep -oP '(?<=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list

$ sudo apt update

$ sudo apt-get install terraform
```

### GCP Service Account

In GCP create service account with Infrastructure Administrator role

```sh
export GOOGLE_APPLICATION_CREDENTIALS=/workspaces/cloud-resume-challenge/gcp/gcp-key.json
```

To persist, add to `.bashrc` and reload bash file

```sh
source ~/.bashrc
env | grep GOOGLE
```

### Install Ansible
```sh
pipx install --include-deps ansible
ansible-galaxy collection install -r requirements.txt
```

### Ansible playbook vault
```sh
cd gcp
ansible-vault create playbooks/vaults/prod.yml
ansible-vault edit playbooks/vaults/prod.yml
ansible-vault view playbooks/vaults/prod.yml
```

### Add gcp key credentials to vault
E.g.
```sh
gcp_service_account_contents: |
  # Paste the entire content of your credentials.json file here
  {
    "type": "service_account",
    "project_id": "your-project-id",
    "private_key_id": "...",
    "private_key": "-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n",
    "client_email": "...",
    "client_id": "...",
    "auth_uri": "...",
    "token_uri": "...",
    "auth_provider_x509_cert_url": "...",
    "client_x509_cert_url": "..."
  }
```

### Install GCloud
Needed for task that syncs built application to Google Cloud Storage (GCS)
```sh
sudo apt-get update && \
sudo apt-get install -y apt-transport-https ca-certificates gnupg curl && \
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg && \
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
sudo apt-get update && sudo apt-get install -y google-cloud-cli
```

### Backend Components

#### 1. Visitor Counter Function
A Python-based Google Cloud Function that tracks website visitors:
- **Trigger**: HTTP endpoint (GET/POST requests)
- **Runtime**: Python 3.x
- **Purpose**: Increments and returns visitor count
- **CORS Enabled**: Allows frontend JavaScript to call the API
- **Authentication**: Public access for visitor counting

The function:
1. Receives HTTP request from the website
2. Queries Firestore for current visitor count
3. Increments the counter atomically
4. Returns updated count as JSON response

#### 2. Firestore Database
A serverless NoSQL database storing visitor analytics:
- **Type**: Native mode Firestore
- **Collection**: `counters` or similar
- **Document**: Stores visitor count and metadata

### Main Deployment Steps
 - Configure service account and export `GOOGLE_APPLICATION_CREDENTIALS`
 - Store sensitive data (CloudFlare API keys, service account JSON)
 - Create `terraform.tfvars` with your project details
 - Run `terraform init` in the terraform directory
 - Deploy GCP resources with `terraform apply`
   - Creates GCS bucket
   - Deploys Cloud Function
   - Sets up Firestore database
 - Execute Ansible playbooks to build and sync to GCS
 - Verify Cloud Function responds at its URL
