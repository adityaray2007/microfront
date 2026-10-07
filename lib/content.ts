import {
  RELEASE_BASE_URL,
  RELEASES_PAGE_URL,
  REPO_URL,
  ISSUES_URL,
  DOCS_URL,
  LICENSE_URL,
  INSTALL_SCRIPT_URL,
} from "./constants";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Downloads", href: "#downloads" },
  { label: "Commands", href: "#commands" },
  { label: "CI/CD", href: "#ci-cd" },
  { label: "Documentation", href: DOCS_URL },
];

export const HERO_CONTENT = {
  badges: [
    { text: "v0.1.0 Released", dot: true },
    { text: "100% Offline", dot: false },
    { text: "Written in Rust", dot: false },
  ],
  headline: "Stop Leaking Secrets into Git History.",
  subheadline:
    "A fast, explainable secret scanner for developers and CI pipelines. Detects credentials before commit, catches historical leaks, and enforces \"Rotate First\" remediation.",
  installCommand: `curl -sSL ${INSTALL_SCRIPT_URL} | bash`,
  installCaption: "macOS and Linux. On Windows, use the .exe download below.",
  trustLine: "No telemetry. No cloud calls. Secrets never leave your machine.",
  terminalOutput: [
    { text: "$ secgrep scan .", type: "command" },
    { text: "", type: "empty" },
    {
      text: "CRITICAL  aws-access-key  config/settings.py:14",
      type: "highlight-green",
    },
    { text: "  value:       AKIA...WXYZ", type: "muted" },
    { text: "  fingerprint: sha256:9f2c...a41e", type: "muted" },
    { text: "  Confidence:  0.94", type: "highlight-green" },
    {
      text: "  Why:         pattern match (0.95) + entropy 4.2 bits (+0.15) + path: config (+0.10)",
      type: "dim",
    },
    {
      text: "  Action:      -> Rotate this key FIRST. Deleting the line does not revoke it.",
      type: "dim",
    },
    { text: "", type: "empty" },
    { text: "✖ 1 secret found. Exit code 1.", type: "highlight-green" },
  ],
};

export const PROBLEM_CONTENT = {
  label: "WHY THIS EXISTS",
  title: "Deleting the secret is not fixing the secret.",
  intro:
    "A key committed once lives in git log forever. If the repo is public or compromised, scrapers extract it in seconds.",
  cards: [
    {
      step: "01",
      title: "Commit",
      desc: "Developer accidentally hardcodes an AWS or GitHub token into code and pushes.",
      isCritical: false,
    },
    {
      step: "02",
      title: "\"Fix\"",
      desc: "The next commit simply deletes the line. Everyone assumes the leak is solved.",
      isCritical: false,
    },
    {
      step: "03",
      title: "Still Exposed",
      desc: "The key remains in git history. Anyone with read access recovers it in seconds.",
      isCritical: true,
    },
  ],
};

export interface DownloadCard {
  id: "macos-arm64" | "macos-x86_64" | "linux-x86_64" | "windows-x86_64";
  platform: string;
  arch: string;
  filename: string;
  url: string;
}

export const DOWNLOAD_CARDS: DownloadCard[] = [
  {
    id: "macos-arm64",
    platform: "macOS",
    arch: "Apple Silicon (M1/M2/M3/M4)",
    filename: "secgrep-darwin-arm64",
    url: `${RELEASE_BASE_URL}/secgrep-darwin-arm64`,
  },
  {
    id: "macos-x86_64",
    platform: "macOS",
    arch: "Intel (x86_64)",
    filename: "secgrep-darwin-x86_64",
    url: `${RELEASE_BASE_URL}/secgrep-darwin-x86_64`,
  },
  {
    id: "linux-x86_64",
    platform: "Linux",
    arch: "64-bit (x86_64)",
    filename: "secgrep-linux-x86_64",
    url: `${RELEASE_BASE_URL}/secgrep-linux-x86_64`,
  },
  {
    id: "windows-x86_64",
    platform: "Windows",
    arch: "64-bit (.exe)",
    filename: "secgrep-windows-x86_64.exe",
    url: `${RELEASE_BASE_URL}/secgrep-windows-x86_64.exe`,
  },
];

export const SETUP_HINT_COMMAND = "chmod +x secgrep && sudo mv secgrep /usr/local/bin/";

export const ALT_INSTALLS = [
  {
    command: "cargo install secgrep",
    label: "crates.io",
    tag: "Coming soon",
  },
  {
    command: "brew install hr-shekhar/tap/secgrep",
    label: "Homebrew",
    tag: "Coming soon",
  },
];

export interface CommandItem {
  id: string;
  tabLabel: string;
  command: string;
  description: string;
  output: string;
}

