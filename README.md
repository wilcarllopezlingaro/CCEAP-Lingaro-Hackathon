# CCEAP Sentinel

> **Trust Before Refresh**

CCEAP Sentinel is a preventive ZeroOps framework for the Coca-Cola Enterprise Analytics Platform (CCEAP). It validates data, access, and upstream dependencies before Power BI refreshes are allowed to run.

Instead of waiting for users to report stale data, failed refreshes, or permission issues, Sentinel detects problems early, blocks unsafe refreshes, provides diagnostics, attempts safe recovery, and resumes processing once dependencies recover.

---

## Why This Project

CCEAP's H1 2026 incident analysis shows that the biggest operational issues are repetitive and preventable:

| Incident Category | Incidents | Share |
|---|---:|---:|
| Data Discrepancy | 184 | 41.5% |
| Refresh Failure | 86 | 19.4% |
| Access Management | 71 | 16.0% |
| Job Failure | 51 | 11.5% |

CCEAP Sentinel is designed to reduce these incidents by moving the support model from:

```text
Detect -> Ticket -> Investigate -> Fix
```

to:

```text
Validate -> Prevent -> Recover -> Continue
```

---

## Core Capabilities

### 1. Pre-Refresh Gatekeeper

Checks whether a report is safe to refresh.

Example validations:

- source freshness;
- file arrival;
- row count;
- schema;
- null thresholds;
- duplicate keys;
- business date;
- upstream pipeline status;
- reconciliation;
- referential integrity.

If validation fails, the refresh can be blocked before incorrect data reaches users.

---

### 2. Data Readiness Score

Each report receives a health score based on its validation results.

Example:

```text
Source Freshness        25 / 25
Schema Validation       20 / 20
Volume Validation       15 / 20
Duplicate Check         15 / 15
Business Date           10 / 10
Upstream Dependencies   10 / 10

Readiness Score: 95 / 100
Status: READY FOR REFRESH
```

Suggested thresholds:

| Score | Status | Action |
|---:|---|---|
| 90-100 | Healthy | Allow refresh |
| 75-89 | Warning | Review based on policy |
| 0-74 | Critical | Block refresh |

---

### 3. Access Guardian

Monitors access and credential dependencies before they become incidents.

Potential checks include:

- Azure Key Vault secrets;
- service principal secrets;
- certificates;
- Power BI dataset credentials;
- workspace/report access;
- expiring access;
- gateway or connection credentials.

---

### 4. Auto-Healing

Applies safe automated recovery for known recoverable failures.

Examples:

- retry failed refreshes;
- retry upstream pipelines;
- wait and recheck late-arriving data;
- resume refresh after validation recovery;
- suppress duplicate alerts during recovery.

High-risk actions such as credential rotation, role changes, and source-data fixes remain manual unless governance allows automation.

---

### 5. Teams Notifications

Sentinel can send actionable operational alerts directly to Microsoft Teams.

Example:

```text
CCEAP SENTINEL

REFRESH PREVENTED

Report:
Profitability

Reason:
Source data stale

Expected:
2026-10-27

Latest:
2026-10-26

Readiness:
62%

Recommended Action:
Verify the upstream SAP ingestion pipeline.
```

Recovery example:

```text
CCEAP SENTINEL

SOURCE RECOVERED

Profitability readiness: 100%

Power BI refresh automatically triggered.

No user impact detected.
```

---

## High-Level Architecture

```text
             +----------------------+
             | ADF / Fabric /       |
             | Databricks / Files   |
             +----------+-----------+
                        |
                        v
              +--------------------+
              | CCEAP Sentinel     |
              | Validation Engine  |
              +---------+----------+
                        |
          +-------------+-------------+
          |                           |
          v                           v
       PASS                         FAIL
          |                           |
          v                           v
 +----------------+        +----------------------+
 | Trigger Power  |        | Block Refresh        |
 | BI Refresh     |        | Diagnose Failure     |
 +--------+-------+        | Auto-Retry if Safe   |
          |                | Notify Teams         |
          |                +----------+-----------+
          |                           |
          v                           v
 +----------------+        +----------------------+
 | Power BI       |        | Recovery Check       |
 | Semantic Model |        +----------+-----------+
 +----------------+                   |
                                      v
                              Resume Refresh
```

