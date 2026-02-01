variable "bucket_name" {
  description = "Name of the GCS bucket to host the static site"
  type        = string
}

variable "function_name" { 
  type = string
}
variable "function_bucket_name" { 
  type = string
}
variable "function_object_name" { 
  type = string
}
variable "region" { 
  type = string
}

variable "service_account_email" {
  description = "Optional service account email for the Cloud Function service. If empty, uses google_service_account.fn_runtime.email"
  type        = string
  default     = ""
}

variable "service_available_cpu" {
  description = "CPU allocation for the Cloud Function service"
  type        = string
  default     = "1"
}

variable "service_available_memory" {
  description = "Memory allocation for the Cloud Function service"
  type        = string
  default     = "512M"
}

variable "service_timeout_seconds" {
  description = "Timeout (seconds) for the Cloud Function service"
  type        = number
  default     = 30
}

variable "service_ingress_settings" {
  description = "Ingress settings for the Cloud Function service"
  type        = string
  default     = "ALLOW_ALL"
}

variable "service_max_instance_request_concurrency" {
  description = "Max instance request concurrency for the Cloud Function service"
  type        = number
  default     = 2
}