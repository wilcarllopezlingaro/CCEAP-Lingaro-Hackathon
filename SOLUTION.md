# CCEAP Sentinel

> **Trust Before Refresh**  
> A preventive ZeroOps control plane for CCEAP that validates data and access dependencies before Power BI refreshes are allowed to run.

---

## 1. Overview

CCEAP Sentinel is a preventive automation framework designed to reduce recurring operational incidents across the Coca-Cola Enterprise Analytics Platform.

Instead of waiting for users to discover stale reports, refresh failures, invalid data, or access issues, Sentinel performs automated checks before a refresh is triggered.

The platform:

- validates source data freshness and quality;
- checks upstream pipeline health;
- monitors access and credential expiry;
- blocks unsafe refreshes;
- attempts safe automated recovery;
- notifies support teams with actionable diagnostics;
- resumes refreshes automatically when dependencies recover.

The goal is simple:

> **Prevent incidents before they become user-facing tickets.**

---

## 2. Problem Statement

The H1 2026 CCEAP incident analysis shows that the majority of incidents are repetitive and preventable rather than critical outages.

Key patterns include:

| Incident Category | Incidents | Share |
|---|---:|---:|
| Data Discrepancy | 184 | 41.5% |
| Refresh Failure | 86 | 19.4% |
| Access Management | 71 | 16.0% |
| Job Failure | 51 | 11.5% |

Additional findings:

- 443 incidents were recorded in H1 2026.
- 77.2% of incidents were associated with business-user actions or preventable configuration/data issues.
- Incident volume increased from 70 in January to 90 in June.
- The highest-value automation opportunities are concentrated around pre-refresh data validation, access monitoring, retry logic, and file validation.

The current operating model is mostly reactive:

```text
Bad Data / Failed Dependency
           |
           v
      Power BI Refresh
           |
           v
     Incorrect / Stale Report
           |
           v
       User Notices
           |
           v
        Ticket Raised
           |
           v
     L2 / L3 Investigation
```

CCEAP Sentinel changes that flow to:

```text
Bad Data / Failed Dependency
           |
           v
      Sentinel Detects
           |
           v
      Refresh Blocked
           |
           v
   Diagnose / Notify / Retry
           |
           v
      Dependency Recovers
           |
           v
   Refresh Automatically Resumes
```

---

## 3. Proposed Solution

CCEAP Sentinel combines four capabilities into one reusable ZeroOps framework:

1. **Pre-Refresh Gatekeeper**
2. **Access Guardian**
3. **Auto-Healing Engine**
4. **ZeroOps Observability Dashboard**

These capabilities work together as a preventive control plane between upstream data platforms and Power BI.

---

## 4. High-Level Architecture

```text
             +----------------------+
             |  ADF / Fabric /      |
             |  Databricks / Files  |
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

        +----------------------------------+
        | Access Guardian                  |
        |                                  |
        | - Key Vault secrets              |
        | - Service principals             |
        | - Certificates                   |
        | - Dataset credentials            |
        | - Workspace/report permissions   |
        +----------------+-----------------+
                         |
                         v
               Sentinel Alerting Layer
```

---

## 5. Core Capability 1: Pre-Refresh Gatekeeper

The Gatekeeper runs before a scheduled or manually triggered refresh.

Its purpose is to answer one question:

> **Is the report safe to refresh right now?**

### Validation Checks

| Validation | Example |
|---|---|
| Source freshness | Latest business date matches expected date |
| File arrival | Required source file exists |
| Row count | Current volume is within an acceptable range |
| Schema | Required columns exist |
| Null checks | Critical fields stay below null thresholds |
| Duplicate checks | Business keys remain unique |
| Upstream status | Required ADF/Fabric/Databricks jobs succeeded |
| Reconciliation | Source totals align with target totals |
| Referential integrity | Dimension keys resolve correctly |
| Business-date validation | Period/date is expected for the current run |

### Example Decision

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

Failure example:

```text
Readiness Score: 58 / 100

Status: REFRESH BLOCKED

Reason:
Profitability source is stale.

Expected:
2026-10-27

Latest Available:
2026-10-26

Recommended Action:
Verify the upstream SAP ingestion pipeline.
```

---

## 6. Data Readiness Score

Sentinel produces a normalized readiness score for each monitored report.

Example scoring model:

| Category | Weight |
|---|---:|
| Freshness | 25 |
| Schema | 20 |
| Volume | 20 |
| Duplicates | 15 |
| Business Date | 10 |
| Upstream Dependencies | 10 |

