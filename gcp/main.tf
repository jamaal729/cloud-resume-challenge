provider "google" {
  project     = "cloud-resume-challenge-jja"
  region      = "us-east1"
}

resource "google_storage_bucket" "static_site" {
  name          = var.bucket_name
  location      = "us-east1"
  force_destroy = true

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

resource "google_storage_bucket_iam_binding" "public_access" {
  bucket = google_storage_bucket.static_site.name

  role = "roles/storage.objectViewer"

  members = [
    "allUsers",
  ]
}

terraform { 
  cloud { 
    organization = "terra_first" 

    workspaces { 
      name = "jamaal-ahmed-gcp-resume"
    }
  }
}