# Key Vault mock snapshot

`keyVaultSnapshot.json` is a sanitized derivative of the user-supplied
`Azure_Key_Vault_Expiring_Secrets_Check.csv`. It contains 63 records from 15
vaults: 46 secret metadata records with no expiry, 13 vault-level access-denied
records, and 4 records marked OK. Vault, secret, and resource group identifiers
are replaced with demo aliases. The source CSV is not included in the app.
No secret values are used.

Dates, exported days remaining, status, and enabled state are preserved. The
export does not provide a scan timestamp, so days remaining are displayed as
snapshot values, not calculated relative to today. A successful snapshot result
does not establish live Azure health. Null values mean unavailable, not zero or
disabled.

Suggested mock criticality policy: expired or <=7 days remaining is Critical;
8–30 days or missing expiry is Warning; >30 days is Healthy; access denied is
Unknown. These are dashboard recommendations, not Azure-reported severities.
No critical records are present in this imported sample. Access-denied records
are vault checks and must not be counted as discovered secrets.