### Suggested Status Levels

| Score | Status | Action |
|---:|---|---|
| 90-100 | Healthy | Allow refresh |
| 75-89 | Warning | Allow or review based on policy |
| 0-74 | Critical | Block refresh |

Weights and thresholds should be configurable per report.

---

## 7. Core Capability 2: Access Guardian

Access Guardian proactively monitors credentials and access dependencies that can break refreshes or prevent users from accessing reports.

### Monitored Items

- Azure Key Vault secrets
- service principal secrets
- application registrations
- certificates
- Power BI dataset credentials
- workspace access
- report access
- expiring user access
- gateway or connection credentials

### Suggested Risk Levels

| Remaining Validity | Risk |
|---:|---|
| 0-7 days | Critical |
| 8-15 days | High |
| 16-30 days | Warning |
| More than 30 days | Healthy |

### Example Alert

```text
CCEAP SENTINEL ALERT

Credential Expiry Risk

Application:
Profitability

Credential:
SPN-PROFITABILITY-PROD

Expires:
2026-11-03

Remaining:
7 days

Affected:
- Profitability pipeline
- Power BI semantic model
- Daily refresh

Recommended Action:
Rotate the credential before expiry.
```

For the hackathon MVP, Sentinel should alert and recommend action rather than automatically rotate production credentials.

---

## 8. Core Capability 3: Auto-Healing Engine

Sentinel classifies failures and applies safe remediation when possible.

```text
Failure Detected
       |
       v
Classify Failure
       |
       +--------------------+
       |                    |
       v                    v
Transient Error        Hard Failure
       |                    |
       v                    v
Automatic Retry       Notify Owner
       |
       v
Retry Successful?
    /      \
  Yes       No
   |         |
   v         v
Resume    Escalate
Refresh   to Ops
```

### Safe Auto-Healing Examples

- retry a failed refresh;
- retry an upstream pipeline;
- wait and recheck a late-arriving source;
- refresh after data freshness becomes valid;
- suppress duplicate alerts during recovery;
- resume workflow after dependencies recover.

### Non-Automated Actions

These should remain manual unless governance permits otherwise:

- credential rotation;
- role assignment changes;
- production configuration changes;
- schema fixes;
- source-data corrections.

---

## 9. Core Capability 4: Intelligent Incident Explanation

Sentinel can translate technical validation failures into human-readable operational guidance.

Example:

```text
PROBABLE ROOT CAUSE

Profitability reporting data has not been updated
for today's business date.

Evidence:
- Latest source date: Oct 26
- Expected source date: Oct 27
- Pipeline completed: No
- Power BI refresh scheduled: 07:00

Likely Cause:
Upstream SAP ingestion delay.

Recommended Response:
1. Check the SAP extraction pipeline.
2. Do not manually refresh Power BI.
3. Re-run validation after source recovery.
```

The underlying validation logic should remain deterministic.

AI can be used to summarize results and generate operator-friendly explanations, but should not decide whether production data is valid.

---

## 10. Policy as Code

Validation rules should be configurable instead of hardcoded.

Example configuration:

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

  nulls:
    revenue: 0.01
    volume: 0.01

powerbi:
  workspace: CCEAP
  semantic_model: Profitability
```

This allows the same Sentinel engine to support:

- Profitability
- Delphi
- AAA
- PACE
- Daily DLT
- One CX
- other CCEAP reports

without rewriting the core application.

---

## 11. Teams Integration

Alerts should be sent directly to the support team's operational channel.

### Example Failure Alert

```text
CCEAP SENTINEL

REFRESH PREVENTED

Report:
Profitability

Reason:
Source data stale

Expected:
October 27, 2026

Latest:
October 26, 2026

Readiness:
62%

Actions:
- View Details
- Retry Validation
- Acknowledge
```

### Example Recovery Alert

```text
CCEAP SENTINEL

SOURCE RECOVERED

Profitability readiness: 100%

Power BI refresh automatically triggered.