export const COMMANDS_DATA: CommandItem[] = [
  {
    id: "quick-scan",
    tabLabel: "1. Quick Scan",
    command: "secgrep scan .",
    description:
      "Scans all tracked files in the repo. Exits with code 1 if secrets exceed the confidence threshold.",
    output: `Scanning 42 files...
CRITICAL  github-pat  src/auth.ts:28
  value:       ghp_...19aZ
  fingerprint: sha256:4a7e...61f0
  Confidence:  0.92
  Action:      -> Rotate this key FIRST.

✖ 1 secret found. Exit code 1.`,
  },
  {
    id: "staged-scan",
    tabLabel: "2. Staged Scan",
    command: "secgrep scan --staged",
    description:
      "Scans only files currently in the Git index. Perfect for pre-commit verification.",
    output: `Scanning staged index (2 files)...
✔ 0 secrets found. Staged index clean. Exit code 0.`,
  },
  {
    id: "diff-scan",
    tabLabel: "3. PR / CI Diff",
    command: "secgrep scan --diff origin/main..HEAD",
    description:
      "Scans only newly added lines across a pull request commit range.",
    output: `Scanning diff origin/main..HEAD (3 files changed, +14 lines)...
CRITICAL  aws-access-key  deploy/vars.tf:9
  value:       AKIA...99XQ
  Confidence:  0.95
✖ 1 secret found in diff. Exit code 1.`,
  },
  {
    id: "history-scan",
    tabLabel: "4. History Scan",
    command: "secgrep history .",
    description:
      "Scans commit history to find secrets that were committed and later \"deleted.\"",
    output: `Scanning git log (128 commits)...
HISTORICAL EXPOSURE DETECTED:
  Rule:         aws-access-key
  First seen:   b8e21a4 (2025-11-04)
  Last seen:    c9902df (2025-11-05)
  Current tree: REMOVED (still lives in git history)
  Action:       Revoke key at provider & purge history.`,
  },
  {
    id: "safe-commit",
    tabLabel: "5. Safe Commit",
    command: "secgrep commit -m \"feat: user authentication\"",
    description:
      "Scans staged files first and only runs git commit if clean.",
    output: `secgrep: checking staged files...
✔ clean. Invoking git commit -m "feat: user authentication"...
[main 7f201ab] feat: user authentication
 2 files changed, 45 insertions(+)`,
  },
  {
    id: "install-hooks",
    tabLabel: "6. Install Hooks",
    command: "secgrep install-hook --pre-push",
    description:
      "Installs pre-commit and pre-push hooks to guard every commit automatically.",
    output: `installed pre-commit hook at .git/hooks/pre-commit
installed pre-push hook at .git/hooks/pre-push
✔ Git hooks activated. Run with --no-verify to bypass if emergency.`,
  },
];

export const COMMAND_CHIPS = [
  "--format json",
  "--config custom-secgrep.toml",
  "Exit code 1 = blocked",
];

export const FEATURES_DATA = [
  {
    icon: "zap",
    title: "Built for speed",
    desc: "Pure compiled Rust, zero runtime dependencies. Fast enough to run inside pre-commit hooks.",
  },
  {
    icon: "lock",
    title: "100% Offline & Private",
    desc: "Zero cloud API calls, zero telemetry. Secrets never leave your machine.",
  },
  {
    icon: "target",
    title: "Explainable Scoring, No Black Box",
    desc: "Pattern + entropy + context + file path. Every finding tells you exactly why it was flagged.",
  },
  {
    icon: "refresh",
    title: "\"Rotate First\" Remediation",
    desc: "Deleting code doesn't revoke a compromised key. secgrep reminds you every time.",
  },
];

export const DETECTION_FORMULA =
  "Confidence = Pattern Strength + Context Signal + Entropy Signal + File Path Signal";

export const SIGNALS_DATA = [
  {
    title: "Pattern Strength (0.45 – 0.95)",
    desc: "Structured tokens (AKIA..., ghp_..., PEM keys) score high. Loose password = \"...\" patterns start at 0.45.",
    extra: "Matches anchor prefixes and exact character distributions.",
  },
  {
    title: "Shannon Entropy",
    desc: "Below 3.0 bits lowers the score (-0.20). Above 3.5 bits raises it (+0.10 to +0.20).",
    formula: "H(X) = -Σ P(xᵢ) log₂ P(xᵢ)",
    bars: [
      { label: "Low (<3.0)", fill: "dark" },
      { label: "Mid (3.0-3.5)", fill: "mid" },
      { label: "High (>3.5)", fill: "high" },
    ],
  },
  {
    title: "Context Heuristics",
    desc: "os.getenv(), process.env.X and std::env::var() get -0.50. Placeholders like YOUR_API_KEY, changeme and insert_secret_here are classified as false positives.",
    extra: "Reduces noise in configuration loader files.",
  },
  {
    title: "File Path Relevance",
    desc: ".env and credentials.json get +0.10. README.md, tests/, testdata/ and .min.js get -0.15 to -0.25.",
    extra: "Prevents blocking documentation and test mock fixtures.",
  },
];

