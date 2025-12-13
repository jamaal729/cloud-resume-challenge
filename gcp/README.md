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
