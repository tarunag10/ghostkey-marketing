# GhostKey Apple Resubmission Workflow

This workflow updates GhostKey App Store metadata and submits the current app version for review when App Store Connect credentials are available.

## Source of truth

Use `ops/fastlane/metadata/en-US/` and `ops/fastlane/review_information/` from this repository.

## Required credentials

Keep all secrets outside git.

```text
ASC_API_KEY_ID=[FILL: App Store Connect API key ID]
ASC_ISSUER_ID=[FILL: App Store Connect issuer ID]
ASC_API_KEY_PATH=[FILL: absolute path to .p8 API key]
APPLE_TEAM_ID=[FILL: Apple Developer team ID]
APP_IDENTIFIER=com.tarunagarwal.ghostkey
```

Required private review fields:

```text
APP_REVIEW_CONTACT_FIRST_NAME=Tarun
APP_REVIEW_CONTACT_LAST_NAME=Agarwal
APP_REVIEW_CONTACT_EMAIL=[FILL: App Review contact email]
APP_REVIEW_CONTACT_PHONE=[FILL: App Review contact phone including country code]
```

## Preflight

```bash
cd ops/fastlane
fastlane ios preflight
```

Preflight checks:

- Required environment variables are present.
- Privacy and support URLs are present in metadata.
- Risky public phrases are not present.
- Review notes explain Safari extension behavior, permissions, privacy, and testing.

## Metadata-only update

```bash
cd ops/fastlane
fastlane ios metadata_only
```

This updates App Store Connect metadata without submitting for review.

## Submit for review

```bash
cd ops/fastlane
fastlane ios submit_review
```

This uses App Store Connect API authentication and submits the prepared metadata for review. If Apple requires a new build, upload the build first from the GhostKey app repository, then rerun the submit lane.

## Error handling

- Missing credentials: add the missing environment variable and rerun.
- API authorization failure: verify the key has App Manager or Admin access for `com.tarunagarwal.ghostkey`.
- Metadata validation failure: fix the reported metadata file and rerun `fastlane ios preflight`.
- Build required: upload a new build from the app repository, wait for processing, then rerun `fastlane ios submit_review`.
- Screenshot rejection: verify App Store Connect accepts the current landscape screenshots; if not, upload accepted portrait or platform-specific screenshots manually before submission.

## Reviewer attachment

Recommended attachment:

```text
review/GhostKey-Safari-Extension-Review-Walkthrough-v1.0.mp4
```

The video should show installation, enabling GhostKey in Safari, granting website access, suppressing an overlay, and using Undo or Pause.