---

## Policy as Code

Validation rules are defined through configuration instead of being hardcoded.

Example:

```yaml
report: profitability

source:
  table: gold.profitability

freshness:
  column: business_date
  maximum_age_hours: 24

volume:
  minimum_rows: 100000
  variance_threshold: 0.20

schema:
  required:
    - customer_id
    - material_id
    - volume
    - revenue
    - business_date

quality:
  duplicates:
    keys:
      - customer_id
      - material_id
      - business_date

powerbi:
  workspace: CCEAP
  semantic_model: Profitability
```

This allows the same Sentinel engine to support multiple CCEAP workloads without changing the core application.

---

## Suggested Tech Stack

- Python
- Azure Data Factory
- Microsoft Fabric
- Databricks
- Azure SQL or Delta Lake
- Power BI REST API
- Microsoft Entra ID
- Azure Key Vault
- Power Automate or Logic Apps
- Microsoft Teams
- Power BI
- GitHub Actions or Azure DevOps

---

## Repository Structure

```text
cceap-sentinel/
|
+-- config/
|   +-- profitability.yaml
|   +-- delphi.yaml
|   +-- access_policy.yaml
|
+-- validators/
|   +-- freshness.py
|   +-- schema.py
|   +-- volume.py
|   +-- duplicates.py
|   +-- reconciliation.py
|
+-- monitors/
|   +-- keyvault.py
|   +-- entra.py
|   +-- powerbi.py
|
+-- remediation/
|   +-- retry.py
|   +-- refresh.py
|
+-- notifications/
|   +-- teams.py
|
+-- api/
|   +-- main.py
|
+-- models/
|   +-- readiness.py
|   +-- validation_result.py
|
+-- tests/
|   +-- test_freshness.py
|   +-- test_schema.py
|   +-- test_volume.py
|
+-- docs/
|   +-- architecture.md
|   +-- demo.md
|
+-- .github/
|   +-- workflows/
|
+-- README.md
+-- SOLUTION.md
+-- requirements.txt
```

---

## Hackathon MVP

The recommended MVP focuses on a single end-to-end workload such as **Profitability** or **Delphi**.

### Scenario 1: Data Readiness Failure

1. Load a stale or invalid source.
2. Sentinel runs pre-refresh checks.
3. The readiness score drops below the threshold.
4. The Power BI refresh is blocked.
5. Teams receives a diagnostic alert.
6. Correct the source.
7. Sentinel revalidates automatically.
8. Readiness returns to 100%.
9. Power BI refresh is triggered.
10. A recovery notification is sent.

### Scenario 2: Credential Expiry

1. Configure a test credential with a near-expiry date.
2. Access Guardian detects the issue.
3. Sentinel classifies the risk.
4. Teams receives an alert.
5. The issue appears on the ZeroOps dashboard.

---

## Success Metrics

Key metrics include:

- incidents prevented;
- refreshes blocked before user impact;
- auto-recovery rate;
- manual interventions avoided;
- reduction in access-related incidents;
- mean time to detect;
- mean time to recover;
- overall ZeroOps coverage.

Target direction:

```text
Ticket Volume            DOWN
User-Reported Failures   DOWN
MTTD                     DOWN
MTTR                     DOWN
Auto-Recovery            UP
Data Trust               UP
ZeroOps Coverage         UP
```

---

## Documentation

For the full solution design, architecture, MVP details, roadmap, and implementation guidance, see:

[`SOLUTION.md`](./SOLUTION.md)

---

## Project Vision

CCEAP Sentinel is intended to become a reusable preventive control plane for critical analytics workloads.

The long-term goal is to protect CCEAP reports through:

- proactive data validation;
- dependency monitoring;
- access-health monitoring;
- safe automated recovery;
- operational alerting;
- measurable incident prevention.

> **CCEAP Sentinel: Trust Before Refresh.**