No user impact detected.
```

This demonstrates closed-loop automation rather than simple monitoring.

---

## 12. ZeroOps Dashboard

A dashboard should show both technical health and business impact.

### Suggested KPIs

| KPI | Description |
|---|---|
| Reports Monitored | Number of protected CCEAP reports |
| Validations Executed | Number of pre-refresh checks |
| Refreshes Prevented | Unsafe refreshes blocked |
| Auto-Recovered | Failures resolved automatically |
| Potential Incidents Prevented | Estimated ticket deflection |
| Credentials Expiring | Access risks within 30 days |
| Average Readiness Score | Overall data health |
| Human Interventions | Cases requiring manual action |

### Trend Metrics

```text
Traditional Incidents      ↓
Sentinel Detections         ↑
Auto-Recovery Rate          ↑
Manual Intervention         ↓
```

---

## 13. Suggested Technology Stack

A practical Microsoft-oriented implementation could use:

- **Python** for the validation engine;
- **Azure Data Factory** or **Microsoft Fabric** for orchestration;
- **Databricks** for data checks where applicable;
- **Azure SQL / Delta Lake** for audit history;
- **Power BI REST API** for semantic model refresh control;
- **Microsoft Entra ID** for access checks;
- **Azure Key Vault** for credential-health monitoring;
- **Power Automate / Logic Apps** for Teams notifications;
- **Power BI** for the ZeroOps dashboard;
- **GitHub Actions / Azure DevOps** for CI/CD.

---

## 14. Suggested Repository Structure

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

## 15. Hackathon MVP

The MVP should focus on one polished end-to-end scenario instead of attempting to automate every incident type.

### Recommended MVP Target

Use **Profitability** or **Delphi** as the demo workload.

### MVP Scope

#### Scenario 1: Data Readiness Failure

1. Load a stale or intentionally invalid source.
2. Sentinel runs pre-refresh validation.
3. Readiness score falls below threshold.
4. Power BI refresh is blocked.
5. Teams receives an actionable alert.
6. Correct the source.
7. Sentinel automatically revalidates.
8. Readiness reaches 100%.
9. Power BI refresh is triggered.
10. A recovery notification is sent.

#### Scenario 2: Credential Expiry

1. Configure a test credential with a near-expiry date.
2. Access Guardian detects the risk.
3. Sentinel classifies it as Critical.
4. Teams receives an expiry alert.
5. The risk appears on the ZeroOps dashboard.

---

## 16. Demo Story

The recommended hackathon demo should be short and visual.

### Step 1: Show the Problem

Open the Sentinel dashboard:

```text
Profitability
Readiness: 100%
Status: Healthy
```

### Step 2: Introduce Failure

Simulate stale source data.

```text
Latest source date:
2026-10-26

Expected:
2026-10-27
```

### Step 3: Sentinel Detects It

```text
Readiness: 58%
Status: Refresh Blocked
```

### Step 4: Teams Alert Appears

Show the generated diagnosis and recommended action.

### Step 5: Fix the Source

Update the source data.

### Step 6: Auto-Recovery

```text
Readiness: 100%
Status: Healthy
```

Sentinel automatically triggers the Power BI refresh.

### Step 7: Show the Impact

```text
Potential Incident Prevented: +1
Manual Intervention: 0
User Impact: 0
```

---

## 17. Success Metrics

The project should be measured against operational outcomes.

### Primary Metrics

- reduction in recurring CCEAP incidents;
- number of incidents prevented before user impact;
- auto-recovery rate;
- reduction in manual refresh/retry activity;
- reduction in access-related incidents;
- reduction in mean time to detect;
- reduction in mean time to recover.

### Target Direction

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

## 18. Why This Solution

CCEAP Sentinel is stronger than a standard monitoring solution because it does not simply report failures.

It acts before the failure reaches the user.

### Monitoring

```text
Something failed.
```

### Sentinel

```text
Something is about to fail.

We blocked it.

We know why.

We notified the owner.

We retried safely.

It recovered.

The user never saw the problem.
```

That is the core ZeroOps value proposition.

---

## 19. Future Enhancements

After the MVP, Sentinel can expand into a broader CCEAP control plane.

Potential enhancements include:

- anomaly detection on row counts and measures;
- historical baseline learning;
- automatic incident creation for unresolved failures;
- ServiceNow integration;
- reusable data-contract framework;
- self-service access request portal;
- approval-based access provisioning;
- configuration drift detection;
- business-rule validation packs;
- report dependency graphs;
- SLA-aware escalation;
- automatic last-known-good fallback;
- incident trend prediction;
- multi-market deployment;
- centralized policy management.

---

## 20. Final Vision

CCEAP Sentinel transforms the support model from:

> **Detect, ticket, investigate, fix**

into:

> **Validate, prevent, recover, continue**

The long-term objective is to create a reusable ZeroOps framework that protects every critical CCEAP report through proactive data validation, access-health monitoring, automated recovery, and actionable observability.

> **CCEAP Sentinel: Trust Before Refresh.**
