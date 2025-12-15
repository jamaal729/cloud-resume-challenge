provider "google" {
  project = "cloud-resume-challenge-jja"
  region  = var.region
}

terraform {
  cloud {
    organization = "terra_first"
    workspaces { name = "jamaal-ahmed-gcp-resume" }
  }
}

# --- Static website bucket (unchanged) ---
resource "google_storage_bucket" "static_site" {
  name          = var.bucket_name
  location      = var.region
  force_destroy = true

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

resource "google_storage_bucket_iam_binding" "public_access" {
  bucket = google_storage_bucket.static_site.name
  role   = "roles/storage.objectViewer"
  members = ["allUsers"]
}

resource "google_project_service" "apis" {
  for_each = toset([
    "cloudfunctions.googleapis.com",
    "run.googleapis.com",
    "cloudbuild.googleapis.com",
    "artifactregistry.googleapis.com",
    "eventarc.googleapis.com",
    "logging.googleapis.com",
    "storage.googleapis.com",
  ])
  service = each.key
  disable_on_destroy = false
}

resource "google_service_account" "fn_runtime" {
  account_id   = "fn-viewcounter-runtime"
  display_name = "Runtime SA for View Counter (Cloud Functions Gen2)"
}

# --- HTTP Cloud Function (2nd gen) exposed directly ---
resource "google_cloudfunctions2_function" "fn" {
  name        = var.function_name
  location    = var.region
  description = "CRC View Counter"

  build_config {
    runtime     = "python314"         # your Python runtime
    entry_point = "hello_http"     # function entry in your code
    source {
      storage_source {
        bucket = var.function_bucket_name
        object = var.function_object_name
      }
    }
  }

  service_config {
    service_account_email = google_service_account.fn_runtime.email
    available_cpu    = "1"
    available_memory = "512M"
    timeout_seconds  = 30
    ingress_settings = "ALLOW_ALL" # allow public egress to the URL
    max_instance_request_concurrency = 2
  }
}

# Make the function PUBLIC for unauthenticated HTTP
# (Gen2 uses Cloud Run's IAM: roles/run.invoker on the underlying service)
resource "google_cloud_run_service_iam_member" "public_invoker" {
  location = var.region
  service  = google_cloudfunctions2_function.fn.service_config[0].service
  role     = "roles/run.invoker"
  member   = "allUsers"

  # Ensure the Cloud Run service from the function exists first
  depends_on = [google_cloudfunctions2_function.fn]
}

# Helpful outputs
output "function_url" {
  description = "Direct HTTPS URL of the function"
  value       = google_cloudfunctions2_function.fn.url
}

output "cloud_run_service_name" {
  description = "Underlying Cloud Run service name"
  value       = google_cloudfunctions2_function.fn.service_config[0].service
}