export const ML_COMPARISON_TABLE = [
  {
    metric: "Speed",
    ml: "Heavy runtimes (Python/ONNX), slow inference",
    secgrep: "Pure compiled Rust (<50ms), no dependencies",
  },
  {
    metric: "Explainability",
    ml: "Black box; cannot inspect reasoning",
    secgrep: "Full signal breakdown notes on every finding",
  },
  {
    metric: "Privacy",
    ml: "Often transmits code to cloud APIs",
    secgrep: "100% offline; zero network calls",
  },
  {
    metric: "False Positives",
    ml: "Needs large training sets; prone to hallucination",
    secgrep: "Shannon entropy + synthetic placeholder dictionary",
  },
];

export interface DetectorRow {
  ruleId: string;
  category: string;
  severity: "Critical" | "High" | "Medium";
  description: string;
}

export const DETECTORS_DATA: DetectorRow[] = [
  {
    ruleId: "aws-access-key",
    category: "ApiKey",
    severity: "Critical",
    description: "AWS Access Key IDs (AKIA..., 20 chars)",
  },
  {
    ruleId: "github-pat",
    category: "AccessToken",
    severity: "Critical",
    description: "Classic GitHub tokens (ghp_...)",
  },
  {
    ruleId: "github-fine-grained-pat",
    category: "AccessToken",
    severity: "Critical",
    description: "Fine-grained tokens (github_pat_...)",
  },
  {
    ruleId: "slack-token",
    category: "AccessToken",
    severity: "High",
    description: "xoxb-, xoxp-, xoxa-",
  },
  {
    ruleId: "jwt",
    category: "Jwt",
    severity: "High",
    description: "Three-part JSON Web Tokens (eyJ...)",
  },
  {
    ruleId: "private-key",
    category: "PrivateKey",
    severity: "Critical",
    description: "PEM / OpenSSH RSA/DSA/EC blocks",
  },
  {
    ruleId: "connection-string",
    category: "ConnectionString",
    severity: "High",
    description: "DB URLs with embedded credentials",
  },
  {
    ruleId: "authorization-bearer",
    category: "AuthorizationHeader",
    severity: "High",
    description: "Authorization: Bearer <token> headers",
  },
  {
    ruleId: "generic-secret-assignment",
    category: "GenericSecret",
    severity: "Medium",
    description: "Secret-named variables with high-entropy values",
  },
];

export const CI_WORKFLOW_YAML = `# .github/workflows/secretguard.yml
name: SecretGuard Scan
on: [push, pull_request]
jobs:
  secretguard:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: dtolnay/rust-toolchain@stable
      - run: cargo build --release
      - run: ./target/release/secgrep scan .`;

export const HOOK_COMMAND = "secgrep install-hook --pre-push";

export const DEFENSE_IN_DEPTH_CARDS = [
  {
    icon: "anchor",
    title: "Local Hooks",
    desc: "Convenience guardrails for developers on their machine. Fast reminders before git commit and push.",
  },
  {
    icon: "shield",
    title: "CI Status Checks",
    desc: "Non-bypassable server-side barriers for pull requests. Requires passing check in branch protection.",
  },
];

export const CONFIG_BULLETS = [
  "Tune the confidence threshold (0.0 to 1.0) to match your team's policy.",
  "Ignore paths (e.g. test fixtures, vendor) and specific built-in rule IDs.",
  "Add custom company-specific regex patterns with targeted categories and severities.",
];

export const CONFIG_TOML = `# secgrep.toml
ignore_paths = ["testdata", "target", ".git", "node_modules", "vendor"]
min_confidence = 0.65
format = "text"
ignore_rules = []

[[custom_rules]]
id = "internal-api-key"
regex = "ACME-[A-Za-z0-9]{32}"
category = "api_key"
severity = "high"`;

export const REMEDIATION_STEPS = [
  {
    num: "01",
    title: "Rotate / Revoke immediately",
    desc: "Deleting the line does not invalidate the key at the provider. Invalidate it right now.",
    doFirst: true,
  },
  {
    num: "02",
    title: "Purge Git history",
    desc: "Use git-filter-repo or BFG Repo-Cleaner to permanently scrub the blob from previous commits.",
    doFirst: false,
  },
  {
    num: "03",
    title: "Audit access logs",
    desc: "Inspect cloud and API logs to check whether unauthorized queries occurred using the leaked token.",
    doFirst: false,
  },
  {
    num: "04",
    title: "Move to a secrets manager",
    desc: "Store credentials in Azure Key Vault, AWS Secrets Manager, or inject them at runtime.",
    doFirst: false,
  },
];

export const SAFETY_STRIP_CHIPS = [
  "Masked output only (AKIA...WXYZ + SHA-256 fingerprint)",
  "Offline verification only",
  "Raw secrets never written to logs",
];

export const FOOTER_LINKS = [
  { label: "GitHub Repo", href: REPO_URL },
  { label: "Issue Tracker", href: ISSUES_URL },
  { label: "Documentation", href: DOCS_URL },
  { label: "MIT License", href: LICENSE_URL },
];
